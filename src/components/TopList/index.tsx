import { useEffect, useState } from "react";
import { IconButton, Icon } from "@stellar/design-system";
import { Avatar } from "components/Avatar";
import { Card } from "components/Card";
import { Tooltip } from "components/Tooltip";
import { getPoolName } from "helpers/getPoolName";
import { LiquidityPoolDetails } from "types/types.d";

import "./styles.scss";

interface TopListProps {
  aggregatedPoolData: LiquidityPoolDetails[];
}

const MAX_LENGTH = 5;

export const TopList = ({ aggregatedPoolData }: TopListProps) => {
  const [topPools, setTopPools] = useState([] as LiquidityPoolDetails[]);
  const LIST_LENGTH =
    aggregatedPoolData.length >= MAX_LENGTH
      ? MAX_LENGTH
      : aggregatedPoolData.length;
  const hasMultiplePools = LIST_LENGTH > 1;

  useEffect(() => {
    setTopPools(
      [...aggregatedPoolData]
        .sort((a, b) => Number(b.totalValueLocked) - Number(a.totalValueLocked))
        .slice(0, LIST_LENGTH),
    );
  }, [aggregatedPoolData, LIST_LENGTH]);

  if (!topPools.length) {
    return null;
  }

  return (
    <Card>
      <div className="TopList">
        <div>
          <div className="TopList__header">
            <span>Pools</span>{" "}
            <Tooltip
              position={Tooltip.position.TOP}
              content="The total count of all existing Liquidity Pools."
            >
              <IconButton
                icon={<Icon.Info />}
                altText="Details"
                customSize="1rem"
              />
            </Tooltip>
          </div>
          <div className="TopList__poolCount">{aggregatedPoolData.length}</div>
        </div>
        <div>
          <div className="TopList__header">
            Top {hasMultiplePools ? `${LIST_LENGTH} ` : ""} Pool
            {hasMultiplePools ? "s" : ""}{" "}
            <Tooltip
              position={Tooltip.position.TOP}
              content="The pools with the greatest number of participants."
            >
              <IconButton
                icon={<Icon.Info />}
                altText="Details"
                customSize="1rem"
              />
            </Tooltip>
          </div>
          <div className="TopList__pool__row">
            {topPools.map((pool) => (
              <div
                className="TopList__pool__row__item"
                key={getPoolName(pool.assetCodes[0], pool.assetCodes[1])}
              >
                <Avatar source={pool.assetAvatars} size="1.5rem" />
                <span>
                  {getPoolName(pool.assetCodes[0], pool.assetCodes[1])}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
