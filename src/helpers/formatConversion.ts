import BigNumber from "bignumber.js";

export const formatConversion = (amount: string | number) => {
  const num = new BigNumber(amount);

  // billion
  const b = 1000000000;
  if (num.gte(b)) {
    return `${num.div(b).toFormat(2)}b`;
  }

  // million
  const m = 1000000;
  if (num.gte(m)) {
    return `${num.div(m).toFormat(2)}m`;
  }

  // thousand
  const k = 1000;
  if (num.gte(k)) {
    return `${num.div(k).toFormat(2)}k`;
  }

  // smallest amount
  const min = 0.001;
  if (num.lt(min)) {
    return `<${min}`;
  }

  return `${num.toFormat(3)}`;
};
