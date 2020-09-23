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

  _storeEmail = async (email) => {
    try {
      await AsyncStorage.setItem(
        'email',
        `${email}`
      );
      console.log("fart");
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


_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // We have data!!
      console.log("_retrieveData ", value);
      // this, unlike _storeData, needs to dispatch the token
      this.props.authActions.receiveAuthToken(value);
    } else {
      console.log("no data woo"); //dispatch null
      this.props.authActions.receiveAuthToken(null); // might actually need to be an error action instead
    }
  } catch (error) {
    // Error retrieving data
  }
};


_retrieveEmail = async () => {
  try {
    const value = await AsyncStorage.getItem('email');
    if (value !== null) {
      // We have data!!
      console.log("_retrieveEmail ", value);
      this.props.authActions.requestEmail(value);
      // return value;
    } else {
      console.log("no data woo"); //dispatch null
      this.props.authActions.requestEmail(null);  // might actually need to be an error action instead
    }
  } catch (error) {
    // Error retrieving data
  }
};


userLogout = async () => {  // formally deleteData
  try {
    let keys = ['token', 'email'];
    await AsyncStorage.multiRemove(keys);
    this.props.authActions.logoutCurrentUser();
  } catch (error) {
    // Error saving data
    console.log("userLogout: ", error);
  }
};


// testing the delete multi keys---------------------------------------------------------------------- $delete$
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

_testFindToken = async () => { // $delete$
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // We have data!!
      console.log("_testFindToken ", value);
      // this.props.authActions.requestEmail(value);
      // return value;
    } else {
      console.log("no token sick"); //dispatch null
      // this.props.authActions.requestEmail(null);  // might actually need to be an error action instead
    }
  } catch (error) {
    // Error retrieving data
  }
};

testEmailTokenGetter() { // $delete$
  return(
    <View>
      <Button
        title="Email/Token Get"
        color="purple"
        onPress={() => { this._testFindEmail(); this._testFindToken(); }}>
      </Button>
    </View>
  );
}
// ----------------------------------------------------------------------

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
  // ALSO THIS WORKS SO HARD!!!!! ITS IN ASYNC STORAGE
  _signInHandler() {
    // this.props.authActions.getThatToken(this.state.email, this.state.password);
    this.props.authActions.getThatToken(this.state.email, this.state.password)
    .then(auth_token => this._storeData(auth_token.auth_token.auth_token)); // i know its a little wonkey to say it 3 times
    // .then(auth_token => console.log("authyboy: ", auth_token.auth_token.auth_token));
  }


/// testing some async storage stuff
  // testAsyncSet() { //this is unnecessary cant delete later
  //   return(
  //     <View>
  //       <Button
  //         title="set storage"
  //         color="green"
  //         onPress={() => {
  //           this._storeData("im in ya storage");
  //         }}>
  //         </Button>
  //     </View>
  //   );
  // }

  testAsyncGet() {
    return(
      <View>
        <Button
          title="get token"
          color="purple"
          onPress={() => {
            this._retrieveData();
          }}>
          </Button>
      </View>
    );
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

  retrieveUserInfo(email, auth_token) {
    return(
      <View>
        <Button
          title="get user info"
          color="blue"
          onPress={() => {
            this.props.authActions.getUserInfo(email, auth_token);
          }}>
        </Button>
      </View>
    );
  }

  emailGetter() {
    return(
      <View>
        <Button
          title="email get"
          color="purple"
          onPress={() => {
            this.props.authActions.getUserInfo('email', 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJleHAiOjE1OTkyNjIwODh9.WX0CLsW3eoTYnl0STdBVfzEbBFJJ58tI_7IIXB1OlBw');
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

  /// this here is my tetss for getting user information, and using that to ping the server to check async



  /////// end some async storage stuff

  // {this.getUserToken()}
  // {this.reqItems()}
  // {this.retrieveUserInfo("email", this.props.auth_token)}
  // {this.reqItems()}
  // {this.testAsyncGet()}
  // {this.emailGetter()}
  // {this.testEmailTokenGetter()}


  render() {

    // const email_get = this._retrieveEmail();
    // const token_get = this._retrieveData();

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
          onPress={() => {this._signInHandler(this.state.email, this.state.password); this._storeEmail(this.state.email);}
        }/>

        {this.logoutButton()}
        {this.toSignup(this.props.navigation)}
      </View>
    );
  }
}

export default Login;
