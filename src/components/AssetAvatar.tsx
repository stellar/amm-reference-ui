import { useEffect, useState } from "react";
import { getAssetAvatarProps } from "helpers/getAssetAvatarProps";
import { Avatar } from "components/Avatar";

interface AvatarProps {
  assets: string[];
}

export const AssetAvatar = ({ assets }: AvatarProps) => {
  type Icon = { altText: string; iconUrl: string };

  const [icons, setIcons] = useState<Icon[]>([]);

  useEffect(() => {
    const iconDefaults: Icon[] = [];

    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < assets.length; i++) {
      iconDefaults.push({
        altText: `asset-${i}`,
        iconUrl: "",
      });
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
      const avatarProps = await getAssetAvatarProps(asset);
      setIcons((prevIcons) => updateAssetIcon(prevIcons, index, avatarProps));
    });
  }, [assets]);

  return <Avatar source={icons} />;
};
