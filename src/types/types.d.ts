// TODO: move to SDS
export enum StellarNetwork {
  testnet = "testnet",
  public = "public",
  custom = "custom",
}

export enum ActionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export interface RejectMessage {
  errorString: string;
}

// Store
export interface Store {
  poolAvatars: PoolAvatarsInitialState;
  poolInfo: PoolInfoInitialState;
  poolStats: PoolStatsInitialState;
  poolTransactions: PoolTransactionsInitialState;
}

export type StoreKey = keyof Store;

export interface PoolAvatarsInitialState {
  data: AssetAvatar[];
  status: ActionStatus | undefined;
  errorString?: string;
}
export interface PoolInfoInitialState {
  data: LiquidityPoolInfo | null;
  status: ActionStatus | undefined;
  errorString?: string;
}

export interface PoolStatsInitialState {
  data: LiquidityPoolStats | null;
  status: ActionStatus | undefined;
  errorString?: string;
}
export interface PoolTransactionsInitialState {
  data: LiquidityPoolTransaction[];
  status: ActionStatus | undefined;
  errorString?: string;
}

export interface LiquidityPoolAsset {
  asset: string;
  assetCode?: string;
  amount?: string;
  "24h"?: string;
  "7d"?: string;
  "1y"?: string;
}

// Liquidity pool
export interface LiquidityPoolReserve extends LiquidityPoolAsset {
  amount: string;
}

export interface LiquidityPoolAssetInterval extends LiquidityPoolAsset {
  "24h": string;
  "7d": string;
  "1y": string;
}
export interface LiquidityPoolOperation {
  [key: string]: any;
  id: string;
  type: string;
  /* eslint-disable camelcase */
  created_at: string;
  transaction_hash: string;
  liquidity_pool_id: string;
  reserves_deposited: LiquidityPoolReserve[];
  shares_received: string;
  /* eslint-enable camelcase */
}

export interface LiquidityPoolTransaction {
  id: string;
  liquidityPoolId: string;
  createdAt: string;
  shares: string;
  reserves: LiquidityPoolReserve[];
  transactionHash: string;
  type: string;
}

export interface AssetAvatar {
  altText: string;
  iconUrl: string | undefined;
}

export interface LiquidityPoolInfo {
  id: string;
  reserves: LiquidityPoolReserve[];
  reserveAssets: string[];
  totalShares: string;
  totalTrustlines: string;
  fee: number;
}

export interface LiquidityPoolStats {
  id: string;
  assets: LiquidityPoolReserve[];
  earnedFees: LiquidityPoolAssetInterval[];
  fee: number | string;
  shares: string;
  totalValueLocked: string;
  tradesCount: number | string;
  volume: LiquidityPoolAssetInterval[];
}
