import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "@stellar/design-system";

import { store } from "config/store";
import { Header } from "components/Header";

import { PoolsOverview } from "pages/PoolsOverview";
import { NotFound } from "pages/NotFound";

import "styles.scss";

export const App = () => (
  <Provider store={store}>
    <Router>
      <Header />

      <Layout.Content>
        <Switch>
          <Route exact path="/">
            <PoolsOverview />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Layout.Content>

      <Layout.Footer gitHubLink="https://github.com/stellar/amm-reference-ui" />
    </Router>
  </Provider>
);
