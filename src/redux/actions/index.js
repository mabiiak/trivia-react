export const SET_LOGIN = 'SET_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';

export const setLogin = (name, email) => ({
  type: SET_LOGIN,
  name,
  email,
});

const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export function handleToken() {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    dispatch(setToken(token.token));
    localStorage.setItem('token', token.token);
  };
}
