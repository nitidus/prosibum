import { VIEWS } from '../../../types/index';
const { LOGIN } = VIEWS.AUTHENTICATION;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Authentication.Login;

const mapStateToProps = (state) => {
  return {
    login: state.Login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (email) => {
      dispatch({
        type: LOGIN.SET_EMAIL,
        payload: email
      })
    },
    setPassword: (password) => {
      dispatch({
        type: LOGIN.SET_PASSWORD,
        payload: password
      })
    },
    setLoadingStatus: (loadingStatus) => {
      dispatch({
        type: LOGIN.SET_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    verifyAuthentication: async (token) => CMD._authecticateUser(token, dispatch)
  };
}

const Login = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Login;
