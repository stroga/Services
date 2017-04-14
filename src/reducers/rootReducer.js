import {combineReducers} from "redux";
import user from "./userStateChange";
import services from "./services";
import languageView from "./commonDesign";


export const rootReducer = combineReducers({
  user,
  services,
  languageView
});
