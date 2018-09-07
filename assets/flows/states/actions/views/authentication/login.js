import { VIEWS } from '../../../types/views';
const { LOGIN } = VIEWS.AUTHENTICATION;

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
    verifyAuthentication: () => {
      dispatch({
        type: LOGIN.VERIFY_AUTHENTICATION
      })
    }
  };
}

const Login = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Login;
