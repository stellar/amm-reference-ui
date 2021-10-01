import { Layout } from "@stellar/design-system";
import { Breadcrumbs } from "components/Breadcrumbs";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    {/* ./overview/top-liquidity-positions */}
    <div style={{ marginTop: 20 }}>
      <Breadcrumbs
        links={[
          {
            link: "./overview",
            text: "Overview",
          },
          {
            link: "./overview/top-liquidity-positions",
            text: "Top Liquidity Positions",
          },
        ]}
      />
    </div>
    {/* ./overview/pools/USDC-ETH */}
    <div style={{ marginTop: 20 }}>
      <Breadcrumbs
        links={[
          {
            link: "./overview",
            text: "Overview",
          },
          {
            link: "./overview/pools",
            text: "Pools",
          },
          {
            link: "./overview/pools/USDC-ETH",
            text: "USDC / ETH",
          },
        ]}
      />
    </div>
  </Layout.Inset>
);
