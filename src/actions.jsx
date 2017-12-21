import Auth0Lock from 'auth0-lock';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogin(authResult) {
  console.log('mk9');
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    authResult,
  };
}

function receiveLogin(authResult) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: authResult.idToken,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function loginAuth0User() {
  console.log('mk7');

  return () => {
    const options = {
      auth: {
        redirect: true,
      },
    };
    const lock = new Auth0Lock('2If4KB0wScdHkxgVuxVI-LU82AS42FEE', '***REMOVED***rx.auth0.com', options);
    lock.on('authenticated', (authResult) => {
      console.log('mk8.7a');
      console.log('mk4a');
      console.log(authResult);
      // dispatch(requestLogin(authResult));
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', authResult.idTokenPayload.exp);
      // dispatch(loginAuth0User(authResult));
      // lock.getUserInfo(authResult.accessToken, (error, profile) => {
      // if (error) {
      //   return false;
      // }
      // });
      lock.hide();
      return true;
    });
    lock.show();
  };
}

export function loginUser(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return fetch('http://localhost:8080/sessions/create', config)
      .then(response =>
        response.json()
          .then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        }
        // If login was successful, set the token in local storage
        localStorage.setItem('id_token', user.id_token);
        localStorage.setItem('id_token', user.access_token);
        // Dispatch the success action
        dispatch(receiveLogin(user));
        return Promise.resolve(user);
      })
      .catch(err => console.warn('Error: ', err));
  };
}
