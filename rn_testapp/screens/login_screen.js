import React, { Component } from 'react';

import { View, Button, Text } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

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
    this.props.authActions.getThatToken(this.state.email, this.state.password);
  }

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
      </View>
    );
  }
}

export default Login;
