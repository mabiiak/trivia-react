export const SET_LOGIN = 'SET_LOGIN';

export const setLogin = (name, email) => ({
  type: SET_LOGIN,
  name,
  email,
});
