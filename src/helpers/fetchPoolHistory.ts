import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { fromStroopsToLumen } from "helpers/convertAmount";

interface FetchPoolHistoryProps {
  poolId: string;
}

interface HistoryItem {
  asset: string;
  amount: number;
}

const formatAmounts = (items: HistoryItem[]) =>
  items.map((i) => ({
    asset: i.asset,
    amount: fromStroopsToLumen(i.amount),
  }));

export const fetchPoolHistory = async ({ poolId }: FetchPoolHistoryProps) => {
  const historyResponse = await fetch(
    `${STELLAR_EXPERT_AMM_URL}/liquidity-pool/${poolId}/stats-history`,
  );

  const history = await historyResponse.json();

  return history._embedded.records.map((record: any) => ({
    accounts: record.accounts,
    earnedFees: formatAmounts(record.earned_fees),
    earnedFeesValue: fromStroopsToLumen(record.earned_fees_value),
    pagingToken: record.paging_token,
    reserves: formatAmounts(record.reserves),
    shares: fromStroopsToLumen(record.shares),
    totalValueLocked: fromStroopsToLumen(record.total_value_locked),
    trades: record.trades,
    ts: record.ts,
    volume: formatAmounts(record.volume),
    volumeValue: fromStroopsToLumen(record.volume_value),
  }));
};
