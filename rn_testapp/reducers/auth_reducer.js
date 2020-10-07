import {
  RECEIVE_AUTH_TOKEN,
  LOGGED_IN_USER,
  IS_LOGGED_IN,
  LOGOUT_USER,
  REQEUST_USER_INFO,
  REQUEST_EMAIL,
  LOAD_SPLASH_SCREEN,
  RECEIVE_AUTH_TOKEN_SPINNER,
  RECEIVE_ERROR,
} from '../actions/auth_actions';

import merge from 'lodash/merge';

const INITIAL_STATE = {
  isLoading: false,
  loggedIn: false,
};

const _nullUser = Object.freeze({
  loggedIn: false,
  auth_token: null,
  user_email: null,
  splash_screen: false,
});

const authReducer = (state = { loggedIn: false }, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_AUTH_TOKEN:
      return merge({}, state, action.auth_token);

    case IS_LOGGED_IN:
      return merge({}, state, { loggedIn: action.loggedIn }, { splash_screen: false });

    case LOGOUT_USER:
      return _nullUser;

    case REQEUST_USER_INFO:
      return merge({}, state, { user: action.currentUser });

    case REQUEST_EMAIL:
      return merge({}, state, { user_email: action.email });

    case LOAD_SPLASH_SCREEN:
      return merge({}, state, { splash_screen: action.splash_screen });

    case RECEIVE_AUTH_TOKEN_SPINNER:
      return merge({}, state, action.auth_token, { splash_screen: action.splash_screen });

    case RECEIVE_ERROR:
      return merge({}, state, { error: action.error});

    default:
      return state;
  }
};

export default authReducer;
