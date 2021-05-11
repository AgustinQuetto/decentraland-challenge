import manager from "./manager";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([manager()]);
}
