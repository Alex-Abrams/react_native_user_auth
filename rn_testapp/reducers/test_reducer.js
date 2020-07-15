import {
  LOGGED_IN_USER,
} from '../actions/auth_actions';

import merge from 'lodash/merge';

const authReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case LOGGED_IN_USER:
      return merge({}, state, action.auth_token);
    default:
      return state;
  }
};

export default authReducer;
