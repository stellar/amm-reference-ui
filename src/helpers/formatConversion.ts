import BigNumber from "bignumber.js";

export const formatConversion = (amount: string | number) => {
  const num = new BigNumber(amount);

  // million
  const m = 1000000;
  if (num.gte(m)) {
    return `${num.div(m).toFixed(2)}m`;
  }

  // thousand
  const k = 1000;
  if (num.gte(k)) {
    return `${num.div(k).toFixed(2)}k`;
  }

  // smallest amount
  const min = 0.001;
  if (num.lt(min)) {
    return `<${min}`;
  }

  return `${num.toFixed(3)}`;
};
