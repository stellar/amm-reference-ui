import "./styles.scss";

interface AvatarSource {
  iconUrl?: string;
  altText: string;
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
        <div key={item.altText} className="Avatar__item" style={customStyle}>
          {item.iconUrl ? (
            <img alt={item.altText} src={item.iconUrl} />
          ) : (
            <div className="Avatar__item__bullet" />
          )}
        </div>
      );
    })}
  </div>
);
