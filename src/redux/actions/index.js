export const SET_LOGIN = 'SET_LOGIN';
export const SET_TOKEN = 'SET_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const SET_QUESTIONS = 'SET_QUESTIONS';
export const FAILED_REQUEST = 'FAILED_REQUEST';

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

const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

const setQuestions = (json) => ({
  type: SET_QUESTIONS,
  payload: json.results,
})

const failedRequestQuestions = (error) => ({
  type: FAILED_REQUEST, payload:error
})

export function handleQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    const userToken = localStorage.getItem('token');
    return fetch(`https://opentdb.com/api.php?amount=5&token=${userToken}`)
      .then((request) => request.json()
        .then(
          (json) => dispatch(setQuestions(json))
        )
      );
  }
}
