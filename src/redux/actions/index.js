import store from "../store";

export const SET_LOGIN = 'SET_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const setLogin = (payload) => ({
  type: SET_LOGIN,
  name: payload.name,
  email: payload.email,
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

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const setQuestions = (json) => ({
  type: SET_QUESTIONS,
  payload: json,
})

export function handleQuestions() {
  return async (dispatch) => {
    dispatch(requestQuestions());
    //const userToken = localStorage.getItem('token');
    const userToken = store.getState();
    console.log(userToken);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`);
    const responseJson = await response.json();
    if(responseJson.response_code === 3) {
      handleToken();
      handleQuestions();
    }else {
      dispatch(setQuestions(responseJson.results));
    }
  }
}
