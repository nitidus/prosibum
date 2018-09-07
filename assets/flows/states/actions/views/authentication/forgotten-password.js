import { VIEWS } from '../../../types/views';
const { FORGOTTEN_PASSWORD } = VIEWS.AUTHENTICATION;

const mapStateToProps = (state) => {
  return {
    forgottenPassword: state.ForgottenPassword
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRequestType: (requestType) => {
      dispatch({
        type: FORGOTTEN_PASSWORD.SET_REQUEST_TYPE,
        payload: requestType
      })
    },
    setEmail: (email) => {
      dispatch({
        type: FORGOTTEN_PASSWORD.SET_EMAIL,
        payload: email
      })
    },
    setPhoneNumber: (phoneNumber) => {
      dispatch({
        type: FORGOTTEN_PASSWORD.SET_PHONE_NUMBER,
        payload: phoneNumber
      })
    },
    sendRecoveryLink: () => {
      dispatch({
        type: FORGOTTEN_PASSWORD.SEND_RECOVERY_LINK
      })
    }
  };
}

const ForgottenPassword = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ForgottenPassword;
