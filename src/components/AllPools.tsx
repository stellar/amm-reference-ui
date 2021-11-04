import { Heading4 } from "@stellar/design-system";
import { Card } from "components/Card";
import { SortableTable } from "components/SortableTable";
import { formatAmount } from "helpers/formatAmount";
import { getPoolName } from "helpers/getPoolName";
import { LiquidityPoolDetails } from "types/types.d";

interface AllPoolsProps {
  aggregatedPoolData: LiquidityPoolDetails[];
}

export const AllPools = ({ aggregatedPoolData }: AllPoolsProps) => {
  const labels = [
    {
      id: "poolName",
      label: "Name",
      sortBy: true,
    },
    {
      id: "totalShares",
      label: "Liquidity",
      sortBy: true,
    },
    {
      id: "pool.earnedFees[0].fees",
      label: "Fees (24HR)",
    },
    {
      id: "pool.earnedFees[1].fees",
      label: "Fees (24HR)",
    },
  ];

  const renderItemRow = (pool: LiquidityPoolDetails) => (
    <>
      <td>{getPoolName(pool.assetCodes[0], pool.assetCodes[1])}</td>
      <td>{formatAmount(pool.totalShares)}</td>
      <td>
        {`${formatAmount(pool.earnedFees[0].all_time)}${pool.assetCodes[0]}`}
      </td>
      <td>
        {`${formatAmount(pool.earnedFees[1].all_time)}${pool.assetCodes[1]}`}
      </td>
    </>
  );

  return (
    <div className="Section">
      <Heading4>All Liquidity Pools</Heading4>
      <Card>
        <SortableTable
          data={aggregatedPoolData}
          columnLabels={labels}
          renderItemRow={renderItemRow}
          pageSize={5}
        />
      </Card>
    </div>
  );
};
