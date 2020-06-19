import {
  RECEIVE_AUTH_TOKEN
} from '../actions/auth_actions';

import merge from 'lodash/merge';

const authReducer = (state = {}, action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_AUTH_TOKEN:
      return merge({}, state, action.auth_token);
    default:
      return state;
  }
};

export default authReducer;
