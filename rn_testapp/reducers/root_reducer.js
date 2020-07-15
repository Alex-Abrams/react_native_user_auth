import { combineReducers } from 'redux';
import testReducer from './test_reducer';
import authReducer from './auth_reducer';


const rootReducer = combineReducers({
  auth_token: authReducer,
  test_token: testReducer,
});

export default rootReducer;
