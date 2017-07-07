import {CHANGE_LANG, ON_CHANGE_LANG} from "../constants";

export function changeLanguage(commonView) {
  return {
    type: CHANGE_LANG,
    commonView
  };
}

export function onChangeLanguage() {
  return {
    type: ON_CHANGE_LANG
  };
}