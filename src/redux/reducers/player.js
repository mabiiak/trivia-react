import { SET_LOGIN, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: 'Anonymous',
  assertions: 0,
  score: 0,
  email: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_LOGIN:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case SET_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
}

export default player;
