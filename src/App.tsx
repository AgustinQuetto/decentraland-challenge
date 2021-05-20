import { FC } from "react";
import { connect } from "react-redux";

//styles
import "decentraland-ui/lib/dark-theme.css";
import "decentraland-ui/lib/styles.css";

//router
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

//components
import { Navbar, Page, Footer, Loader } from "decentraland-ui";

//pages
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";
import Contract from "./pages/Contract";

//components
import Connect from "./components/Connect";
import Transfer from "./components/Transfer";
import Alert from "./components/Alert";

declare global {
  interface Window {
    ethereum: any;
  }
}

type Props = {
  router: any;
  pageLoading: boolean;
  provider: any;
};

const App: FC<Props> = ({ router, pageLoading, provider }) => {
  return (
    <ConnectedRouter history={history}>
      <Navbar activePage="marketplace" isFullscreen />
      <Page isFullscreen>
        {router.location.pathname !== "/" && !provider ? (
          <Connect loading={pageLoading} />
        ) : pageLoading ? (
          <Loader active={pageLoading} />
        ) : (
          <Switch>
            <Route exact path="/">
              <Connect loading={pageLoading} />
            </Route>
            <Route exact path="/accounts">
              <Accounts />
            </Route>
            <Route path="/account/:address">
              <Account />
            </Route>
            <Route path="/contracts/:name">
              <Contract />
            </Route>
          </Switch>
        )}
      </Page>
      <Footer isFullscreen />
      <Transfer />
      <Alert />
    </ConnectedRouter>
  );
};

const mapStateToProps = ({ router, app: { pageLoading, provider } }) => {
  return {
    router,
    pageLoading,
    provider,
  };
};

export default connect(mapStateToProps)(App);
