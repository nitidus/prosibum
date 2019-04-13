import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { VERIFY_EMAIL } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _verifyEmailAddress: async (token, dispatch) => {
    dispatch({
      type: VERIFY_EMAIL.SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS,
      payload: true
    })

    try {
      const _RESPONSE = await axios.put(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/verify/email`, token);

      if (_RESPONSE.status === 200){
        const _FINAL_RESPONSE = _RESPONSE.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: VERIFY_EMAIL.SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: VERIFY_EMAIL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: VERIFY_EMAIL.SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: VERIFY_EMAIL.SET_CONNECTED_STATUS,
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
          type: VERIFY_EMAIL.SET_VERIFY_THE_USER_EMAIL_ADDRESS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: VERIFY_EMAIL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
