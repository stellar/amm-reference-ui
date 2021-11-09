import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "@stellar/design-system";
import { metrics } from "@stellar/frontend-helpers";

import { METRIC_NAMES } from "constants/metricNames";
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
    metrics.emitMetric(METRIC_NAMES.VIEW_OVERVIEW);
  }, []);

  useEffect(() => {
    dispatch(fetchAggregatedPoolsAction());

    return () => {
      dispatch(resetAggregatedPoolsAction());
    };
  }, [dispatch]);

  return (
    <Layout.Inset>
      <TopList aggregatedPoolData={aggregatedPools.data} />
      <AllPools aggregatedPoolData={aggregatedPools.data} />
    </Layout.Inset>
  );
};
