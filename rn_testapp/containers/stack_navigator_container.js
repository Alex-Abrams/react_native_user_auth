import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FarStack from './stack_navigator';
import * as authActions from '../actions/auth_actions';

const mapStateToProps = state => ({
  auth_token: state.auth_token,
  loggedIn: state.loggedIn,
  splash_screen: state.splash_screen,
  email: state.email,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarStack);
