import { useEffect } from "react";
import { Layout, Heading2 } from "@stellar/design-system";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AssetAvatar } from "components/AssetAvatar";
import { AssetConversions } from "components/AssetConversions";
import { Breadcrumbs } from "components/Breadcrumbs";
import { DetailsChart } from "components/DetailsChart";
import {
  fetchPoolHistoryAction,
  resetPoolHistoryAction,
} from "ducks/poolHistory";
import { fetchPoolInfoAction, resetPoolInfoAction } from "ducks/poolInfo";
import { useRedux } from "hooks/useRedux";

export const PoolDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { poolInfo } = useRedux("poolInfo");
  const { poolHistory } = useRedux("poolHistory");
  const { poolId } = useParams<{ poolId: string }>();

  useEffect(() => {
    dispatch(fetchPoolInfoAction(poolId));
    dispatch(fetchPoolHistoryAction(poolId));

    return () => {
      dispatch(resetPoolInfoAction());
      dispatch(resetPoolHistoryAction());
    };
  }, [dispatch, poolId]);

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
          <AssetAvatar
            assets={[
              poolInfo.data.reserves[0].asset,
              poolInfo.data.reserves[1].asset,
            ]}
          />
          <Heading2>{getAssetPairString()}</Heading2>
        </div>
        <AssetConversions reserves={poolInfo.data.reserves} />
        <DetailsChart poolHistory={poolHistory} />
      </Layout.Inset>
    </div>
  );
};
