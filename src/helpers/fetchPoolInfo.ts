import { getAssetCode } from "helpers/getAssetCode";
import { LiquidityPoolInfo } from "types/types.d";

interface FetchPoolInfoProps {
  server: any;
  poolId: string;
}

export const fetchPoolInfo = async ({
  server,
  poolId,
}: FetchPoolInfoProps): Promise<LiquidityPoolInfo> => {
  const lpResponse = await server
    .liquidityPools()
    .liquidityPoolId(poolId)
    .order("desc")
    .call();

  const getReserveAssets = () => [
    getAssetCode(lpResponse.reserves[0].asset),
    getAssetCode(lpResponse.reserves[1].asset),
  ];

  return {
    id: lpResponse.id,
    reserves: lpResponse.reserves,
    reserveAssets: getReserveAssets(),
    totalShares: lpResponse.total_shares,
    totalTrustlines: lpResponse.total_trustlines,
    fee: lpResponse.fee_bp,
  };
};
