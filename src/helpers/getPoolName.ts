export const getPoolName = (assetCodes: string[]) => {
  if (!assetCodes.length) {
    return "";
  }

  if (assetCodes.length === 1) {
    return `${assetCodes[0]}`;
  }

  return `${assetCodes[0]}-${assetCodes[1]}`;
};
