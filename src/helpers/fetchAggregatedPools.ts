import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { formatPool } from "helpers/formatPool";

export const fetchAggregatedPools = async () => {
  const historyResponse = await fetch(`${STELLAR_EXPERT_AMM_URL}/pools`);

  const history = await historyResponse.json();

  return history._embedded.records.map((data: any) => formatPool(data));
};
