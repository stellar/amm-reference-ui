import { fromStroopsToLumen } from "helpers/convertAmount";
import { getAssetCode } from "helpers/getAssetCode";
import { LiquidityPoolAssetInterval } from "types/types";

type Asset = {
  asset: string;
  amount: number | string;
  domain?: string;
  // eslint-disable-next-line camelcase
  toml_info?: {
    orgName?: string;
    image?: string;
    status?: string;
    anchorAssetType?: string;
  };
};

const addAssetCode = (items: LiquidityPoolAssetInterval[]) =>
  items.map((i) => ({
    assetCode: getAssetCode(i.asset, "-"),
    ...i,
  }));

const convertObjValToLumens = (item: LiquidityPoolAssetInterval) => {
  const formattedItem = {} as {
    [key: string]: any;
  } & LiquidityPoolAssetInterval;
  Object.entries(item).forEach(([k, v]) => {
    formattedItem[k] = typeof v === "number" ? fromStroopsToLumen(v) : v;
  });
  return formattedItem;
};

const convertAssetAmountsToLumens = (items: LiquidityPoolAssetInterval[]) =>
  items.map((item) => convertObjValToLumens(item));

const formatAssets = (items: Asset[]) =>
  items.map((i) => ({
    assetCode: getAssetCode(i.asset, "-"),
    asset: i.asset,
    amount: fromStroopsToLumen(i.amount),
  }));

const getReserveAssets = (assets: Asset[]) => [
  getAssetCode(assets[0].asset, "-"),
  getAssetCode(assets[1].asset, "-"),
];

const getAvatarData = (assets: Asset[]) =>
  assets.map((a) => ({
    altText: getAssetCode(a.asset, "-"),
    iconUrl: a?.toml_info?.image,
  }));

export const formatPool = (data: any) => ({
  id: data.id,
  assets: formatAssets(data.assets),
  assetCodes: getReserveAssets(data.assets),
  assetAvatars: getAvatarData(data.assets),
  fee: data.fee,
  totalShares: fromStroopsToLumen(data.shares),
  totalAccounts: data.accounts,
  totalTrades: data.trades,
  earnedFees: addAssetCode(convertAssetAmountsToLumens(data.earned_fees)),
  earnedValue: convertObjValToLumens(data.earned_value),
  totalValueLocked: fromStroopsToLumen(data.total_value_locked),
  volume: addAssetCode(convertAssetAmountsToLumens(data.volume)),
  volumeValue: convertObjValToLumens(data.volume_value),
});
