import { useEffect, useState } from "react";
import { Heading4 } from "@stellar/design-system";
import { Card } from "components/Card";
import { SortableTable } from "components/SortableTable";
import { formatAmount } from "helpers/formatAmount";
import { getPoolName } from "helpers/getPoolName";
import { LiquidityPoolDetails } from "types/types.d";

interface AllPoolsProps {
  aggregatedPoolData: LiquidityPoolDetails[];
}

interface PoolTableData {
  assetCodes: string[];
  name: string;
  liquidity: string;
  fees: string[];
}

export const AllPools = ({ aggregatedPoolData }: AllPoolsProps) => {
  const [poolTableData, setPoolTableData] = useState([] as PoolTableData[]);

  useEffect(() => {
    setPoolTableData(
      [...aggregatedPoolData].map(
        ({ assetCodes, earnedFees, totalShares }) => ({
          assetCodes,
          name: getPoolName(assetCodes[0], assetCodes[1]),
          liquidity: totalShares,
          fees: [`${earnedFees[0].all_time}`, `${earnedFees[0].all_time}`],
        }),
      ),
    );
  }, [aggregatedPoolData]);

  const labels = [
    {
      id: "name",
      label: "Name",
      sortBy: true,
    },
    {
      id: "liquidity",
      label: "Liquidity",
      sortBy: true,
    },
    {
      id: "fees[0]",
      label: "Fees (24HR)",
      sortBy: true,
    },
    {
      id: "fees[1]",
      label: "Fees (24HR)",
      sortBy: true,
    },
  ];

  const renderItemRow = ({
    assetCodes,
    name,
    liquidity,
    fees,
  }: PoolTableData) => (
    <>
      <td>{name}</td>
      <td>{formatAmount(liquidity)}</td>
      <td>
        {formatAmount(fees[0])}
        {assetCodes[0]}
      </td>
      <td>
        {formatAmount(fees[1])}
        {assetCodes[1]}
      </td>
    </>
  );

  return (
    <div className="Section">
      <Heading4>All Liquidity Pools</Heading4>
      <Card>
        <SortableTable
          data={poolTableData}
          columnLabels={labels}
          renderItemRow={renderItemRow}
          pageSize={5}
        />
      </Card>
    </div>
  );
};
