import React, { Component } from 'react';

import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { AsyncStorage } from 'react-native';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return(
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <Text>CITYPATOWN, WELCOME HOME</Text>
      </View>
    );
  } // render
} // class

export default Home;
