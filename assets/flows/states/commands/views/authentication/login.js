import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { LOGIN } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _authecticateUser: async (token, dispatch) => {
    dispatch({
      type: LOGIN.SET_LOADING_STATUS,
      payload: true
    })

    try {
      const _AUTH_TOKEN = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/auth`, token);

      if (_AUTH_TOKEN.status === 200){
        const _FINAL_RESPONSE = _AUTH_TOKEN.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data,
                _SERIALIZED_DATA = JSON.stringify(_DATA);

          await Functions._storeDataWithKey(GLOBAL.STORAGE.AUTH, _SERIALIZED_DATA);

          dispatch({
            type: LOGIN.SET_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: LOGIN.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: LOGIN.SET_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: LOGIN.SET_CONNECTED_STATUS,
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
          type: LOGIN.SET_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: LOGIN.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
