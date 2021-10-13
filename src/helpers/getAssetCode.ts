export const getAssetCode = (assetString: string) =>
  assetString === "native" ? "XLM" : assetString.split(":")[0];
