import React, { useState } from "react";
import { sortBy } from "lodash";
import { Icon, Loader } from "@stellar/design-system";
import "./styles.scss";

interface TableColumnLabel {
  id: string;
  label: string;
  sortBy?: boolean;
}

interface SortableTableProps<DataItem> {
  data: DataItem[];
  columnLabels: TableColumnLabel[];
  renderItemRow: (item: DataItem) => React.ReactElement;
  hideNumberColumn?: boolean;
  isLoading?: boolean;
}

enum SortOrder {
  asc = "asc",
  desc = "desc",
}

const CSS_CLASS_SORTABLE = "sortable";

export const SortableTable = <DataItem,>({
  data,
  columnLabels,
  renderItemRow,
  hideNumberColumn,
  isLoading,
}: SortableTableProps<DataItem>) => {
  const [localData, setLocalData] = useState(data);
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOder] = useState<SortOrder | null>(null);

  // TODO:
  // pagination

  const handleSort = (sortKey: string) => {
    let sortedData = data;
    let sortedKey: string | null = sortKey;
    let sortedOrder = null;

    if (currentSortKey === sortedKey) {
      // repeated click
      if (sortOrder === SortOrder.asc) {
        // second click: desc order
        sortedOrder = SortOrder.desc;
        sortedData = sortBy(data, [sortKey]).reverse();
      } else {
        // third click: clear sort
        sortedKey = null;
      }
    } else {
      // first click: asc order
      sortedOrder = SortOrder.asc;
      sortedData = sortBy(data, [sortKey]);
    }

    setCurrentSortKey(sortedKey);
    setLocalData(sortedData);
    setSortOder(sortedOrder);
  };

  const renderSortIcon = (sortKey: string) => {
    if (sortKey === currentSortKey && sortOrder) {
      return (
        <div className="SortableTable__sort">
          {sortOrder === SortOrder.asc ? (
            <Icon.ChevronDown />
          ) : (
            <Icon.ChevronUp />
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={[
        "TableContainer",
        isLoading ? "TableContainer--loading" : "",
      ].join(" ")}
    >
      <table className="Table SortableTable">
        <thead>
          <tr>
            {hideNumberColumn ? null : <th>#</th>}
            {columnLabels.map((lb) => (
              <th
                key={lb.id}
                {...(lb.sortBy ? { onClick: () => handleSort(lb.id) } : {})}
              >
                <div className={lb.sortBy ? CSS_CLASS_SORTABLE : ""}>
                  {lb.label}
                  {renderSortIcon(lb.id)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {localData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={`row-${index}`}>
              {hideNumberColumn ? null : <td>{index + 1}</td>}
              {renderItemRow(item)}
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading ? <Loader size="3rem" /> : null}
    </div>
  );
};
