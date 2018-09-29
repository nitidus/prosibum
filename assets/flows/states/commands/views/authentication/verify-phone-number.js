import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { VERIFY_PHONE_NUMBER } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _verifyPhoneNumber: (userDetail, dispatch) => {
    dispatch({
      type: VERIFY_PHONE_NUMBER.SET_FINAL_SUBSCRIBE_LOADING_STATUS,
      payload: true
    })

    axios.put(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/verify/phone-number`, userDetail)
      .then((response) => {
        if (response.status === 200){
          const _FINAL_RESPONSE = response.data;

          if (_FINAL_RESPONSE.meta.code === 200){
            const _DATA = _FINAL_RESPONSE.data,
                  _SERIALIZED_DATA = JSON.stringify(_DATA);

            Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER)
            .then((response) => {
              var _UNSERIALIZED_DATA = JSON.parse(response);

              _UNSERIALIZED_DATA.phone.mobile.validation.value = true;

              Functions._storeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER, _UNSERIALIZED_DATA)
              .then((didStore) => {
                if (didStore){
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
              })
              .catch((didErrorOccureOnStore) => {
                if (didErrorOccureOnStore){
                  const _ERROR_MESSAGE = didErrorOccureOnStore.message || didErrorOccureOnStore.request._response;

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
              })
            })
            .catch((didErrorOccureOnRetrieve) => {
              if (didErrorOccureOnRetrieve){
                const _ERROR_MESSAGE = didErrorOccureOnRetrieve.message || didErrorOccureOnRetrieve.request._response;

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
            })
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
      })
      .catch((error) => {
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
      });
  }
};
