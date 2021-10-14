import { Layout } from "@stellar/design-system";

import { Chart } from "components/Chart";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    <Chart
      header={{
        title: "TVL",
        description: "Total Value Locked",
      }}
      poolId="1"
      timeframes={[
        { label: "1M", segments: 30 },
        { label: "1W", segments: 2 },
      ]}
    />
  </Layout.Inset>
);
