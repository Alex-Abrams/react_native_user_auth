
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import LoginContainer from './login_screen_container';
import Home from '../screens/home_screen';

import { receiveAuthToken, getThoseItems } from '../actions/auth_actions';

class FarStack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth_token: '',
      validAuthToken: false,
    };
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('testkey');
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

  componentDidMount() {
    this._retrieveData()
    // .then(response => console.log("responseyboy", response)); /// has possiblities
    .then(response => this.setState({auth_token: response}));
    // console.log("stateyboy: ", this.state); // does not show up in this.state here
  }

  // getResponse() {
  //   this.props.authActions.checkLoggedIn(this.state.auth_token)
  //   // .then(response => console.log("responseyfailsucc: ", response)); // send this to this.setState
  //   .then(response => response);
  //   // .then(response => this.setState({validAuthToken: response})); /// infiniite loop
  // }


  render() {
    const Stack = createStackNavigator();
    const { loggedIn } = this.props;
    // console.log("authyboy:", this.state.auth_token);
    this.props.authActions.sendToken(this.state.auth_token); // bread and butter right here
                                                            // sends to auth token two

    // console.log("PORPS: ", this.props);
    // hdu wajk kajwdi  jhaidjh ihhhk akydij kajhjh kkhwd khh khwd njhwkh kahdhkhkh a
    //
    this.props.authActions.checkLoggedIn(this.state.auth_token); // dispatches the true/false thing

    // console.log("inOrOut!!!: ", inOrOut);
    // i can do it if i just believe in myself and focus and try to be the best i can be!
    // not sitting around in self pity!

    // {this.getResponse()}
    // {console.log("authyboy:", this.state.auth_token)}
    // {(loggedIn) ? console.log("true") : console.log("false")}
    // <Stack.Screen name="home" component={Home} />
    return (
      <Stack.Navigator>
      {(loggedIn) ? (
        <Stack.Screen name="login" component={LoginContainer} />
      ) : (
        <Stack.Screen name="login" component={LoginContainer} />
      )}


      </Stack.Navigator>
    );
  }
}

export default FarStack;
