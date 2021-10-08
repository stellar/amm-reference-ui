import { Layout } from "@stellar/design-system";
import { SortableTable } from "components/SortableTable";
import { useState } from "react";

interface TxDataItem {
  tx: number;
  total: number;
  amountA: number;
  amountB: number;
  time: number;
}

export const PoolsOverview = () => {
  const [isLoading, setIsLoading] = useState(false);

  // TODO: fetch data from Horizon
  const txData: TxDataItem[] = [
    {
      tx: 1,
      total: 101,
      amountA: 1,
      amountB: 2,
      time: 1000,
    },
    {
      tx: 2,
      total: 100,
      amountA: 2,
      amountB: 3,
      time: 900,
    },
    {
      tx: 3,
      total: 99,
      amountA: 3,
      amountB: 4,
      time: 800,
    },
    {
      tx: 4,
      total: 100,
      amountA: 2,
      amountB: 1,
      time: 1001,
    },
  ];

  const labels = [
    {
      id: "tx",
      label: "Transaction",
      sortBy: true,
    },
    {
      id: "total",
      label: "Total value",
      sortBy: true,
    },
    {
      id: "amountA",
      label: "Amount",
      sortBy: true,
    },
    {
      id: "amountB",
      label: "Amount",
      sortBy: true,
    },
    {
      id: "time",
      label: "Time",
      sortBy: true,
    },
  ];

  const renderItemRow = (item: TxDataItem) => (
    <>
      <td>{item.tx}</td>
      <td>{item.total}</td>
      <td>{item.amountA}</td>
      <td>{item.amountB}</td>
      <td>{item.time}</td>
    </>
  );

  return (
    <Layout.Inset>
      Pools overview page
      <button onClick={() => setIsLoading(!isLoading)}>Toggle loading</button>
      <div style={{ marginTop: 20 }}>
        <SortableTable
          data={txData}
          columnLabels={labels}
          renderItemRow={renderItemRow}
          isLoading={isLoading}
        />
      </div>
    </Layout.Inset>
  );
};
