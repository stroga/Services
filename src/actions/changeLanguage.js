import {CHANGE_LANG, ON_GET_LANG, ON_START_CHANGE_LANG} from "../constants";

export function changeLanguage(commonView) {
  return {
    type: CHANGE_LANG,
    commonView
  };
}

export function onGetLanguage() {
  return {
    type: ON_GET_LANG
  };
}

export function onStartChangeLanguage(lang) {
  return {
    type: ON_START_CHANGE_LANG,
    lang
  };
}