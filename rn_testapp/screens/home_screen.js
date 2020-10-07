import React, { Component } from 'react';

import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  userLogout = async () => {
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
