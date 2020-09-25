import React, { Component } from 'react';

import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }


  _storeEmail = async (email) => {
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

  _storeData = async (auth_token) => {
  try {
    await AsyncStorage.setItem(
      'token',
      `${auth_token}`
    );
    // doesnt need dispatch to store here
     // \
  } catch (error) {
    // Error saving data
  }
};


userLogout = async () => {  //
  try {
    let keys = ['token', 'email'];
    await AsyncStorage.multiRemove(keys);
    this.props.authActions.logoutCurrentUser();
  } catch (error) {
    // Error saving data
    console.log("userLogout: ", error);
  }
};


// ----------------------------------------------------------------------
  //WORKS!!
  // ALSO THIS WORKS SO HARD!!!!! ITS IN ASYNC STORAGE
  _signInHandler() {
    // this.props.authActions.getThatToken(this.state.email, this.state.password);
    this.props.authActions.getThatToken(this.state.email, this.state.password)
    .then(auth_token => this._storeData(auth_token.auth_token.auth_token))
    .then(() => this.props.authActions.isLoggedIn(true))

  }



  logoutButton() {
    return(
      <View>
        <Button
          title="logout"
          color="green"
          onPress={() => {
            this.userLogout();
          }}>
          </Button>
      </View>
    );
  }


  toSignup({ navigation }) {
    return(
      <View>
        <Button
          title="New User"
          color="purple"
          onPress={() => this.props.navigation.navigate('signup')}
          >
        </Button>
      </View>
    );
  }

  render() {
    
    return(
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
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
          onPress={() => {this._signInHandler()}
        }/>

        {this.logoutButton()}
        {this.toSignup(this.props.navigation)}
      </View>
    );
  }
}

export default Login;
