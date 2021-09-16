import { Layout } from "@stellar/design-system";
import "./styles.scss";

export const FooterWithNote = () => (
  <div className="FooterWithNote">
    <Layout.Inset>
      <div className="FooterWithNote__note">
        Past performance is not indicative of future results
      </div>
    </Layout.Inset>
    <Layout.Footer
      gitHubLink="https://github.com/stellar/amm-reference-ui"
      marginTop="1.5rem"
    />
  </div>
);
