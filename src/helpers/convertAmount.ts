import { BigNumber } from "bignumber.js";

type Amount = string | number;

export const formatAmount = (amount: Amount) =>
  new BigNumber(amount).toFormat();

export const fromStroopsToNumber = (stroops: Amount) =>
  Number(new BigNumber(Number(stroops) / 1e7).toFixed(2));
