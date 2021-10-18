export const getAssetCode = (assetString: string, splitChar?: string) =>
  ["native", "XLM"].includes(assetString)
    ? "XLM"
    : assetString.split(splitChar || ":")[0];
