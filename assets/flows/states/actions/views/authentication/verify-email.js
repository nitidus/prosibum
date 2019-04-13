import { VIEWS } from '../../../types/index';
const { VERIFY_EMAIL } = VIEWS.AUTHENTICATION;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Authentication.VerifyEmail;

const mapStateToProps = (state) => {
  return {
    verifyEmail: state.VerifyEmail
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setValidationToken: (validationToken) => {
      dispatch({
        type: VERIFY_EMAIL.SET_VALIDATION_TOKEN,
        payload: validationToken
      })
    },
    setVerifyTheUserEmailAddressLoadingStatus: (loadingStatus) => {
      dispatch({
        type: VERIFY_EMAIL.SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    verifyTheUserEmailAddress: async (token) => CMD._verifyEmailAddress(token, dispatch)
  };
}

const VerifyEmail = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = VerifyEmail;
