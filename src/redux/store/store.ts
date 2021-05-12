import { createBrowserHistory } from "history";
import { createStore, compose, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";

import reduxSaga from "redux-saga";
import rootSaga from "../sagas";
import reducers from "../reducers";

const sagaMiddleware = reduxSaga();

export const history = createBrowserHistory();

const store = () => ({
  ...createStore(
    reducers(history),
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  ),
  runSaga: sagaMiddleware.run(rootSaga),
});

export default store;
