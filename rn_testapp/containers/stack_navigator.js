
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { AsyncStorage, Navigator } from 'react-native';

import LoginContainer from './login_screen_container';
import HomeContainer from '../containers/home_container';
import SignupContainer from './signup_container';
import SplashScreen from '../screens/splash_screen';


import { receiveAuthToken, getThoseItems } from '../actions/auth_actions';

class FarStack extends React.Component {
  constructor(props) {
    super(props);
  }

  // -------------------------------------------------------------------
  // keep, explain with comments later $explain$
  _retrieveStorageToken = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('token');
      if (auth_token !== null) {
        this.props.authActions.receiveAuthToken({auth_token});
      } else {
        this.props.authActions.receiveAuthToken(null);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  // copy from login_screen
  _retrieveStorageEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        this.props.authActions.requestEmail(value);
        // return value;
      } else {
        this.props.authActions.requestEmail(null);
      }

    } catch (error) {
      // Error retrieving data
    }
  };

  // -------------------------------------------------------------------

  componentDidMount() {
    this._retrieveStorageToken();
    this._retrieveStorageEmail();
    this.props.authActions.getUserInfo(this.props.email, this.props.auth_token);
  }


// above is for the stuff between the stack navigators....

  render() {
    const Stack = createStackNavigator();
    const { loggedIn, splash_screen } = this.props;

    return (
      <Stack.Navigator initialRouteName="login">

        {(loggedIn == true) ? (
          <>
          <Stack.Screen name="Home" component={HomeContainer} navigation={this.props.navigation} />
          </>
        ) : (
          <>
          <Stack.Screen name="login" component={LoginContainer} navigation={this.props.navigation} />
          <Stack.Screen name="signup" component={SignupContainer} navigation={this.props.navigation} />
          </>
          )}

      </Stack.Navigator>
    );
  }
}

export default FarStack;
