import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { formatPool } from "helpers/formatPool";
import { LiquidityPoolDetails } from "types/types.d";

const AGGREGATED_POOL_PATH = `${STELLAR_EXPERT_AMM_URL}/liquidity-pool/`;
/* 
  Looping through pools until completion is not ideal, 
  but until we are able to build an API to do that, this is our only option. 
  Maxing this out at 10 so to prevent huge wait times 
  as the number of pools of increases.
*/
const MAX_FETCHES = 10;

export const fetchAggregatedPools = async () => {
  const pools: LiquidityPoolDetails[] = [];
  let poolsUrl = `${AGGREGATED_POOL_PATH}?limit=200`;
  let iterationCount = 0;

  let hasNextPage = true;

  /* eslint-disable no-await-in-loop  */

  while (hasNextPage && iterationCount < MAX_FETCHES) {
    const poolsResponse = await fetch(poolsUrl);

    const poolsJson = await poolsResponse.json();

    if (poolsJson._embedded.records.length) {
      poolsJson._embedded.records.forEach((record: any) => {
        pools.push(formatPool(record));
      });

      const queryParam = poolsJson._links.next.href.match(/\?(.*)/)[0];
      poolsUrl = `${AGGREGATED_POOL_PATH}${queryParam}`;
    } else {
      hasNextPage = false;
    }
    iterationCount++;
  }

  /* eslint-enable */

  return pools;
};
