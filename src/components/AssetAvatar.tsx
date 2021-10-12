import { useEffect, useState } from "react";
import { getIconUrlFromIssuer } from "helpers/getIconUrlFromIssuer";
import { Avatar } from "components/Avatar";
import StellarLogo from "assets/stellar-logo.png";

interface AvatarProps {
  assets: string[];
}

const getCodeAndKey = (asset: string) => {
  const splitArr = asset.split(":");

  return {
    assetCode: splitArr[0],
    issuerKey: splitArr[1],
  };
};

const NATIVE_ASSET = {
  altText: "XLM",
  iconUrl: StellarLogo,
};

export const AssetAvatar = ({ assets }: AvatarProps) => {
  type Icons = { altText: string; iconUrl: string }[];
  const [icons, setIcons] = useState([NATIVE_ASSET] as Icons);

  useEffect(() => {
    assets.forEach(async (asset) => {
      if (asset !== "native") {
        const { assetCode, issuerKey } = getCodeAndKey(asset);
        const iconUrl = await getIconUrlFromIssuer({
          assetCode,
          issuerKey,
        });

        setIcons((prevIcons) => [
          ...prevIcons,
          { altText: assetCode, iconUrl },
        ]);
      }
    });
  }, [assets]);

  return <Avatar source={icons} />;
};
