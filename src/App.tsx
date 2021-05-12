import { useDispatch, connect } from "react-redux";

//styles
import "decentraland-ui/lib/dark-theme.css";
import "decentraland-ui/lib/styles.css";

//router
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

//components
import { Navbar, Page, Footer, Center, Loader } from "decentraland-ui";

import Connect from "./pages/Connect";
import Account from "./pages/Account";
import Accounts from "./pages/Accounts";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App({ router, pageLoading, provider }) {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar activePage="marketplace" isFullscreen />
      <Page isFullscreen>
        {router.location.pathname !== "/" && !provider ? (
          <Connect loading={pageLoading} />
        ) : pageLoading ? (
          <Loader active={pageLoading} />
        ) : (
          <ConnectedRouter history={history}>
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
            </Switch>
          </ConnectedRouter>
        )}
      </Page>
      <Footer isFullscreen />
    </>
  );
}
const mapStateToProps = ({ router, app: { pageLoading, provider } }) => {
  return {
    router,
    pageLoading,
    provider,
  };
};

export default connect(mapStateToProps)(App);
