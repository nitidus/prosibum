import { VIEWS } from '../../../types/index';
const { VERIFY_PHONE_NUMBER } = VIEWS.AUTHENTICATION;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Authentication.VerifyPhoneNumber;

const mapStateToProps = (state) => {
  return {
    verifyPhoneNumber: state.VerifyPhoneNumber
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setSecretKey: (secretKey) => {
      dispatch({
        type: VERIFY_PHONE_NUMBER.SET_SECRET_KEY,
        payload: secretKey
      })
    },
    setValidationToken: (validationToken) => {
      dispatch({
        type: VERIFY_PHONE_NUMBER.SET_VALIDATION_TOKEN,
        payload: validationToken
      })
    },
    setFinalSubscribeLoadingStatus: (loadingStatus) => {
      dispatch({
        type: VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    verifyTheUserPhoneNumber: (userDetail) => CMD._verifyPhoneNumber(userDetail, dispatch)
  };
}

const VerifyPhoneNumber = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = VerifyPhoneNumber;
