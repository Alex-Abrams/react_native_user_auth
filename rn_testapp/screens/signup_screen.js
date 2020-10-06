import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from 'react-native';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      token: '',
    };

  }

  _storeData = async (auth_token) => {
    console.log("toooooooooooooooooooooooooooooooooooooooooken");
  try {
    await AsyncStorage.setItem(
      'token',
      `${auth_token}`
    );

    this.props.authActions.requestEmail(this.state.email);
    // doesnt need dispatch to store here
     // \
  } catch (error) {
    // Error saving data
  }
};

_storeEmail = async (email) => {
  console.log("emaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaail");
  try {
    await AsyncStorage.setItem(
      'email',
      `${email}`
    );
    this.props.authActions.requestEmail(email);
  } catch (error) {
    // Error saving data
  }
};

  _signUpHandler() {
    this.props.authActions.loadSplashScreen(true);

    this.props.authActions.signupUser(this.state.email, this.state.password, this.state.password_confirmation)
    .then(() => this.props.authActions.getThatToken(this.state.email, this.state.password))
    // .then(auth_token => this._storeData(auth_token.auth_token.auth_token)) // original
    .then((auth_token) => {
      this._storeData(auth_token.auth_token.auth_token);
      this.setState({ token: auth_token.auth_token.auth_token });
    })
    .then(() => this._storeEmail(this.state.email))
    .then(() => this.props.authActions.getUserInfo(this.state.email, this.state.token))
    .then(() => this.props.authActions.loadSplashScreen(false));

    // .then(() => this.props.authActions.isLoggedIn(true));

    // this.props.authActions.loadSplashScreen(false);
  }


  _testFindEmail = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // We have data!!
        console.log("_testFindEmail ", value);
        // this.props.authActions.requestEmail(value);
        // return value;
      } else {
        console.log("no email sick"); //dispatch null
        // this.props.authActions.requestEmail(null);  // might actually need to be an error action instead
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  emailGetter() {
    return(
      <View>
        <Button
          title="email get"
          color="purple"
          onPress={() => {
            this._testFindEmail();
          }}>
        </Button>
      </View>
    );
  }

  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
      <Text>SIGNUP SCREEN</Text>
        <Hoshi
          label={'Email'}
          borderColor={'#b76c94'}
          backgroundColor={'#FFF'}
          onChangeText={email => this.setState({email})}
          >
        </Hoshi>

        <Hoshi
          label={'Password'}
          borderColor={'#b76c94'}
          backgroundColor={'#FFF'}
          onChangeText={password => this.setState({password})}
          >
        </Hoshi>
        <Hoshi
          label={'Confirm Password'}
          borderColor={'#b76c94'}
          backgroundColor={'#FFF'}
          onChangeText={password_confirmation => this.setState({password_confirmation})}
          >
        </Hoshi>

        <Button
          title="Submit"
          buttonStyle={{
            fontSize: 20,
            color: '#ffffff',
            backgroundColor: '#00cc00',
            padding: 20,
            marginTop: 10
          }}
          styleDisabled={{ color: 'red' }}
          onPress={() => this._signUpHandler()}
        />

      {this.emailGetter()}
        </View>
    );
  }
}

export default Signup;
