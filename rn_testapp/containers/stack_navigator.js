
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { AsyncStorage, Navigator } from 'react-native';

import LoginContainer from './login_screen_container';
import HomeContainer from '../containers/home_container';
import SignupContainer from './signup_container';


import { receiveAuthToken, getThoseItems } from '../actions/auth_actions';

class FarStack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_token: '',
    };
  }

  // -------------------------------------------------------------------
  // keep, explain with comments later $explain$
  _retrieveStorageToken = async () => {
    try {
      const auth_token = await AsyncStorage.getItem('token');
      if (auth_token !== null) {
        // We have data!!
        console.log("_retrieveStorageToken ", auth_token);
        // this, unlike _storeData, needs to dispatch the token
        this.props.authActions.receiveAuthToken({auth_token});
      } else {
        console.log("no data woo"); //dispatch null
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
        // We have data!! adwa
        console.log("_retrieveEmail ", value);
        this.props.authActions.requestEmail(value);
        // return value;
      } else {
        console.log("no data woo"); //dispatch null
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
    console.log("PROPPERS", this.props);
  }

  // componentDidUpdate(prevProps) {  // come back to this it might not work out, but things seem
                                      // ok with out it, have to test full async rejoin later
  //   if (this.props.auth_token !== prevProps.auth_token) {
  //     this.props.authActions.getUserInfo(this.props.email, this.props.auth_token);
  //   }
  //   console.log("componentDidUpdate");
  // }

  render() {
    const Stack = createStackNavigator();
    const { loggedIn } = this.props;


    return (
      <Stack.Navigator initialRouteName="login">
      {(loggedIn == false) ? (
        <>
        <Stack.Screen name="login" component={LoginContainer} navigation={this.props.navigation} />
        <Stack.Screen name="signup" component={SignupContainer} navigation={this.props.navigation} />
        </>
      ) : (
        <>
        <Stack.Screen name="Home" component={HomeContainer} navigation={this.props.navigation} />
        </>
      )}


      </Stack.Navigator>
    );
  }
}

export default FarStack;
