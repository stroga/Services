import {put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {LANGURL, ON_CHANGE_LANG} from '../constants';
import {uploadServices} from "../actions/uploadServices";

function* getLang(action) {
  const resp = yield call(axios.get, LANGURL);
  const respReady = yield call(() => resp.data);
  yield put(uploadServices(respReady.services));
}

export function* getLanguage() {
  yield takeLatest(ON_CHANGE_LANG, getLang);
}