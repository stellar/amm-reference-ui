import React from "react";
import { Loader } from "@stellar/design-system";
import { Avatar } from "components/Avatar";
import { Card } from "components/Card";
import { StatItem } from "components/StatItem";
import { formatAmount } from "helpers/formatAmount";
import { formatConversion } from "helpers/formatConversion";
import { useRedux } from "hooks/useRedux";
import { ActionStatus, LiquidityPoolAsset } from "types/types.d";
import "./styles.scss";

export const PoolStats = () => {
  const { poolDetails } = useRedux("poolDetails");

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

    // TODO: remove once we get 24h data
    if (asset.all_time) {
      return `${formatConversion(asset.all_time)} ${asset.assetCode}`;
    }

    if (asset.amount) {
      return `${formatConversion(asset.amount)} ${asset.assetCode}`;
    }

    // This is unlikely
    return "";
  };

  if (!poolDetails.data) {
    return null;
  }

  const renderTokens = (assetSource: LiquidityPoolAsset[]) => {
    if (poolDetails?.data?.assetAvatars.length !== 2) {
      return null;
    }

    return (
      <>
        <div className="PoolStats__token">
          <Avatar source={[poolDetails.data.assetAvatars[0]]} />{" "}
          {formatAssetAmount(
            getAssetByAssetCode({
              assets: assetSource,
              assetCode: poolDetails.data.assetAvatars[0].altText,
            }),
          )}
        </div>
        <div className="PoolStats__token">
          <Avatar source={[poolDetails.data.assetAvatars[1]]} />{" "}
          {formatAssetAmount(
            getAssetByAssetCode({
              assets: assetSource,
              assetCode: poolDetails.data.assetAvatars[1].altText,
            }),
          )}
        </div>
      </>
    );
  };

  const statsData = [
    {
      id: "participants",
      label: "Participants",
      content: formatAmount(poolDetails.data.totalAccounts),
      // TODO: add details
      details: "Details",
    },
    {
      id: "vol-24h",
      label: "Volume 24h",
      content: renderTokens(poolDetails.data?.volume),
      // TODO: add details
      details: "Details",
    },
    {
      id: "fees-24h",
      label: "Fees 24h",
      content: renderTokens(poolDetails.data?.earnedFees),
      // TODO: add details
      details: "Details",
    },
    {
      id: "pooled-tokens",
      label: "Pooled Tokens",
      content: renderTokens(poolDetails.data?.assets),
      // TODO: add details
      details: "Details",
    },
  ];

  return (
    <Card>
      {poolDetails.status === ActionStatus.PENDING ? (
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
