import { Layout } from "@stellar/design-system";
import { Avatar } from "components/Avatar";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    <div style={{ marginTop: 20 }}>
      <Avatar
        source={[
          {
            asset:
              "USDC:GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN",
          },
          {
            asset: "native",
          },
        ]}
      />
    </div>
  </Layout.Inset>
);
