import { SET_QUESTIONS } from '../actions';

const INITIAL_STATE = [];

function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_QUESTIONS:
      return action.payload;
    default:
      return state;
  }
}

export default questions;