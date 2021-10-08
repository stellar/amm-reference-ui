import { useEffect, useState } from "react";
import { getIconUrlFromIssuer } from "helpers/getIconUrlFromIssuer";
import StellarLogo from "assets/stellar-logo.png";

import "./styles.scss";

interface AvatarSource {
  asset: string;
  backgroundColor?: string;
  isFullSizeImage?: boolean;
}

interface AvatarProps {
  source: AvatarSource[];
  size?: string;
  borderColor?: string;
}

const getCodeAndKey = (asset: string) => {
  const splitArr = asset.split(":");

  return {
    assetCode: splitArr[0],
    issuerKey: splitArr[1],
  };
};

const nativeAsset = {
  assetCode: "XLM",
  iconUrl: StellarLogo,
};

export const Avatar = ({ source, size, borderColor }: AvatarProps) => {
  type Icons = { [key: string]: { assetCode: string; iconUrl: string } };
  const [icons, setIcons] = useState({
    native: nativeAsset,
  } as Icons);

  useEffect(() => {
    source.forEach(async ({ asset }) => {
      if (asset !== "native") {
        const { assetCode, issuerKey } = getCodeAndKey(asset);
        const iconUrl = await getIconUrlFromIssuer({
          assetCode,
          issuerKey,
        });

        setIcons((prevIcons) => ({
          ...prevIcons,
          [asset]: { assetCode, iconUrl },
        }));
      }
    });
  }, [source]);

  return (
    <div className="Avatar">
      {source.map((item) => {
        const customStyle = {
          ...(borderColor ? { "--Avatar-border-color": borderColor } : {}),
          ...(size ? { "--Avatar-size": size } : {}),
          ...(item.backgroundColor
            ? { "--Avatar-background-color": item.backgroundColor }
            : {}),
          ...(item.isFullSizeImage ? { "--Avatar-image-size": "100%" } : {}),
        } as React.CSSProperties;

        return (
          <div key={item.asset} className="Avatar__item" style={customStyle}>
            {icons[item.asset]?.iconUrl ? (
              <img
                alt={icons[item.asset].assetCode}
                src={icons[item.asset].iconUrl}
              />
            ) : (
              <div className="Avatar__item__bullet" />
            )}
          </div>
        );
      })}
    </div>
  );
};
