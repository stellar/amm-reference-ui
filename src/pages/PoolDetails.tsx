import { useEffect } from "react";
import { Layout, Heading2 } from "@stellar/design-system";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Avatar } from "components/Avatar";
import { AssetConversions } from "components/AssetConversions";
import { Breadcrumbs } from "components/Breadcrumbs";
import {
  fetchPoolAvatarsAction,
  resetPoolAvatarsAction,
} from "ducks/poolAvatars";
import { fetchPoolInfoAction, resetPoolInfoAction } from "ducks/poolInfo";
import { useRedux } from "hooks/useRedux";

export const PoolDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { poolInfo, poolAvatars } = useRedux("poolInfo", "poolAvatars");
  const { poolId } = useParams<{ poolId: string }>();

  useEffect(() => {
    dispatch(fetchPoolInfoAction(poolId));

    return () => {
      dispatch(resetPoolInfoAction());
    };
  }, [dispatch, poolId]);

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
        />
      </Layout.Inset>
    </div>
  );
};
