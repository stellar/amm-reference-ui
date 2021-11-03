import BigNumber from "bignumber.js";
import { get } from "lodash";

type GenericObject = {
  [key: string]: any;
};

export const sortList = <T extends GenericObject>(
  data: T[],
  sortByKey: string,
  sortOrder?: "asc" | "desc",
) => {
  if (!data.length) {
    return data;
  }

  const isDescOrder = sortOrder === "desc";

  return [...data].sort((a, b) => {
    const valA = get(a, sortByKey);
    const valB = get(b, sortByKey);

    const numA = new BigNumber(valA);
    const numB = new BigNumber(valB);

    // Compare strings and dates
    if (numA.isNaN() || numB.isNaN()) {
      // Compare dates
      const datetimeA = new Date(valA).getTime();
      const datetimeB = new Date(valB).getTime();

      // Compare dates
      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(datetimeA) && !isNaN(datetimeB)) {
        return isDescOrder ? datetimeA - datetimeB : datetimeB - datetimeA;
      }

      // Compare strings
      return isDescOrder ? valB - valA : valA - valB;
    }

    // Compare numbers
    if (numA.gt(numB)) {
      return isDescOrder ? -1 : 1;
    }

    if (numA.lt(numB)) {
      return isDescOrder ? 1 : -1;
    }

    return 0;
  });
};
