import { useEffect, useState } from "react";
import { IconButton, Icon } from "@stellar/design-system";
import { Avatar } from "components/Avatar";
import { Card } from "components/Card";
import { Tooltip } from "components/Tooltip";
import { LiquidityPoolDetails } from "types/types.d";

import "./styles.scss";

interface TopListProps {
  aggregatedPoolData: LiquidityPoolDetails[];
}

export const TopList = ({ aggregatedPoolData }: TopListProps) => {
  const [topPools, setTopPools] = useState([] as LiquidityPoolDetails[]);
  useEffect(() => {
    setTopPools(
      [...aggregatedPoolData].sort((a, b) => {
        if (a.totalValueLocked > b.totalValueLocked) {
          return -1;
        }
        if (a.totalValueLocked < b.totalValueLocked) {
          return 1;
        }
        return 0;
      }),
    );
  }, [aggregatedPoolData]);

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
            Top 5 Pools{" "}
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
              <div className="TopList__pool__row__item">
                <Avatar source={pool.assetAvatars} size="1.5rem" />
                <span>
                  {pool.assetCodes[0]}-{pool.assetCodes[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
