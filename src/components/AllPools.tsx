import { Heading4 } from "@stellar/design-system";
import { Card } from "components/Card";
import { SortableTable } from "components/SortableTable";

const testData = [
  {
    id: 1,
    label: "test1",
  },
  {
    id: 2,
    label: "test2",
  },
  {
    id: 3,
    label: "test3",
  },
  {
    id: 4,
    label: "test4",
  },
  {
    id: 5,
    label: "test5",
  },
  {
    id: 6,
    label: "test6",
  },
];

export const AllPools = () => {
  const labels = [
    {
      id: "id",
      label: "ID",
    },
    {
      id: "label",
      label: "Label",
    },
  ];

  const renderItemRow = (item: any) => (
    <>
      <td>{item.id}</td>
      <td>{item.label}</td>
    </>
  );

  return (
    <div className="Section">
      <Heading4>All Liquidity Pools</Heading4>
      <Card>
        <SortableTable
          data={testData}
          columnLabels={labels}
          renderItemRow={renderItemRow}
          pageSize={5}
        />
      </Card>
    </div>
  );
};
