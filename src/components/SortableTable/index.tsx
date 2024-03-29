// TODO: move to SDS
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { chunk } from "lodash";
import { Icon, Loader } from "@stellar/design-system";
import { Pagination } from "components/Pagination";
import { sortList } from "helpers/sortList";
import { SortOrder } from "types/types";
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
  emptyMessage?: string;
  pageSize?: number;
}

const CSS_CLASS_SORTABLE = "sortable";

export const SortableTable = <DataItem extends Record<string, any>>({
  data,
  columnLabels,
  renderItemRow,
  hideNumberColumn,
  isLoading,
  emptyMessage = "No transactions to show",
  pageSize,
}: SortableTableProps<DataItem>) => {
  const chunkData = useCallback(
    (items: DataItem[]) => chunk(items, pageSize || items.length),
    [pageSize],
  );

  const [localData, setLocalData] = useState<DataItem[][]>(chunkData(data));
  const [currentSortKey, setCurrentSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOder] = useState<SortOrder | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const chunkedData = chunkData(data);
    setLocalData(chunkedData);
  }, [data, pageSize, chunkData]);

  const handleSort = (sortKey: string) => {
    let sortedData = data;
    let sortedKey: string | null = sortKey;
    let sortedOrder = null;

    if (currentSortKey === sortedKey) {
      // repeated click
      if (sortOrder === SortOrder.asc) {
        // second click: desc order
        sortedOrder = SortOrder.desc;
        sortedData = sortList(data, sortKey, SortOrder.desc);
      } else {
        // third click: clear sort
        sortedKey = null;
      }
    } else {
      // first click: asc order
      sortedOrder = SortOrder.asc;
      sortedData = sortList(data, sortKey);
    }

    setCurrentSortKey(sortedKey);
    setLocalData(chunkData(sortedData));
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
      {localData.length === 0 ? <p>{emptyMessage}</p> : null}

      {localData.length > 0 ? (
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
            {localData[currentPage - 1].map(
              (item, index) => (
                <tr
                  className={item.href ? `SortableTable__clickableRow` : ""}
                  key={`row-${index}`}
                  onClick={() => (item.href ? navigate(item.href) : null)}
                >
                  {hideNumberColumn ? null : <td>{index + 1}</td>}
                  {renderItemRow(item)}
                </tr>
              ),
              /* eslint-enable */
            )}
          </tbody>
        </table>
      ) : null}

      {pageSize ? (
        <Pagination
          pageSize={pageSize}
          itemCount={data.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}

      {isLoading ? <Loader size="3rem" /> : null}
    </div>
  );
};
