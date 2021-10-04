export interface Store {
  // TODO: update when we have reducers
  [key: string]: any;
}

export type StoreKey = keyof Store;

// TODO: move to SDS
export enum StellarNetwork {
  testnet = "testnet",
  public = "public",
  custom = "custom",
}
