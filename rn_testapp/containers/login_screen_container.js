import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from '../screens/login_screen';
import * as authActions from '../actions/auth_actions';

const mapStateToProps = state => ({
  auth_token: state.auth_token,
})

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
