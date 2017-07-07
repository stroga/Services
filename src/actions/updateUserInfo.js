export function updateUserInfo(obj) {
  return {
    type: 'CHANGE_USER_INFO',
    obj
  };
}

export function onChangeUserInfo(obj) {
  return {
    type: 'ON_CHANGE_USER_INFO',
    obj
  };
}