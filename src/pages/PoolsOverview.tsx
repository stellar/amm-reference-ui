import { Layout } from "@stellar/design-system";
import { PoolTransactionsList } from "components/PoolTransactionsList";

export const PoolsOverview = () => (
  <Layout.Inset>
    Pools overview page
    <PoolTransactionsList poolId="b26c0d6545349ad7f44ba758b7c705459537201583f2e524635be04aff84bc69" />
  </Layout.Inset>
);
