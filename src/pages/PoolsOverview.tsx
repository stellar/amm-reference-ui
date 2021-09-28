import { Layout, Button } from "@stellar/design-system";
import { Tooltip } from "components/Tooltip";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    <div style={{ marginTop: 20 }}>
      <Tooltip position={Tooltip.position.RIGHT} content="Tooltip content">
        <Button>Show tooltip</Button>
      </Tooltip>
    </div>
  </Layout.Inset>
);
