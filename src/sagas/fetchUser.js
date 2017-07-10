import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {ON_CHANGE_USER_INFO, AUTH} from '../constants';
import {updateUserInfo} from '../actions/updateUserInfo';

function* fetchUser(action) {
  const resp = yield call(axios.get, AUTH, {withCredentials: true});
  yield put(updateUserInfo(resp.data));
}

export function* changeUserInfo() {
  yield takeEvery(ON_CHANGE_USER_INFO, fetchUser);
}