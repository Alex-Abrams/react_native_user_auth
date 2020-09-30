import React, { Component } from 'react';

import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   console.log("zoooooop", this.props.loggedIn);
  //   if ( typeof this.props.loggedIn == 'undefined' || this.props.loggedIn == false) {
  //
  //     this.props.navigation.navigate('signup');
  //   };
  // }

  sendOut({navigation}) {
    if ( typeof this.props.loggedIn == 'undefined' || this.props.loggedIn == false) {

      this.props.navigation.navigate('login');
    };
  }

  userLogout = async () => {  //logout button should be its own container so i dont have to do this every time
    try {
      let keys = ['token', 'email'];
      await AsyncStorage.multiRemove(keys);
      this.props.authActions.logoutCurrentUser();
    } catch (error) {
      // Error saving data
      console.log("userLogout: ", error);
    }
  };



  logoutButton() {
    return(
      <View>
        <Button
          title="logout"
          color="green"
          onPress={() => { this.userLogout() }}>
        </Button>
      </View>
    );
  }


  // {this.sendOut(this.props.navigation)}
  render() {

    return(
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Text>CITYPATOWN, WELCOME HOME</Text>
        {this.logoutButton()}
      </View>
    );
  } // render
} // class

export default Home;
