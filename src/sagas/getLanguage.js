import {put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';
import {DATALANGURL, LANGURL, ON_GET_LANG, ON_START_CHANGE_LANG} from '../constants';
import {uploadServices} from "../actions/uploadServices";
import {changeLanguage} from "../actions/changeLanguage";

function* getLang(action) {
  const resp = yield call(() => axios.get(LANGURL, {withCredentials: true}));
  const { services, ...langDataFiltered } = yield call(() => resp.data);
  yield put(uploadServices(services));
  yield put(changeLanguage(langDataFiltered));
}

function* changeLang(action) {
  const resp = yield call(() => axios.get(DATALANGURL + action.lang, {withCredentials: true}));
  const { services, ...langDataFiltered } = yield call(() => resp.data);
  yield put(uploadServices(services));
  yield put(changeLanguage(langDataFiltered));
}

export function* startChangeLang(lang) {
  yield takeEvery(ON_START_CHANGE_LANG, changeLang);
}

export function* getLanguage() {
  yield takeEvery(ON_GET_LANG, getLang);
}