import { Layout } from "@stellar/design-system";
import { Card } from "components/Card";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    <div
      style={{
        marginTop: 20,
        display: "flex",
        gap: "1rem",
      }}
    >
      <Card>Card content</Card>
      <Card noPadding>No padding</Card>
      <Card noShadow>No shadow</Card>
    </div>
  </Layout.Inset>
);
