import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "components/Avatar";
import { Card } from "components/Card";
import { StatItem } from "components/StatItem";
import { fetchPoolStatsAction } from "ducks/poolStats";
import { formatAmount } from "helpers/formatAmount";
import { formatConversion } from "helpers/formatConversion";
import { useRedux } from "hooks/useRedux";
import {
  LiquidityPoolReserve,
  LiquidityPoolAssetInterval,
} from "types/types.d";
import "./styles.scss";

export const PoolStats = () => {
  const { poolAvatars, poolInfo, poolStats } = useRedux(
    "poolAvatars",
    "poolInfo",
    "poolStats",
  );

  const dispatch = useDispatch();
  const poolId = poolInfo.data?.id;

  useEffect(() => {
    if (poolId) {
      dispatch(fetchPoolStatsAction(poolId));
    }
  }, [dispatch, poolId]);

  const getAssetByAssetCode = ({
    assets,
    assetCode,
  }: {
    assets?: any[];
    assetCode: string;
  }) => (assets || []).find((a) => a.assetCode === assetCode);

  const formatAssetAmount = (asset?: LiquidityPoolReserve) => {
    if (!asset) {
      return "";
    }

    return `${formatConversion(asset.amount)} ${asset.assetCode}`;
  };

  const formatIntervalAmount = (asset?: LiquidityPoolAssetInterval) => {
    if (!asset) {
      return "";
    }

    return `${formatConversion(asset["24h"])} ${asset.assetCode}`;
  };

  if (!poolInfo.data || !poolStats.data) {
    return null;
  }

  const renderPooledTokens = () => (
    <>
      <div className="PoolStats__token">
        <Avatar source={[poolAvatars.data[0]]} />{" "}
        {formatAssetAmount(
          getAssetByAssetCode({
            assets: poolStats.data?.assets,
            assetCode: poolAvatars.data[0].altText,
          }),
        )}
      </div>
      <div className="PoolStats__token">
        <Avatar source={[poolAvatars.data[1]]} />{" "}
        {formatAssetAmount(
          getAssetByAssetCode({
            assets: poolStats.data?.assets,
            assetCode: poolAvatars.data[1].altText,
          }),
        )}
      </div>
    </>
  );

  const statsData = [
    {
      id: "vol-24h",
      label: "Volume 24h",
      content: formatIntervalAmount(
        getAssetByAssetCode({
          assets: poolStats.data?.volume,
          assetCode: poolAvatars.data[0].altText,
        }),
      ),
      // TODO: add details
      details: "Details",
      // note: "+$131,500 (+5.11%)",
      // isNoteNegative: false,
    },
    {
      id: "fees-24h",
      label: "Fees 24h",
      content: formatIntervalAmount(
        getAssetByAssetCode({
          assets: poolStats.data?.earnedFees,
          assetCode: poolAvatars.data[0].altText,
        }),
      ),
      // TODO: add details
      details: "Details",
      // note: "-$8,361.02 (-5.11%)",
      // isNoteNegative: true,
    },
    {
      id: "participants",
      label: "Participants",
      content: formatAmount(poolInfo.data.totalTrustlines),
      // TODO: add details
      details: "Details",
    },
  ];

  return (
    <Card>
      <div className="PoolStats">
        <div className="PoolStats__items">
          {statsData.map((s) => (
            <React.Fragment key={s.id}>
              <StatItem
                label={s.label}
                details={s.details}
                // note={s.note}
                // isNoteNegative={Boolean(s.isNoteNegative)}
              >
                {s.content}
              </StatItem>
            </React.Fragment>
          ))}
        </div>

        {/* TODO: add details */}
        <StatItem label="Pooled Tokens" details="Details">
          {renderPooledTokens()}
        </StatItem>
      </div>
    </Card>
  );
};
