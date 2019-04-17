import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { VIEWS, GLOBAL } from '../../../types/index';
const { SIGNUP } = VIEWS.AUTHENTICATION;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _verifyUserWithDetail: async (userDetail, callback, dispatch) => {
    dispatch({
      type: SIGNUP.SET_VERIFICATION_LOADING_STATUS,
      payload: true
    })

    try {
      const _ADMINISTRATOR_TOKEN = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${GLOBAL.TARGET}/HIGHEST_PRIORITY`);

      if (_ADMINISTRATOR_TOKEN.status === 200){
        const _FINAL_ADMINISTRATOR_TOKEN_RESPONSE = _ADMINISTRATOR_TOKEN.data;

        if (_FINAL_ADMINISTRATOR_TOKEN_RESPONSE.meta.code === 200){
          const _ADMINISTRATOR_TOKEN_DATA = _FINAL_ADMINISTRATOR_TOKEN_RESPONSE.data,
                _VERIFIED_USER = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/verify`, {
                  user_group_id: _ADMINISTRATOR_TOKEN_DATA._id,
                  ...userDetail
                });

          if (_VERIFIED_USER.status === 200){
            const _FINAL_RESPONSE = _VERIFIED_USER.data;

            if (_FINAL_RESPONSE.meta.code === 200){
              const _DATA = _FINAL_RESPONSE.data,
                    _SERIALIZED_DATA = JSON.stringify(_DATA),
                    _DID_VERIFIED_USER_STORE = await Functions._storeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_TOKEN, _SERIALIZED_DATA);

              if (_DID_VERIFIED_USER_STORE === true){
                dispatch({
                  type: SIGNUP.SET_VERIFICATION_LOADING_STATUS,
                  payload: false
                })

                dispatch({
                  type: SIGNUP.SET_CONNECTED_STATUS,
                  payload: {
                    status: true
                  }
                })

                callback();
              }
            }else{
              dispatch({
                type: SIGNUP.SET_VERIFICATION_LOADING_STATUS,
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
        }
      }
    } catch (error) {
      if (error){
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: SIGNUP.SET_VERIFICATION_LOADING_STATUS,
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
    }
  },
  _subscribeUserWithDetail: async (callback, dispatch) => {
    dispatch({
      type: SIGNUP.SET_SUBSCRIBE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SUBSCRIBED_USER = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_TOKEN);

      if (_SUBSCRIBED_USER !== false){
          var _TOKEN = JSON.parse(_SUBSCRIBED_USER),
              _TODAY = new Date(),
              _MOBILE_PHONE_VERIFICATION_DATE = new Date(_TOKEN.phone.mobile.validation.modified_at),
              _MOBILE_PHONE_VERIFICATION_EXPIRATION_DATE_TIME = _MOBILE_PHONE_VERIFICATION_DATE.getTime() + (1000 * 60 * 2);

          if (_TODAY.getTime() > _MOBILE_PHONE_VERIFICATION_EXPIRATION_DATE_TIME){
            const _REGENERATED_SUBSCRIBER = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/regenerate`, _TOKEN);

            if (_REGENERATED_SUBSCRIBER.status === 200){
              const _FINAL_RESPONSE = _REGENERATED_SUBSCRIBER.data;

              if (_FINAL_RESPONSE.meta.code === 200){
                const _DATA = _FINAL_RESPONSE.data,
                      _SERIALIZED_DATA = JSON.stringify(_DATA),
                      _DID_SUBSCRIBED_USER_STORE = await Functions._storeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_TOKEN, _SERIALIZED_DATA);

                callback({
                  status: 701,
                  error_message: `The subscribed user verification code has been expired.`
                });
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
          }else{
            _TOKEN.phone.mobile.validation.value = true;

            const _FINAL_SUBSCRIBER = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/users`, _TOKEN);

            if (_FINAL_SUBSCRIBER.status === 200){
              const _FINAL_RESPONSE = _FINAL_SUBSCRIBER.data;

              if (_FINAL_RESPONSE.meta.code === 200){
                const _DATA = _FINAL_RESPONSE.data,
                      _SERIALIZED_DATA = JSON.stringify(_DATA),
                      _DID_AUTH_STORE = await Functions._storeDataWithKey(GLOBAL.STORAGE.AUTH, _SERIALIZED_DATA);

                if (_DID_AUTH_STORE === true){
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

                  await Functions._removeDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_TOKEN);

                  callback(_FINAL_SUBSCRIBER);
                }
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
          }
      }else{
        callback({
          status: 702,
          error_message: `The subscribed user doesn't exist.`
        });
      }
    } catch (error) {
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
    }
  },
  _getAvailableRoleWithBrandAndToken: async (brandName, token, dispatch) => {
    dispatch({
      type: SIGNUP.SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS,
      payload: true
    })

    try {
      const _BRAND_NAME = Functions._convertTokenToKeyword(brandName),
            _TARGET_ROLE = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/role/brand/${_BRAND_NAME}/${token}`);

      if (_TARGET_ROLE.status === 200){
        const _FINAL_TARGET_ROLE_RESPONSE = _TARGET_ROLE.data;

        if (_FINAL_TARGET_ROLE_RESPONSE.meta.code === 200){
          const _TARGET_ROLE_DATA = _FINAL_TARGET_ROLE_RESPONSE.data;

          dispatch({
            type: SIGNUP.FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN,
            payload: _TARGET_ROLE_DATA
          })

          dispatch({
            type: SIGNUP.SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS,
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
            type: SIGNUP.SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS,
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
    } catch (error) {
      if (error){
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: SIGNUP.SET_FETCH_AVAILABLE_ROLE_WITH_BRAND_AND_TOKEN_LOADING_STATUS,
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
    }
  }
};
