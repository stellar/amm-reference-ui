import { Layout } from "@stellar/design-system";
import "./styles.scss";

export const FooterWithNote = () => (
  <div className="FooterWithNote">
    <Layout.Inset>
      <div className="FooterWithNote__note">
      Cryptocurrency assets are subject to high market risks and volatility. Past performance is not indicative of future results. Investments in blockchain assets may result in loss of part or all of your investment. Please do your own research and use caution.
      </div>
    </Layout.Inset>
    <Layout.Footer
      gitHubLink="https://github.com/stellar/amm-reference-ui"
      marginTop="1.5rem"
    />
  </div>
);
