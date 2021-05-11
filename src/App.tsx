import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

//styles
import "decentraland-ui/lib/dark-theme.css";
import "decentraland-ui/lib/styles.css";

//router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";

//components
import { Navbar, Page, Footer, Center, Loader } from "decentraland-ui";

import Connect from "./components/Connect";
import Wallets from "./components/Wallets";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App({ pageLoading, provider }) {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar activePage="marketplace" isFullscreen />
      <Page isFullscreen>
        <Center>
          {pageLoading ? (
            <Loader active={pageLoading} />
          ) : (
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact path="/">
                  <Connect />
                </Route>
                <Route exact path="/wallets">
                  <Wallets />
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
const mapStateToProps = ({ pageLoading, provider }) => {
  return {
    pageLoading,
    provider,
  };
};

export default connect(mapStateToProps)(App);
