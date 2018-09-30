import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { VERIFY_PHONE_NUMBER } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _verifyPhoneNumber: async (userDetail, dispatch) => {
    dispatch({
      type: VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS,
      payload: true
    })

    try {
      const _RESPONSE = await axios.put(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/verify/phone-number`, userDetail);

      if (_RESPONSE.status === 200){
        const _FINAL_RESPONSE = _RESPONSE.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data,
                _SERIALIZED_DATA = JSON.stringify(_DATA),
                _DID_SUBSCRIBED_USER_REMOVE = await Functions._removeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER);

          if (_DID_SUBSCRIBED_USER_REMOVE === true){
            dispatch({
              type: VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: VERIFY_PHONE_NUMBER.SET_CONNECTED_STATUS,
              payload: {
                status: true
              }
            })
          }
        }else{
          dispatch({
            type: VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: VERIFY_PHONE_NUMBER.SET_CONNECTED_STATUS,
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
          type: VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: VERIFY_PHONE_NUMBER.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
