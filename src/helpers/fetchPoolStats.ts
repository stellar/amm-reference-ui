import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { getAssetCode } from "helpers/getAssetCode";
import { LiquidityPoolStats } from "types/types.d";

export const fetchPoolStats = async (
  poolId: string,
): Promise<LiquidityPoolStats> => {
  const response = await fetch(
    `${STELLAR_EXPERT_AMM_URL}/liquidity-pool/${poolId}`,
  );
  const data = await response.json();

  // TODO: any type
  const addAssetCode = (items: any[]) =>
    items.map((i) => ({ assetCode: getAssetCode(i.asset, "-"), ...i }));

  return {
    id: data.id,
    assets: addAssetCode(data.assets),
    earnedFees: addAssetCode(data.earned_fees),
    fee: data.fee,
    shares: data.shares,
    totalValueLocked: data.total_value_locked,
    tradesCount: data.trades,
    volume: addAssetCode(data.volume),
  };
};
