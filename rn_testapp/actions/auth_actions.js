export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_AUTH_TOKEN = "RECEIVE_AUTH_TOKEN";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const LOGOUT_USER = "LOGOUT_USER";
export const REQEUST_USER_INFO = "REQEUST_USER_INFO";
export const REQUEST_EMAIL = "REQUEST_EMAIL";
export const LOAD_SPLASH_SCREEN = "LOAD_SPLASH_SCREEN";
export const RECEIVE_AUTH_TOKEN_SPINNER = "RECEIVE_AUTH_TOKEN_SPINNER";
export const RECEIVE_ERROR = "RECEIVE_ERROR";
import fetch from 'cross-fetch';
import { AsyncStorage } from 'react-native';


export const loadSplashScreen = (splash_screen) => ({
  type: LOAD_SPLASH_SCREEN,
  splash_screen
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_USER,
}); // the new stuff

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveAuthToken = auth_token => ({
  type: RECEIVE_AUTH_TOKEN,
  auth_token
});

export const receiveAuthTokenAndSpinner = (auth_token, splash_screen) => ({
  type: RECEIVE_AUTH_TOKEN_SPINNER,
  auth_token,
  splash_screen,
});

export const isLoggedIn = loggedIn => ({
  type: IS_LOGGED_IN,
  loggedIn
});

export const requestUserInfo = currentUser => ({
  type: REQEUST_USER_INFO,
  currentUser
});

export const requestEmail = email => ({
  type: REQUEST_EMAIL,
  email,
});

export const receiveError = error => ({
  type: RECEIVE_ERROR,
  error
});

//// in use $explain$
export function getUserInfo(email, auth_token) {
  return function action(dispatch) {
    // dispatch(loadSplashScreen(true));
    const request = fetch(`http://10.0.2.2:3000/users/${email}`, {
      method: 'GET',
        headers: {
          "Authorization": auth_token
        }
    });


    return request.then(
      response => { response.status == 200 ? dispatch(isLoggedIn(true)) : dispatch(isLoggedIn(false))},
      // response => console.log("STATUS???: ", response.status),
      // response => console.log("response STATUS: ", response.status), // response.status == 200 is what we want
      err => console.log('get userinfo error ', err)
    )
    .then(
      json => console.log("userrequester: ", json),
      err => console.log("userrequester error", err) // review this nonsenjsew!!!!~!
    );
    // dispatch(loadSplashScreen(false));
  }
}


////
//// in use $explain$
export function getThatToken(email, password) {
  // prolly should clear errors here
  return function action(dispatch) {
    // dispatch(loadSplashScreen(true));
    const request = fetch('http://10.0.2.2:3000/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`
      })
    }); //original, and ends here
  // }).then(() => console.log("hell from get that token"));

  // console.log("request...........", request);

    // request.then(() => console.log(".then success!"));

    // request.then(
    //   // response => console.log("response.status....", response.status),
    //   response => { response.status == 200 ? dispatch(receiveError(null)) : dispatch(receiveError("chicken speers"))},
    // );

    // dispatch(loadSplashScreen(false));
     return request.then(
      // response => console.log("REQUQEST!: ", response),
      response => response.json(), // oringal
      // response => { response.status == 200 ? response.json() : dispatch(receiveError("Invalid Credentials"))}, //finish this p wednesday
      // response => console.log("praying for an id", response.json()),
      // err => console.log("error!!: ", err)
    ) //;
    .then(
      // json => console.log(json),

      json => dispatch(receiveAuthToken(json)),
      err => console.log("jsonerror ", json)
    );
  }
}


///
/// sign UP function
export function signupUser(email, password, password_confirmation) {
  return function action(dispatch) {
    // dispatch(loadSplashScreen(true));
    const request = fetch('http://10.0.2.2:3000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        password_confirmation: `${password_confirmation}`
      })
    });

    // dispatch(loadSplashScreen(false));
    // return request;
    return request.then(
      // response => { response.status !== 200 ? console.log('clear errors') : console.log("dispatch error") },
      response => {if (response.status !== 200) { dispatch(receiveError("An error occured"))}},
      err => console.log("singupUser test failed")
    );
  }
}
