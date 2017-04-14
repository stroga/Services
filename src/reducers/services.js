import { UPLOAD_SERVICES } from '../constants';

import { services } from '../store';

export default function updateServices (state = services, action) {
  if (action.type === UPLOAD_SERVICES) {
    return [...action.services];
  }
  return state;
};