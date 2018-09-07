import { VIEWS } from '../../../types/views';
const { SIGNUP } = VIEWS.AUTHENTICATION;

const mapStateToProps = (state) => {
  return {
    signup: state.Signup
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFirstName: (firstName) => {
      dispatch({
        type: SIGNUP.SET_FIRST_NAME,
        payload: firstName
      })
    },
    setLastName: (lastName) => {
      dispatch({
        type: SIGNUP.SET_LAST_NAME,
        payload: lastName
      })
    },
    setPhoneNumber: (phoneNumber) => {
      dispatch({
        type: SIGNUP.SET_PHONE_NUMBER,
        payload: phoneNumber
      })
    },
    setEmail: (email) => {
      dispatch({
        type: SIGNUP.SET_EMAIL,
        payload: email
      })
    },
    setPassword: (password) => {
      dispatch({
        type: SIGNUP.SET_PASSWORD,
        payload: password
      })
    },
    subscribeTheUser: () => {
      dispatch({
        type: SIGNUP.SUBSCRIBE_THE_USERN
      })
    }
  };
}

const Signup = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Signup;
