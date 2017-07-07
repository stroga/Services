import {put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {ON_CHANGE_USER_INFO, AUTH} from '../constants';
import {updateUserInfo} from '../actions/updateUserInfo';

function* fetchUser(action) {
  const resp = yield call(axios.get, AUTH);
  const respReady = yield call(() => resp.data);
  yield put(updateUserInfo(respReady));
}

export function* changeUserInfo() {
  yield takeLatest(ON_CHANGE_USER_INFO, fetchUser);
}