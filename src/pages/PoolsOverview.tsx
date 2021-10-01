import { Layout } from "@stellar/design-system";
import { Avatar } from "components/Avatar";

export const PoolsOverview = () => (
  <Layout.Inset>
    <div>Pools overview page</div>

    <div style={{ marginTop: 20 }}>
      <Avatar
        source={[
          {
            iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013",
            altText: "ETH",
          },
        ]}
      />
    </div>

    <div style={{ marginTop: 20 }}>
      <Avatar
        source={[
          {
            iconUrl:
              "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=013",
            altText: "USDC",
            isFullSizeImage: true,
          },
        ]}
      />
    </div>

    <div style={{ marginTop: 20 }}>
      <Avatar
        size="5rem"
        source={[
          {
            iconUrl:
              "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=013",
            altText: "USDC",
            isFullSizeImage: true,
          },
          {
            iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=013",
            altText: "ETH",
          },
        ]}
      />
    </div>
  </Layout.Inset>
);
