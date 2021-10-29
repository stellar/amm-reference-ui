import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "@stellar/design-system";

import { store } from "config/store";
import { Header } from "components/Header";
import { NetworkIndicator } from "components/NetworkIndicator";
import { FooterWithNote } from "components/FooterWithNote";

import { PoolsOverview } from "pages/PoolsOverview";
import { PoolDetails } from "pages/PoolDetails";
import { NotFound } from "pages/NotFound";
import { StellarNetwork } from "types/types.d";

import "styles.scss";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(
      document.querySelector("body")?.classList.contains("dark-mode") || false,
    );
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header
          projectTitle="AMM Demo"
          projectLink="https://amm-demo.stellar.org"
          hasDarkModeToggle
          onDarkModeToggleEnd={() => {
            setIsDarkMode(isDarkMode);
          }}
          contentRight={<NetworkIndicator network={StellarNetwork.testnet} />}
        />

        <Layout.Content>
          <Switch>
            <Route exact path="/">
              <PoolsOverview />
            </Route>

            <Route exact path="/pool/:poolId">
              <PoolDetails isDarkMode={isDarkMode} />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </Layout.Content>

        <FooterWithNote />
      </Router>
    </Provider>
  );
};
