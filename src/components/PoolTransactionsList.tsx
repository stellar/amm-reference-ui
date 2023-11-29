import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { Heading4, TextLink } from "@stellar/design-system";
import { Card } from "components/Card";
import { SortableTable } from "components/SortableTable";
import { STELLAR_EXPERT_TX } from "constants/apiUrls";
import { fetchPoolTransactionsAction } from "ducks/poolTransactions";
import { formatAmount } from "helpers/convertAmount";
import { getAssetCode } from "helpers/getAssetCode";
import { useRedux } from "hooks/useRedux";
import { AppDispatch } from "config/store";
import {
  LiquidityPoolTransaction,
  LiquidityPoolReserve,
  ActionStatus,
} from "types/types";

export const PoolTransactionsList = ({ poolId }: { poolId: string }) => {
  const { poolTransactions } = useRedux("poolTransactions");
  const dispath: AppDispatch = useDispatch();

  useEffect(() => {
    dispath(fetchPoolTransactionsAction(poolId));
  }, [poolId, dispath]);

  const labels = [
    {
      id: "id",
      label: "Transaction",
    },
    // TODO: using shares for now. We probably need to fetch current prices to
    // calculate total value.
    {
      id: "shares",
      label: "Shares",
      sortBy: true,
    },
    {
      id: "reserves[0].amount",
      label: "Amount",
      sortBy: true,
    },
    {
      id: "reserves[1].amount",
      label: "Amount",
      sortBy: true,
    },
    {
      id: "createdAt",
      label: "Time",
      sortBy: true,
    },
  ];

  const formatReserveAmount = (reserve: LiquidityPoolReserve) =>
    `${formatAmount(reserve.amount)} ${getAssetCode(reserve.asset)}`;

  const formatTimeAgo = (time: string) =>
    formatDistanceToNow(new Date(time), { addSuffix: true });

  const getOperationLabel = (type: string) => {
    switch (type) {
      case "liquidity_pool_deposit":
        return "Add";
      case "liquidity_pool_withdraw":
        return "Remove";
      default:
        return "";
    }
  };

  const getTransactionLabel = (tx: LiquidityPoolTransaction) => {
    const assetOne = getAssetCode(tx.reserves[0].asset);
    const assetTwo = getAssetCode(tx.reserves[1].asset);
    const operationLabel = getOperationLabel(tx.type);

    return `${operationLabel} ${assetOne} and ${assetTwo}`;
  };

  const renderItemRow = (item: LiquidityPoolTransaction) => (
    <>
      <td>
        <TextLink href={`${STELLAR_EXPERT_TX}/${item.transactionHash}`}>
          {getTransactionLabel(item)}
        </TextLink>
      </td>
      <td>{formatAmount(item.shares)}</td>
      <td>{formatReserveAmount(item.reserves[0])}</td>
      <td>{formatReserveAmount(item.reserves[1])}</td>
      <td>{formatTimeAgo(item.createdAt)}</td>
    </>
  );

  return (
    <div className="Section">
      <Heading4>Transactions</Heading4>
      <Card>
        <SortableTable
          data={poolTransactions.data}
          columnLabels={labels}
          renderItemRow={renderItemRow}
          isLoading={poolTransactions.status === ActionStatus.PENDING}
        />
      </Card>
    </div>
  );
};
