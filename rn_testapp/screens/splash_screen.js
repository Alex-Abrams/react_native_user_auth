import React from 'react';

import { View, Text, ActivityIndicator } from 'react-native';

class SplashScreen extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="blue"/>
        </View>
      );
    }


}

export default SplashScreen;
