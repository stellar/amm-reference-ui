import { StellarNetwork } from "types/types";
import "./styles.scss";

const networkInfo = {
  [StellarNetwork.testnet]: {
    label: "Testnet",
  },
  [StellarNetwork.public]: {
    label: "Public",
  },
  [StellarNetwork.custom]: {
    label: "Custom",
  },
};

export const NetworkIndicator = ({ network }: { network: StellarNetwork }) => (
  <div className="NetworkIndicator">
    <div
      className={`NetworkIndicator__indicator NetworkIndicator__indicator--${network}`}
    />
    <div className="NetworkIndicator__label">{networkInfo[network].label}</div>
  </div>
);
