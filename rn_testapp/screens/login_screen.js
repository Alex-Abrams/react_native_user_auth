import React, { Component } from 'react';

import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from 'react-native';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }
  // testy stuff, works etc
  // getUserToken() {
  //   return(
  //     <View>
  //       <Button
  //         title="get auth"
  //         color="green"
  //         onPress={() => {
  //           this.props.authActions.getThatToken();
  //         }}>
  //         </Button>
  //     </View>
  //   );
  // }

  _storeData = async (test_value) => {
  try {
    await AsyncStorage.setItem(
      'testkey',
      `${test_value}`
    );
  } catch (error) {
    // Error saving data
  }
};

_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('testkey');
    if (value !== null) {
      // We have data!!
      console.log(value);
    } else {
      console.log("no data woo");
    }
  } catch (error) {
    // Error retrieving data
  }
};

_deleteData = async () => {
  try {
    await AsyncStorage.removeItem(
      'testkey'
    );
  } catch (error) {
    // Error saving data
  }
};

  // WORKS
  reqItems() {
    return(
      <View>
        <Button
          title="get items"
          color="blue"
          onPress={() => {
            this.props.authActions.getThoseItems(this.props.auth_token);
          }}>
          </Button>
      </View>
    );
  }
  //WORKS!!
  _signInHandler() {
    // this.props.authActions.getThatToken(this.state.email, this.state.password);
    this.props.authActions.getThatToken(this.state.email, this.state.password)
    .then(auth_token => this._storeData(auth_token.auth_token.auth_token));
    // .then(auth_token => console.log("authyboy: ", auth_token.auth_token.auth_token));
  }


/// testing some async storage stuff
  testAsyncSet() {
    return(
      <View>
        <Button
          title="set storage"
          color="green"
          onPress={() => {
            this._storeData("im in ya storage");
          }}>
          </Button>
      </View>
    );
  }

  testAsyncGet() {
    return(
      <View>
        <Button
          title="get storage"
          color="purple"
          onPress={() => {
            this._retrieveData();
          }}>
          </Button>
      </View>
    );
  }

  testAsyncDelete() {
    return(
      <View>
        <Button
          title="delete storage"
          color="green"
          onPress={() => {
            this._deleteData();
          }}>
          </Button>
      </View>
    );
  }


  /////// end some async storage stuff

  // {this.getUserToken()}
  // {this.reqItems()}
  render() {
    // console.log(this.props);
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
          onPress={() => this._signInHandler(this.state.email, this.state.password)}
          >
        </Button>
        {this.reqItems()}
        {this.testAsyncSet()}
        {this.testAsyncGet()}
        {this.testAsyncDelete()}
      </View>
    );
  }
}

export default Login;
