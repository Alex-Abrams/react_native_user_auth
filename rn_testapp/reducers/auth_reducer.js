import {
  RECEIVE_AUTH_TOKEN,
  LOGGED_IN_USER,
  IS_LOGGED_IN,
  LOGOUT_USER,
  REQEUST_USER_INFO,
  REQUEST_EMAIL, // should async the email as well
} from '../actions/auth_actions';

import merge from 'lodash/merge';

const INITIAL_STATE = {
  isLoading: false,
};

const _nullUser = Object.freeze({
  loggedIn: null,
  auth_token_two: null,
  auth_token: null,
  user: null,
  user_email: null,
});

const authReducer = (state = INITIAL_STATE, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_AUTH_TOKEN:
      return merge({}, state, action.auth_token);
    case LOGGED_IN_USER:
      return merge({}, state, action.auth_token_two);
    case IS_LOGGED_IN:
      return merge({}, state, { loggedIn: action.loggedIn });
    case LOGOUT_USER:
      // basically want to remove any auth_tokens from the state, doesnt matter if still in datbase
      return _nullUser;
    case REQEUST_USER_INFO:
      return merge({}, state, { user: action.currentUser });

    case REQUEST_EMAIL:
      return merge({}, state, { user_email: action.email });
    default:
      return state;
  }
};

export default authReducer;
