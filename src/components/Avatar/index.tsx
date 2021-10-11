import "./styles.scss";

interface AvatarSource {
  assetCode: string;
  iconUrl?: string;
  backgroundColor?: string;
  isFullSizeImage?: boolean;
}

interface AvatarProps {
  source: AvatarSource[];
  size?: string;
  borderColor?: string;
}

export const Avatar = ({ source, size, borderColor }: AvatarProps) => (
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
        <div key={item.assetCode} className="Avatar__item" style={customStyle}>
          {item.iconUrl ? (
            <img alt={item.assetCode} src={item.iconUrl} />
          ) : (
            <div key={item.assetCode} className="Avatar__item__bullet" />
          )}
        </div>
      );
    })}
  </div>
);
