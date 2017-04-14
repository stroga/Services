import { CHANGE_LANG } from '../constants';
import { commonDesign } from '../store';

export default function changeLanguage(state = commonDesign, action) {
  if(action.type === CHANGE_LANG ) {
    return Object.assign({}, action.commonView);
  }
  return state
}