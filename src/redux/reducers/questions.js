import { SET_QUESTIONS } from '../actions';
import { REQUEST_QUESTIONS } from '../actions';
import { FAILED_REQUEST } from '../actions';

const INITIAL_STATE = {
  isFetching: false,
  questionList: [],
  error: '',
};

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_QUESTIONS:
      return { ...state, isFetching: true };
    case SET_QUESTIONS:
      return {...state, questionList: action.payload, isFetching: false };
    case FAILED_REQUEST:
      return { ...state, error: action.payload, isFetching: false }
    default:
      return state;
  }
}

export default questions;