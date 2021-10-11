import {
  LiquidityPoolOperation,
  LiquidityPoolTransaction,
} from "types/types.d";

interface FetchPoolTransactionsProps {
  server: any;
  poolId: string;
}

export const fetchPoolTransactions = async ({
  server,
  poolId,
}: FetchPoolTransactionsProps): Promise<LiquidityPoolTransaction[]> => {
  const operationsResponse = await server
    .operations()
    .forLiquidityPool(poolId)
    .order("desc")
    .call();

  return (operationsResponse.records || [])
    .filter((p: LiquidityPoolOperation) =>
      ["liquidity_pool_deposit", "liquidity_pool_withdraw"].includes(p.type),
    )
    .map((r: LiquidityPoolOperation) => ({
      id: r.id,
      liquidityPoolId: r.liquidity_pool_id,
      createdAt: r.created_at,
      shares:
        r.type === "liquidity_pool_withdraw" ? r.shares : r.shares_received,
      reserves:
        r.type === "liquidity_pool_withdraw"
          ? r.reserves_received
          : r.reserves_deposited,
      transactionHash: r.transaction_hash,
      type: r.type,
    }));
};
