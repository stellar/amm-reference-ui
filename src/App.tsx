import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Layout } from "@stellar/design-system";

import { store } from "config/store";
import { Header } from "components/Header";
import { FooterWithNote } from "components/FooterWithNote";

import { PoolsOverview } from "pages/PoolsOverview";
import { PoolDetails } from "pages/PoolDetails";
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

          <Route exact path="/pool/:poolId">
            <PoolDetails />
          </Route>

          <Route component={NotFound} />
        </Switch>
      </Layout.Content>

      <FooterWithNote />
    </Router>
  </Provider>
);
