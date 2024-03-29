import { useEffect } from "react";
import { Layout, Heading2 } from "@stellar/design-system";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { metrics } from "@stellar/frontend-helpers";

import { METRIC_NAMES } from "constants/metricNames";
import { Avatar } from "components/Avatar";
import { AssetConversions } from "components/AssetConversions";
import { Breadcrumbs } from "components/Breadcrumbs";
import { DataVisualizationGrid } from "components/DataVisualizationGrid";
import { DetailsChart } from "components/DetailsChart";
import { PoolTransactionsList } from "components/PoolTransactionsList";
import {
  fetchPoolDetailsAction,
  resetPoolDetailsAction,
} from "ducks/poolDetails";
import {
  fetchPoolHistoryAction,
  resetPoolHistoryAction,
} from "ducks/poolHistory";
import { PoolStats } from "components/PoolStats";
import { useRedux } from "hooks/useRedux";
import { AppDispatch } from "config/store";

export const PoolDetails = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { poolDetails } = useRedux("poolDetails");
  const { poolHistory } = useRedux("poolHistory");
  const { poolId } = useParams<{ poolId: string }>();

  useEffect(() => {
    metrics.emitMetric(METRIC_NAMES.VIEW_DETAILS);
  }, []);

  useEffect(() => {
    if (poolId) {
      dispatch(fetchPoolDetailsAction(poolId));
      dispatch(fetchPoolHistoryAction(poolId));
    }

    return () => {
      dispatch(resetPoolDetailsAction());
      dispatch(resetPoolHistoryAction());
    };
  }, [dispatch, poolId]);

  const handleRouteClick = (route: string) => {
    navigate(route);
  };

  const getAssetPairString = () => poolDetails.data?.assetCodes.join(" / ");

  if (!poolId || !poolDetails.data) {
    return null;
  }

  return (
    <div className="PoolDetails">
      <Layout.Inset>
        <Breadcrumbs
          links={[
            {
              link: "/",
              text: "Overview",
            },
            {
              link: "#",
              text: `Pool: ${getAssetPairString()}`,
            },
          ]}
          onClick={handleRouteClick}
        />
        <div className="PoolDetails__title">
          <Avatar source={poolDetails.data.assetAvatars} />
          <Heading2>{getAssetPairString()}</Heading2>
        </div>
        <AssetConversions
          reserves={poolDetails.data.assets}
          avatars={poolDetails.data.assetAvatars}
        />{" "}
        <DataVisualizationGrid>
          <DetailsChart isDarkMode={isDarkMode} poolHistory={poolHistory} />
          <div>
            <PoolStats />
          </div>
        </DataVisualizationGrid>
        <PoolTransactionsList poolId={poolId} />
      </Layout.Inset>
    </div>
  );
};
