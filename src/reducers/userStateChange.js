import {LOGIN, LOGOUT} from '../constants';
import { user } from '../store';

export default function updateUser(state = user, action) {
  if(action.type === LOGIN) {
    return { number: state.number + action.amount }
  }
  else if(action.type === LOGOUT) {
    return { number: state.number - action.amount }
  }
  else if(action.type === 'CHANGE_USER_INFO') {
    if ( !action.obj ) {
      return {};
    }
    return {...state, ...action.obj}
  }
  return state
}