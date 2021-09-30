import { Layout } from "@stellar/design-system";
import { NetworkIndicator } from "components/NetworkIndicator";
import { StellarNetwork } from "types/types.d";

export const PoolsOverview = () => (
  <Layout.Inset>
    <div>Pools overview page</div>

    <div style={{ marginTop: 20 }}>
      <NetworkIndicator network={StellarNetwork.testnet} />
    </div>
  </Layout.Inset>
);
