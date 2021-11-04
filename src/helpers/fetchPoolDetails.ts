import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { formatPool } from "helpers/formatPool";
import { LiquidityPoolDetails } from "types/types.d";

export const fetchPoolDetails = async (
  poolId: string,
): Promise<LiquidityPoolDetails> => {
  const response = await fetch(
    `${STELLAR_EXPERT_AMM_URL}/liquidity-pool/${poolId}`,
  );
  const data = await response.json();

  return formatPool(data);
};
