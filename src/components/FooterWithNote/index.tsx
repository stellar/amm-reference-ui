import { Layout } from "@stellar/design-system";
import "./styles.scss";

export const FooterWithNote = () => (
  <div className="FooterWithNote">
    <Layout.Inset>
      <div className="FooterWithNote__note">
        The content and data collected and presented here are made available
        solely for general informational purposes. The data includes information
        provided by third parties and we do not warrant its accuracy,
        usefulness, or completeness. Any reliance you place on such content is
        strictly at your own risk. We disclaim all liability and responsibility
        arising from any use of such material by you or any other user of the
        Services. Trading digital assets is inherently risky and you should
        consider all of the risks before trading. The value of crypto assets can
        be extremely volatile and unpredictable, which can result in significant
        losses in a short time, including possibly a loss of total value. The
        price and liquidity of crypto assets has been subject to large
        fluctuations in the past and may be subject to large fluctuations in the
        future. Historical data is not necessarily indicative of future
        performance. This information should not be construed as professional
        advice of any kind -- including investment, financial, trading, tax, or
        legal advice. You should obtain advice from a suitably qualified
        professional.
      </div>
    </Layout.Inset>
    <Layout.Footer
      gitHubLink="https://github.com/stellar/amm-reference-ui"
      marginTop="1.5rem"
    />
  </div>
);
