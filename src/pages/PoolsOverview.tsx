import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "@stellar/design-system";
import { AllPools } from "components/AllPools";
import { TopList } from "components/TopList";
import {
  fetchAggregatedPoolsAction,
  resetAggregatedPoolsAction,
} from "ducks/aggregatedPools";
import { useRedux } from "hooks/useRedux";

export const PoolsOverview = () => {
  const dispatch = useDispatch();
  const { aggregatedPools } = useRedux("aggregatedPools");

  useEffect(() => {
    dispatch(fetchAggregatedPoolsAction());

    return () => {
      dispatch(resetAggregatedPoolsAction());
    };
  }, [dispatch]);

  return (
    <Layout.Inset>
      <TopList aggregatedPoolData={aggregatedPools.data} />
      <AllPools />
    </Layout.Inset>
  );
};
