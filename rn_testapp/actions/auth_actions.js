export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOAD_SPINNER = 'LOAD_SPINNER';
export const FAILED_LOGIN = 'FAILED_LOGIN';
export const RECEIVE_AUTH_TOKEN = "RECEIVE_AUTH_TOKEN";
export const LOGGED_IN_USER = "LOGGED_IN_USER";
export const IS_LOGGED_IN = "IS_LOGGED_IN";
export const LOGOUT_USER = "LOGOUT_USER";
export const REQEUST_USER_INFO = "REQEUST_USER_INFO"
import fetch from 'cross-fetch';
import { AsyncStorage } from 'react-native';

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

export const loggedInUser = auth_token_two => ({
  type: LOGGED_IN_USER,
  auth_token_two
});

export const isLoggedIn = loggedIn => ({
  type: IS_LOGGED_IN,
  loggedIn
});

export const requestUserInfo = currentUser => ({
  type: REQEUST_USER_INFO,
  currentUser
});

////// curl -H "Content-Type: application/json" -X POST -d '{"email":"alex@gmail.com","password":"password"}' http://localhost:3000/authenticate
//// curl -H "Content-Type: application/json" -X POST -d '{"email":"email","password":"password"}' http://localhost:3000/authenticate
/////// curl -H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJleHAiOjE1OTY2NTU3MTF9.qlABR9TohQSaOL3v5oylkTJVjEtd9xnZJfmalNabiHM" http://localhost:3000/items
/////// curl -H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1OTY1NjM1MzJ9.LWU4L74MijaJZnPSsnE6u70oer_xCc0TSxjOCCNtvE8" http://localhost:3000/users/alex@gmail.com
///// curl -H "Authorization: eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE1OTYyMTg5MDJ9.LPb94Upmhop1yN51JatUvEJFnqJW_6XoUZgwul-ygRM" http://localhost:3000/users/4

//// User.create!(email: 'email' , password: 'password' , password_confirmation: 'password')

// this functions hould retreive the user's email using the authentication code
export function getUserInfo(email, auth_token) {
  return function action(dispatch) {
    const request = fetch(`http://10.0.2.2:3000/users/${email}`, {
      method: 'GET',
        headers: {
          "Authorization": auth_token
        }
    });

    return request.then(
      // response => response.json(), // eventually want this
      response => console.log("getuserinfo response", respone.json()),
      // response => console.log("response STATUS: ", response.status), // response.status == 200 is what we want
      err => console.log('get usershit error: ', err)
    )
    .then(
      json => console.log("userrequester: ", json),
      err => console.log("userrequester error", err) // review this nonsenjsew!!!!~!
    );
  }
}


////
//// WINNNNNNNNER!!!!!!!!!
export function getThatToken(email, password) {
  return function action(dispatch) {
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
    });

    return request.then(
      // response => console.log("REQUQEST!: ", response.json().auth_token),
      response => response.json(),
      // response => console.log("praying for an id", response.json()),
      err => console.log("error!!: ", err)
    ) //;
    .then(
      // json => console.log(json),

      json => dispatch(receiveAuthToken(json)),
      err => console.log("jsonerror ", json)
    );

  }
}
//// /// kukugugukacao
//// also winner
export function getThoseItems(auth_token) {
  return function action(dispatch) {
    const request = fetch("http://10.0.2.2:3000/items", {
      method: 'GET',
        headers: {
          "Authorization": auth_token
        }
    });

    // console.log("request status: ", request);

    return request.then(
      response => response.json(),
      // response => console.log("response STATUS: ", response.status), // response.status == 200 is what we want
      err => console.log('items response error: ', err)
    )
    .then(
      json => console.log("the items: ", json),
      err => console.log("items json error", err) // review this nonsenjsew!!!!~!
    );
  }
}

/// so i basically need a create a geThoseItems function that if it succedds
/// basically just means that the async token is storage is correct

export function checkLoggedIn(auth_token) {
  return function action(dispatch) {
    const request = fetch("http://10.0.2.2:3000/items", {
      method: 'GET',
        headers: {
          "Authorization": auth_token
        }
    });

    return request.then(
      // response => { return response.status == 200 ? true : false },
      response => { response.status == 200 ? dispatch(isLoggedIn(true)) : dispatch(isLoggedIn(false))},
      err => console.log("checkLoggedIn error", err)
    );
  }
}


//// working and in use
export function sendToken(auth_token_two) {
  return function action(dispatch) {
    const request = fetch("http://10.0.2.2:3000/items", {
      method: 'GET',
        headers: {
          "Authorization": auth_token_two
        }
    });

    return request.then(
      response => dispatch(loggedInUser({auth_token_two})),
      err => console.log("checkLoggedIn error", err)
    );
  }
}


///////////////////////////////////////////////////////////////////////////////////////

//////// below here not in use
export function fetchToken() {
  return function (dispatch) {
    fetch('http://10.0.2.2:3000/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "alex@gmail.com",
        password: 'password'
      })
    })
    .then(
      response => response.json()
    )
    .then(json =>
      console.log(json)
      // dispatch(receiveAuthToken(json))
    )
  } // fun dispatch
} //fetchToken

////

export const requestAuthToken = () => dispatch => {
  return fetch('http://10.0.2.2:3000/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "alex@gmail.com",
        password: 'password'
      })
    }).then((response) => {
      response.json()
    })
    .then((json) => {
      console.log("jsonauthtoken", json.auth_token);
      {dispatch(receiveAuthToken(json.auth_token))};
      // console.log(typeof json.auth_token); //string
      // return json.auth_token;
    })
    .catch((error) => {
      console.log(error);
    });
}


// export default getAuthToken();
async function getAuthToken() {
  // async function getAuthToken = () => dispatch => {

    return fetch('http://10.0.2.2:3000/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: "alex@gmail.com",
        password: 'password'
      })
    }).then((response) => {
      response.json()
    })
    .then((json) => {
      console.log("jsonauthtoken", json.auth_token);
      // console.log(typeof json.auth_token); //string
      return json.auth_token;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  /////// copy
  export async function getAuthTokenPls() {
    // async function getAuthToken = () => dispatch => {
      return function(dispatch) {
        fetch('http://10.0.2.2:3000/authenticate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: "alex@gmail.com",
            password: 'password'
          })
        }).then((response) => {
          response.json()
        })
        .then((json) => {
          console.log("jsonauthtoken", json.auth_token);
          // console.log(typeof json.auth_token); //string
          return json.auth_token;
        })
        .catch((error) => {
          console.log(error);
        });
      }

    }
