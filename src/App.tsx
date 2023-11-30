import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "@stellar/design-system";
import { errorReporting } from "@stellar/frontend-helpers";

import { ROUTES } from "constants/routes";

import { store } from "config/store";
import { Header } from "components/Header";
import { NetworkIndicator } from "components/NetworkIndicator";
import { FooterWithNote } from "components/FooterWithNote";

import { PoolsOverview } from "pages/PoolsOverview";
import { PoolDetails } from "pages/PoolDetails";
import { NotFound } from "pages/NotFound";
import { StellarNetwork } from "types/types";

import "styles.scss";

errorReporting.reportErrors({
  projectName: "amm-demo",
});

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(
      document.querySelector("body")?.classList.contains("dark-mode") || false,
    );
  }, []);

  return (
    <Provider store={store}>
      <Header
        projectTitle="AMM Demo"
        projectLink={ROUTES.HOME}
        hasDarkModeToggle
        onDarkModeToggleEnd={() => {
          setIsDarkMode(isDarkMode);
        }}
        contentRight={<NetworkIndicator network={StellarNetwork.testnet} />}
      />

      <Layout.Content>
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<PoolsOverview />} />
            <Route
              path={`${ROUTES.POOL_DETAILS}/:poolId`}
              element={<PoolDetails isDarkMode={isDarkMode} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Layout.Content>
      <FooterWithNote />
    </Provider>
  );
};
