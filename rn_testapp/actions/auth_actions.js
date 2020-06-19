export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOAD_SPINNER = 'LOAD_SPINNER';
export const FAILED_LOGIN = 'FAILED_LOGIN';
export const RECEIVE_AUTH_TOKEN = "RECEIVE_AUTH_TOKEN";
import fetch from 'cross-fetch';


export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveAuthToken = auth_token => ({
  type: RECEIVE_AUTH_TOKEN,
  auth_token
});



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
      err => console.log("error!!: ", err)
    ) //;
    .then(
      // json => console.log(json),
      json => dispatch(receiveAuthToken(json)),
      err => console.log("jsonerror ", json)
    );

  }
}
////
//// also winner
export function getThoseItems(auth_token) {
  return function action(dispatch) {
    const request = fetch("http://10.0.2.2:3000/items", {
      method: 'GET',
        headers: {
          "Authorization": auth_token
        }
    });

    return request.then(
      response => response.json(),
      err => console.log('items response error: ', err)
    )
    .then(
      json => console.log(json),
      err => console.log("items json error", err)
    );
  }
}








/////
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
