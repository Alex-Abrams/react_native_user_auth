import React from 'react';

import { View, Text, ActivityIndicator, Modal } from 'react-native';


class SplashScreen extends React.Component {
    constructor(props) {
      super(props);
    }

  //   <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
  // </View>
    render() {
      return(
        <Modal
          transparent={true}>
          <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center'}}>
            <ActivityIndicator size="large" color="blue"/>
          </View>
        </Modal>
      );
    }


}

export default SplashScreen;
