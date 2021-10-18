import { useEffect } from "react";
import { Layout, Heading2 } from "@stellar/design-system";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "components/Avatar";
import { AssetConversions } from "components/AssetConversions";
import { Breadcrumbs } from "components/Breadcrumbs";
import { DataVisualizationGrid } from "components/DataVisualizationGrid";
import { DetailsChart } from "components/DetailsChart";
import {
  fetchPoolAvatarsAction,
  resetPoolAvatarsAction,
} from "ducks/poolAvatars";
import {
  fetchPoolHistoryAction,
  resetPoolHistoryAction,
} from "ducks/poolHistory";
import { PoolStats } from "components/PoolStats";
import { fetchPoolInfoAction, resetPoolInfoAction } from "ducks/poolInfo";
import { useRedux } from "hooks/useRedux";

export const PoolDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { poolInfo, poolAvatars } = useRedux("poolInfo", "poolAvatars");
  const { poolHistory } = useRedux("poolHistory");
  const { poolId } = useParams<{ poolId: string }>();

  console.log(poolAvatars);

  useEffect(() => {
    dispatch(fetchPoolInfoAction(poolId));
    dispatch(fetchPoolHistoryAction(poolId));

    return () => {
      dispatch(resetPoolInfoAction());
      dispatch(resetPoolHistoryAction());
    };
  }, [dispatch, poolId]);
  console.log(poolInfo);

  useEffect(() => {
    if (poolInfo.data?.reserves) {
      dispatch(fetchPoolAvatarsAction(poolInfo.data.reserves));
    }

    return () => {
      dispatch(resetPoolAvatarsAction());
    };
  }, [dispatch, poolInfo.data?.reserves]);

  const handleRouteClick = (route: string) => {
    history.push(route);
  };

  const getAssetPairString = () => poolInfo.data?.reserveAssets.join(" / ");

  if (!poolInfo.data) {
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
          <Avatar source={poolAvatars.data} />
          <Heading2>{getAssetPairString()}</Heading2>
        </div>
        <AssetConversions
          reserves={poolInfo.data.reserves}
          avatars={poolAvatars.data}
        />{" "}
        <DataVisualizationGrid>
          <DetailsChart poolHistory={poolHistory} />
          <div>
            <PoolStats />
          </div>
        </DataVisualizationGrid>
      </Layout.Inset>
    </div>
  );
};
