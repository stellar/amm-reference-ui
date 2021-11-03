import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { LiquidityPoolStats } from "types/types.d";
import { formatAggregatedPool } from "./formatAggregatedPool";

export const fetchPoolStats = async (
  poolId: string,
): Promise<LiquidityPoolStats> => {
  const response = await fetch(
    `${STELLAR_EXPERT_AMM_URL}/pool/${poolId}/stats`,
  );
  const data = await response.json();

  return formatAggregatedPool(data);
};
