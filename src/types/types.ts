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
  aggregatedPools: AggregatedPoolsInitialState;
  poolDetails: PoolDetailsInitialState;
  poolHistory: PoolHistoryInitialState;
  poolTransactions: PoolTransactionsInitialState;
}

export type StoreKey = keyof Store;

export interface AggregatedPoolsInitialState {
  data: LiquidityPoolDetails[];
  status: ActionStatus | undefined;
  errorString?: string;
}

export interface PoolDetailsInitialState {
  data: LiquidityPoolDetails | null;
  status: ActionStatus | undefined;
  errorString?: string;
}
export interface PoolTransactionsInitialState {
  data: LiquidityPoolTransaction[];
  status: ActionStatus | undefined;
  errorString?: string;
}

export interface PoolHistoryInitialState {
  data: LiquidityPoolHistory[];
  status: ActionStatus | undefined;
  errorString?: string;
}

export interface LiquidityPoolAsset {
  asset: string;
  assetCode?: string;
  amount?: string | number;
  "1d"?: string | number;
  "7d"?: string | number;
  // eslint-disable-next-line camelcase
  all_time?: string | number;
}

// Liquidity pool
export interface LiquidityPoolReserve extends LiquidityPoolAsset {
  amount: string | number;
}

export interface LiquidityPoolAssetInterval extends LiquidityPoolAsset {
  "1d": string | number;
  "7d": string | number;
  // eslint-disable-next-line camelcase
  all_time: string | number;
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

export type LiquidityPoolHistory = {
  ts: number;
  totalValueLocked: number;
};
export interface AssetAvatar {
  altText: string;
  iconUrl: string | undefined;
}

export interface LiquidityPoolDetails {
  id: string;
  assets: LiquidityPoolReserve[];
  fee: number;
  assetCodes: string[];
  assetAvatars: AssetAvatar[];
  totalShares: number;
  totalAccounts: string;
  totalTrades: string;
  totalValueLocked: number;
  earnedFees: LiquidityPoolAssetInterval[];
  volume: LiquidityPoolAssetInterval[];
}

// Chart
export interface ChartData {
  x: string;
  y: number;
}

// Table
export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
