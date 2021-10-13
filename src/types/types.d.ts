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
  poolInfo: PoolInfoInitialState;
  poolTransactions: PoolTransactionsInitialState;
}

export type StoreKey = keyof Store;

export interface PoolInfoInitialState {
  data: LiquidityPoolInfo | null;
  status: ActionStatus | undefined;
  errorString?: string;
}
export interface PoolTransactionsInitialState {
  data: LiquidityPoolTransaction[];
  status: ActionStatus | undefined;
  errorString?: string;
}

// Liquidity pool
export interface LiquidityPoolReserve {
  asset: string;
  amount: string;
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

export interface LiquidityPoolInfo {
  id: string;
  reserves: LiquidityPoolReserve[];
  reserveAssets: string[];
  totalShares: string;
  totalTrustlines: string;
  fee: number;
}
