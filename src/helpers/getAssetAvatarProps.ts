import { getIconUrlFromIssuer } from "helpers/getIconUrlFromIssuer";
import StellarLogo from "assets/stellar-logo.png";

const getCodeAndKey = (asset: string) => {
  const splitArr = asset.split(":");

  return {
    assetCode: splitArr[0],
    issuerKey: splitArr[1],
  };
};

export const getAssetAvatarProps = async (assetString: string) => {
  // Native asset
  if (["native", "XLM"].includes(assetString)) {
    return {
      altText: "XLM",
      iconUrl: StellarLogo,
    };
  }

  // Non-native asset
  const { assetCode, issuerKey } = getCodeAndKey(assetString);
  const iconUrl = await getIconUrlFromIssuer({
    assetCode,
    issuerKey,
  });

  return {
    altText: assetCode,
    iconUrl,
  };
};
