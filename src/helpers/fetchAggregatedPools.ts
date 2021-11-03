import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";
import { formatAggregatedPool } from "helpers/formatAggregatedPool";

export const fetchAggregatedPools = async () => {
  const historyResponse = await fetch(`${STELLAR_EXPERT_AMM_URL}/pools`);

  const history = await historyResponse.json();

  return history._embedded.records.map((data: any) =>
    formatAggregatedPool(data),
  );
};
