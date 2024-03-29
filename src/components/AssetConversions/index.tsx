import { findIndex } from "lodash";
import { Avatar } from "components/Avatar";
import { AssetAvatar } from "components/AssetAvatar";
import { formatConversion } from "helpers/formatConversion";
import { getAssetCode } from "helpers/getAssetCode";
import {
  LiquidityPoolReserve,
  AssetAvatar as AssetAvatarType,
} from "types/types";
import "./styles.scss";

interface AssetConversionsProps {
  reserves: LiquidityPoolReserve[];
  avatars?: AssetAvatarType[];
}

type AssetProps = {
  fromAsset: LiquidityPoolReserve;
  toAsset: LiquidityPoolReserve;
  avatar?: AssetAvatarType;
};

export const AssetConversions = ({
  reserves,
  avatars,
}: AssetConversionsProps) => {
  if (reserves.length !== 2) {
    throw new Error("AssetConversions component must have two (2) assets.");
  }

  if (Number(reserves[0].amount) === 0 || Number(reserves[1].amount) === 0) {
    return null;
  }

  const getConversion = (reserve: LiquidityPoolReserve) => {
    const index = findIndex(reserves, (r) => r.asset === reserve.asset);
    let num;

    if (index === 0) {
      num = Number(reserves[0].amount) / Number(reserves[1].amount);
    } else {
      num = Number(reserves[1].amount) / Number(reserves[0].amount);
    }

    return `${formatConversion(num)} ${getAssetCode(
      reserves[index].asset,
      "-",
    )}`;
  };

  const Asset = ({ fromAsset, toAsset, avatar }: AssetProps) => (
    <div className="AssetConversions__asset">
      {avatar ? (
        <Avatar source={[avatar]} />
      ) : (
        <AssetAvatar assets={[fromAsset.asset]} />
      )}
      <span>{`1 ${getAssetCode(fromAsset.asset, "-")} = ${getConversion(
        toAsset,
      )}`}</span>
    </div>
  );

  return (
    <div className="AssetConversions">
      <Asset
        fromAsset={reserves[0]}
        toAsset={reserves[1]}
        {...(avatars ? { avatar: avatars[0] } : {})}
      />
      <Asset
        fromAsset={reserves[1]}
        toAsset={reserves[0]}
        {...(avatars ? { avatar: avatars[1] } : {})}
      />
    </div>
  );
};
