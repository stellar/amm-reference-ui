import { Layout } from "@stellar/design-system";
import { AssetAvatar } from "components/AssetAvatar";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    <div style={{ marginTop: 20 }}>
      <AssetAvatar
        assets={[
          "USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
          "native",
        ]}
      />
    </div>
  </Layout.Inset>
);
