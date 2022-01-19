export const SET_LOGIN = 'SET_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SET_SCORE = 'SET_SCORE';

export const setLogin = (payload) => ({
  type: SET_LOGIN,
  name: payload.name,
  email: payload.email,
});

export const setScore = (payload) => ({
  type: SET_SCORE,
  score: payload.score,
  assertions: payload.assertions,
});

const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export function handleToken() {
  return async (dispatch) => {
    console.log('teste');
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const token = await response.json();
    const INVALID_CODE = 3;
    if (token.response_code === INVALID_CODE || token.token === '') {
      dispatch(handleToken());
    } else {
      dispatch(setToken(token.token));
      localStorage.setItem('token', token.token);
    }
  };
}

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const setQuestions = (json) => ({
  type: SET_QUESTIONS,
  payload: json,
});

export function handleQuestions() {
  return async (dispatch, getState) => {
    dispatch(requestQuestions());
    const userToken = getState();
    console.log(userToken);
    if (userToken.token === '') {
      console.log('oi');
      await dispatch(handleToken());
    }
    const newToken = getState().token;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
    const responseJson = await response.json();
    const INVALID_CODE = 3;
    if (responseJson.response_code === INVALID_CODE) {
      await dispatch(handleToken());
      dispatch(handleQuestions());
    } else {
      dispatch(setQuestions(responseJson.results));
    }
  };
}
