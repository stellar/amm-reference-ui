import { getAssetCode } from "helpers/getAssetCode";

type VolumeAsset = {
  asset: string;
  // eslint-disable-next-line camelcase
  all_time: number | string;
};

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

const addAssetCode = (items: VolumeAsset[]) =>
  items.map((i) => ({
    assetCode: getAssetCode(i.asset, "-"),
    ...i,
  }));

const formatAssets = (items: Asset[]) =>
  items.map((i) => ({
    assetCode: getAssetCode(i.asset, "-"),
    asset: i.asset,
    amount: i.amount,
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
  totalShares: data.shares,
  totalAccounts: data.accounts,
  totalTrades: data.trades,
  earnedFees: addAssetCode(data.earned_fees),
  totalValueLocked: data.total_value_locked,
  volume: addAssetCode(data.volume),
});
