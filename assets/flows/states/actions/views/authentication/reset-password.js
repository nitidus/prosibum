import { VIEWS } from '../../../types/index';
const { RESET_PASSWORD } = VIEWS.AUTHENTICATION;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Authentication.ResetPassword;

const mapStateToProps = (state) => {
  return {
    resetPassword: state.ResetPassword,
    login: state.Login
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOldPassword: (oldPassword) => {
      dispatch({
        type: RESET_PASSWORD.SET_OLD_PASSWORD,
        payload: oldPassword
      })
    },
    setNewPassword: (newPassword) => {
      dispatch({
        type: RESET_PASSWORD.SET_NEW_PASSWORD,
        payload: newPassword
      })
    },
    setNewPasswordConfirmation: (newPasswordConfirmation) => {
      dispatch({
        type: RESET_PASSWORD.SET_NEW_PASSWORD_CONFIRMATION,
        payload: newPasswordConfirmation
      })
    },
    changeThePassword: async (token, emailToken) => CMD._updatePasswordUsingOldPassword(token, emailToken, dispatch),
    setChangeThePasswordLoadingStatus: (loadingStatus) => {
      dispatch({
        type: RESET_PASSWORD.CHANGE_THE_PASSWORD_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const ResetPassword = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ResetPassword;
