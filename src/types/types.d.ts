export interface Store {
  // TODO: update when we have reducers
  [key: string]: any;
}

export type StoreKey = keyof Store;
