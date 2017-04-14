import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

function fetchUser () {
  console.log(111111111);
}

export function* rootSaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}