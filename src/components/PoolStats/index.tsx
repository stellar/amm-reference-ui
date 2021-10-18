import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loader } from "@stellar/design-system";
import { Avatar } from "components/Avatar";
import { Card } from "components/Card";
import { StatItem } from "components/StatItem";
import { fetchPoolStatsAction } from "ducks/poolStats";
import { formatAmount } from "helpers/formatAmount";
import { formatConversion } from "helpers/formatConversion";
import { useRedux } from "hooks/useRedux";
import { ActionStatus, LiquidityPoolAsset } from "types/types.d";
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
    assets: LiquidityPoolAsset[];
    assetCode: string;
  }) => (assets || []).find((a) => a.assetCode === assetCode);

  const formatAssetAmount = (asset?: LiquidityPoolAsset) => {
    if (!asset) {
      return "";
    }

    if (asset["24h"]) {
      return `${formatConversion(asset["24h"])} ${asset.assetCode}`;
    }

    if (asset.amount) {
      return `${formatConversion(asset.amount)} ${asset.assetCode}`;
    }

    // This is unlikely
    return "";
  };

  if (!poolInfo.data || !poolStats.data) {
    return null;
  }

  const renderTokens = (assetSource: LiquidityPoolAsset[]) => (
    <>
      <div className="PoolStats__token">
        <Avatar source={[poolAvatars.data[0]]} />{" "}
        {formatAssetAmount(
          getAssetByAssetCode({
            assets: assetSource,
            assetCode: poolAvatars.data[0].altText,
          }),
        )}
      </div>
      <div className="PoolStats__token">
        <Avatar source={[poolAvatars.data[1]]} />{" "}
        {formatAssetAmount(
          getAssetByAssetCode({
            assets: assetSource,
            assetCode: poolAvatars.data[1].altText,
          }),
        )}
      </div>
    </>
  );

  const statsData = [
    {
      id: "participants",
      label: "Participants",
      content: formatAmount(poolInfo.data.totalTrustlines),
      // TODO: add details
      details: "Details",
    },
    {
      id: "vol-24h",
      label: "Volume 24h",
      content: renderTokens(poolStats.data?.volume),
      // TODO: add details
      details: "Details",
    },
    {
      id: "fees-24h",
      label: "Fees 24h",
      content: renderTokens(poolStats.data?.earnedFees),
      // TODO: add details
      details: "Details",
    },
    {
      id: "pooled-tokens",
      label: "Pooled Tokens",
      content: renderTokens(poolStats.data?.assets),
      // TODO: add details
      details: "Details",
    },
  ];

  return (
    <Card>
      {poolAvatars.status === ActionStatus.PENDING ? (
        <Loader />
      ) : (
        <div className="PoolStats">
          <div className="PoolStats__items">
            {statsData.map((s) => (
              <React.Fragment key={s.id}>
                <StatItem label={s.label} details={s.details}>
                  {s.content}
                </StatItem>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
