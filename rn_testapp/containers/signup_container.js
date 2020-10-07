import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Signup from '../screens/signup_screen';
import * as authActions from '../actions/auth_actions';

const mapStateToProps = state => ({
  auth_token: state.auth_token,
  splash_screen: state.splash_screen,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
