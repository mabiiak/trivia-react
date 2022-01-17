import { SET_QUESTIONS, REQUEST_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  questionList: [],
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case SET_QUESTIONS:
    return { ...state, questionList: action.payload, isFetching: false };
  default:
    return state;
  }
}

export default questions;
