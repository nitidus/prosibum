import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { VIEWS, GLOBAL } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getUserGroupsWithType: (groupType, dispatch) => {
    dispatch({
      type: SIGNUP.SET_USER_GROUP_LOADING_STATUS,
      payload: true
    })

    axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${groupType}`)
      .then((response) => {
        if (response.status === 200){
          const _FINAL_RESPONSE = response.data;

          if (_FINAL_RESPONSE.meta.code === 200){
            const _DATA = _FINAL_RESPONSE.data;

            dispatch({
              type: SIGNUP.FETCH_AVAILABLE_USER_GROUPS,
              payload: _DATA
            })

            dispatch({
              type: SIGNUP.SET_USER_GROUP,
              payload: _DATA[0]
            })

            dispatch({
              type: SIGNUP.SET_USER_GROUP_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: SIGNUP.SET_CONNECTED_STATUS,
              payload: {
                status: true
              }
            })
          }else{
            dispatch({
              type: SIGNUP.SET_USER_GROUP_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: SIGNUP.SET_CONNECTED_STATUS,
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
            type: SIGNUP.SET_USER_GROUP_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SIGNUP.SET_CONNECTED_STATUS,
            payload: {
              status: false,
              content: _ERROR_MESSAGE
            }
          })
        }
      });
  },
  _subscribeUserWithDetail: async (userDetail, dispatch) => {
    dispatch({
      type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
      payload: true
    })

    axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/users`, userDetail)
      .then((response) => {
        if (response.status === 200){
          const _FINAL_RESPONSE = response.data;

          if (_FINAL_RESPONSE.meta.code === 200){
            const _DATA = _FINAL_RESPONSE.data,
                  _SERIALIZED_DATA = JSON.stringify(_DATA);

            Functions._storeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER, _SERIALIZED_DATA);

            dispatch({
              type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: SIGNUP.SET_CONNECTED_STATUS,
              payload: {
                status: true
              }
            })

          }else{
            dispatch({
              type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: SIGNUP.SET_CONNECTED_STATUS,
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
            type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SIGNUP.SET_CONNECTED_STATUS,
            payload: {
              status: false,
              content: _ERROR_MESSAGE
            }
          })
        }
      });
  },
  _regenerateValidationToken: (validation, dispatch) => {
    SIGNUP.REGENERATE_THE_USER_PHONE_NUMBER_VALIDATION_TOKEN
    dispatch({
      type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
      payload: true
    })

    axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/regenerate/phone-number`, validation)
      .then((response) => {
        if (response.status === 200){
          const _FINAL_RESPONSE = response.data;

          if (_FINAL_RESPONSE.meta.code === 200){
            const _DATA = _FINAL_RESPONSE.data,
                  _SERIALIZED_DATA = JSON.stringify(_DATA);

            Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER)
            .then((response) => {
              var _UNSERIALIZED_DATA = JSON.parse(response);

              _UNSERIALIZED_DATA.phone.mobile.validation.token = _DATA.token;
              _UNSERIALIZED_DATA.phone.mobile.validation.modified_at = _DATA.modified_at;

              if (_DATA.phone_number){
                _UNSERIALIZED_DATA.phone.mobile.content = _DATA.phone_number;
              }

              Functions._storeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER, _UNSERIALIZED_DATA);

              dispatch({
                type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
                payload: false
              })

              dispatch({
                type: SIGNUP.SET_CONNECTED_STATUS,
                payload: {
                  status: true
                }
              })
            })
            .catch((didErrorOccureOnRetrieve) => {
              if (didErrorOccureOnRetrieve){
                const _ERROR_MESSAGE = didErrorOccureOnRetrieve.message || didErrorOccureOnRetrieve.request._response;

                dispatch({
                  type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
                  payload: false
                })

                dispatch({
                  type: SIGNUP.SET_CONNECTED_STATUS,
                  payload: {
                    status: false,
                    content: _ERROR_MESSAGE
                  }
                })
              }
            })
          }else{
            dispatch({
              type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: SIGNUP.SET_CONNECTED_STATUS,
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
            type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SIGNUP.SET_CONNECTED_STATUS,
            payload: {
              status: false,
              content: _ERROR_MESSAGE
            }
          })
        }
      });
  }
};
