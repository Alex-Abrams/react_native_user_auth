/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import logger from 'redux-logger'
import authReducer from './reducers/auth_reducer';
import LoginContainer from './containers/login_screen_container';


let store = null;

function configureStore(initialState = {}) {
  // Check to avoid multiple configured stores
  if (store) {
    return store;
  }
  const middlewares = [thunk, logger];

  store = createStore(
    authReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  return store;
}

let teststore = configureStore();

  // console.log("hello");
  // let findAuth = null;


  // fetch('http://10.0.2.2:3000/authenticate', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: "alex@gmail.com",
  //       password: 'password'
  //     })
  //   }).then(response => {
  //     console.log("RES", response.json());
  //     // let findAuth = response.json();
  //   });
  
// working one below
    // async function getAuthToken() {
    //   const authHolder = [];
    //   return fetch('http://10.0.2.2:3000/authenticate', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //         email: "alex@gmail.com",
    //         password: 'password'
    //       })
    //     }).then((response) => response.json())
    //     .then((json) => {
    //       console.log("jsonauthtoken", json.auth_token);
    //       // console.log(typeof json.auth_token); //string
    //       return authHolder.push(json.auth_token);
    //       // return json.auth_token;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    //
    // const authToken = getAuthToken();
    //
    // console.log(authToken);

    // async function getItems() {
    //   return fetch('http://10.0.2.2:3000/items', {
    //     method: 'GET',
    //     headers: {
    //       "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1OTE5MjA2ODJ9.YgYv9wuPtkarq-i0E1Mb9CE-Nhribwg-8MA8SGLEd0U"
    //     }
    //   }).then((response) => response.json())
    //   .then((json) => {
    //     console.log(json); // returns an array
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
    //
    // getItems();

  // console.log("FART: ", findAuth);

  // this.getData();
  // <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
  // <Text>hello world! Lets test some shit</Text>
  // </View>

const App = () => {
  return (
    <Provider store={teststore}>
      <LoginContainer />
    </Provider>
  );
};

export default App;
// "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1OTE5MTMxMTF9.9osQhT0-xRHzcza02yr2BPGvovP5ePm7glpA5zEa820"
