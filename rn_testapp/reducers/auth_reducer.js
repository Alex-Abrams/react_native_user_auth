import {
  RECEIVE_AUTH_TOKEN,
  LOGGED_IN_USER,
  IS_LOGGED_IN,
} from '../actions/auth_actions';

import merge from 'lodash/merge';

const INITIAL_STATE = {
  isLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_AUTH_TOKEN:
      // console.log("reducer test", action.auth_token);
      return merge({}, state, action.auth_token);
    case LOGGED_IN_USER:
      return merge({}, state, action.auth_token_two);
    case IS_LOGGED_IN:
      return merge({}, state, { loggedIn: action.loggedIn });
    default:
      return state;
  }
};

export default authReducer;
