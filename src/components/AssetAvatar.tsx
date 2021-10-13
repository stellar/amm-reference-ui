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

const DEFAULT_ASSET = {
  altText: "",
  iconUrl: "",
};

const NATIVE_ASSET = {
  altText: "XLM",
  iconUrl: StellarLogo,
};

export const AssetAvatar = ({ assets }: AvatarProps) => {
  type Icon = { altText: string; iconUrl: string };

  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const iconDefaults: Icon[] = [];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < assets.length; i++) {
      iconDefaults.push(DEFAULT_ASSET);
    }

    setIcons(iconDefaults);
  }, [assets.length]);

  useEffect(() => {
    const updateAssetIcon = (items: Icon[], index: number, asset: Icon) => {
      const updatedIcons = [...items];
      updatedIcons[index] = asset;
      return updatedIcons;
    };

    assets.forEach(async (asset, index) => {
      if (asset !== "native") {
        const { assetCode, issuerKey } = getCodeAndKey(asset);
        const iconUrl = await getIconUrlFromIssuer({
          assetCode,
          issuerKey,
        });

        setIcons((prevIcons) =>
          updateAssetIcon(prevIcons, index, {
            altText: assetCode,
            iconUrl,
          }),
        );
      } else {
        setIcons((prevIcons) =>
          updateAssetIcon(prevIcons, index, {
            altText: NATIVE_ASSET.altText,
            iconUrl: NATIVE_ASSET.iconUrl,
          }),
        );
      }
    });
  }, [assets]);

  return <Avatar source={icons} />;
};
