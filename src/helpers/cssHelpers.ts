import hexRgb from "hex-rgb";

export const getCssVar = (cssVar: string) => {
  if (document.querySelector("body")) {
    return getComputedStyle(document.querySelector("body") as Element)
      .getPropertyValue(cssVar)
      .replace(/\s/g, "");
  }

  return "";
};

export const getRgbaFromHex = (hex: string, alpha: string) => {
  const rgbStr = hexRgb(hex, {
    format: "array",
  })
    .slice(0, 3)
    .toString();

  return `rgba(${rgbStr}, ${alpha})`;
};
