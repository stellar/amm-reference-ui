import { STELLAR_EXPERT_AMM_URL } from "constants/apiUrls";

interface FetchPoolHistoryProps {
  poolId: string;
}

export const fetchPoolHistory = async ({ poolId }: FetchPoolHistoryProps) => {
  const historyResponse = await fetch(
    `${STELLAR_EXPERT_AMM_URL}/pool/${poolId}/history`,
  );

  const history = await historyResponse.json();

  return history._embedded.records;
};
