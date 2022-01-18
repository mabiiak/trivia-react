import { SET_LOGIN, SET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
    };
  default:
    return state;
  }
}

export default player;
