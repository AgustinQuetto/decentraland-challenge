import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { initProvider } from "./redux/actions";

//styles
import "decentraland-ui/lib/dark-theme.css";
import "decentraland-ui/lib/styles.css";

//router
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter, push } from "connected-react-router";
import { history } from "./redux/store";

//components
import { Navbar, Page, Footer, Center, Loader } from "decentraland-ui";

import Connect from "./pages/Connect";
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
        <Center>
          {pageLoading ? (
            <Loader active={pageLoading} />
          ) : router.location.pathname !== "/" && !provider ? (
            <Connect />
          ) : (
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/">
                  <Connect />
                </Route>
                <Route exact path="/accounts">
                  <Accounts />
                </Route>
              </Switch>
            </ConnectedRouter>
          )}
        </Center>
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
