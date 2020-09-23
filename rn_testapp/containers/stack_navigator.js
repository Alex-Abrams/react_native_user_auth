
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { AsyncStorage, Navigator } from 'react-native';

import LoginContainer from './login_screen_container';
import Home from '../screens/home_screen';
import SignupContainer from './signup_container';

import { receiveAuthToken, getThoseItems } from '../actions/auth_actions';

class FarStack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_token: '',
    };
  }

  _retrieveData = async () => { // $delete$
    try {
      const value = await AsyncStorage.getItem('token'); // was 'auth_token'
      if (value !== null) {
        // We have data!!
        // this.props.authActions.checkLoggedIn(value);  //needs work // problem it likes splits the string
        // this.props.authActions.geThoseItems(value);
        // console.log("_retrieveData value: ", value); //works
        // this.setState({auth_token: value}); // causes some king of inifinite looop
        return value;
      } else {
        // console.log("fart", value); // value is definitlyt null
        // this.setState({auth_token: value});
        return value;

      }
      // 18337640566
    } catch (error) {
      // Error retrieving data
    }
  }; //


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
    // ------------------------------------------------------ $delete$
    this._retrieveData()
    .then(response => this.setState({auth_token: response}));
    console.log("componentDidMount");
    // ------------------------------------------------------

    this._retrieveStorageToken();
    this._retrieveStorageEmail();
    this.props.authActions.getUserInfo(this.props.email, this.props.auth_token);
    console.log("PROPPERS", this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth_token !== prevProps.auth_token) {
      this.props.authActions.getUserInfo(this.props.email, this.props.auth_token);
    }
  }

  render() {
    const Stack = createStackNavigator();
    const { loggedIn } = this.props;
    console.log(loggedIn);


    return (
      <Stack.Navigator>
      {(loggedIn) ? (
        <>
        <Stack.Screen name="login" component={LoginContainer} navigation={this.props.navigation} />
        <Stack.Screen name="signup" component={SignupContainer} />
        </>
      ) : (
        <>
        <Stack.Screen name="login" component={LoginContainer} navigation={this.props.navigation} />
        <Stack.Screen name="signup" component={SignupContainer} />
        </>
      )}


      </Stack.Navigator>
    );
  }
}

export default FarStack;
