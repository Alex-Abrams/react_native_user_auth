import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // apparently not working?, ok now working apaprently SafeAreaView was problem
// it was in the long import from react-native above
// if you need safeareaview its goes like: import SafeAreaView from 'react-native-safe-view';
// import { createStackNavigator } from 'react-navigation-stack';
import StackNavigatorContainer from './containers/stack_navigator_container';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import logger from 'redux-logger'
import authReducer from './reducers/auth_reducer';
import rootReducer from './reducers/root_reducer';
import LoginContainer from './containers/login_screen_container';
import Home from './screens/home_screen';

import FarStack from './containers/stack_navigator';


let store = null;

function configureStore(initialState = {}) {
  // Check to avoid multiple configured stores
  if (store) {
    return store;
  }
  const middlewares = [thunk, logger];

  store = createStore(
    authReducer,
    // rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  return store;
}

let teststore = configureStore();



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

// <Stack.Navigator initialRoute="LoginForm"> //


 // see FarStack class

const App = () => {
  return (
    <Provider store={teststore}>
      <NavigationContainer>
        <StackNavigatorContainer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
// "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1OTE5MTMxMTF9.9osQhT0-xRHzcza02yr2BPGvovP5ePm7glpA5zEa820"
