import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { FORGOTTEN_PASSWORD } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _sendRequestForRecoverPasswordUsingLink: async (token, callback, dispatch) => {
    dispatch({
      type: FORGOTTEN_PASSWORD.SET_LOADING_STATUS,
      payload: true
    })

    try {
      const _AUTH_TOKEN = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/recover`, token);

      if (_AUTH_TOKEN.status === 200){
        const _FINAL_RESPONSE = _AUTH_TOKEN.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: FORGOTTEN_PASSWORD.SET_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: FORGOTTEN_PASSWORD.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback();
        }else{
          dispatch({
            type: FORGOTTEN_PASSWORD.SET_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: FORGOTTEN_PASSWORD.SET_CONNECTED_STATUS,
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
          type: FORGOTTEN_PASSWORD.SET_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: FORGOTTEN_PASSWORD.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
