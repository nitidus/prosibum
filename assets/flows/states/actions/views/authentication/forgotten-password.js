import { VIEWS } from '../../../types/index';
const { FORGOTTEN_PASSWORD } = VIEWS.AUTHENTICATION;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Authentication.ForgottenPassword;

const mapStateToProps = (state) => {
  return {
    forgottenPassword: state.ForgottenPassword,
    login: state.Login
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
    },
    requestForRecoverPassword: async (token, callback) => CMD._sendRequestForRecoverPasswordUsingLink(token, callback, dispatch),
    setCountriesCodesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: FORGOTTEN_PASSWORD.SET_COUNTRIES_CODES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    }
  };
}

const ForgottenPassword = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ForgottenPassword;
