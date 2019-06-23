import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { RESET_PASSWORD } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _updatePasswordUsingOldPassword: async (token, emailToken, dispatch) => {
    dispatch({
      type: RESET_PASSWORD.CHANGE_THE_PASSWORD_LOADING_STATUS,
      payload: true
    })

    try {
      const _RESPONSE = await axios.put(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/password/reset/${emailToken}`, token);

      if (_RESPONSE.status === 200){
        const _FINAL_RESPONSE = _RESPONSE.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: RESET_PASSWORD.CHANGE_THE_PASSWORD_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: RESET_PASSWORD.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: RESET_PASSWORD.CHANGE_THE_PASSWORD_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: RESET_PASSWORD.SET_CONNECTED_STATUS,
            payload: {
              status: false,
              content: _FINAL_RESPONSE.meta.error_message
            }
          })
        }
      }
    } catch (error) {
      if (error){
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: RESET_PASSWORD.CHANGE_THE_PASSWORD_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: RESET_PASSWORD.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
