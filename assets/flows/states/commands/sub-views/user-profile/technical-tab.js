import axios from 'axios';

import { SUB_VIEWS, GLOBAL } from '../../../types/index';
const { TECHNICAL_TAB } = SUB_VIEWS.USER_PROFILE;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _updateUserTechnicalData: async (userDetail, dispatch) => {
    dispatch({
      type: TECHNICAL_TAB.SET_LOADING_STATUS,
      payload: true
    })

    try {
      const _TOKEN = userDetail._id;

      delete userDetail._id;

      const _TECHNICAL_PROFILE_UPDATE = await axios.put(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/endusers/${_TOKEN}`, userDetail);

      if (_TECHNICAL_PROFILE_UPDATE.status === 200){
        const _FINAL_RESPONSE = _TECHNICAL_PROFILE_UPDATE.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data,
                _SERIALIZED_DATA = JSON.stringify(_DATA);

          await Functions._storeDataWithKey(GLOBAL.STORAGE.AUTH, _SERIALIZED_DATA);

          dispatch({
            type: TECHNICAL_TAB.SET_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: TECHNICAL_TAB.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: TECHNICAL_TAB.SET_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: TECHNICAL_TAB.SET_CONNECTED_STATUS,
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
          type: TECHNICAL_TAB.SET_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: TECHNICAL_TAB.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _getBrandRolesWithType: async (groupType, dispatch) => {
    dispatch({
      type: TECHNICAL_TAB.SET_BRAND_ROLE_LOADING_STATUS,
      payload: true
    })

    try {
      const _BRAND_ROLES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${groupType}`);

      if (_BRAND_ROLES.status === 200){
        const _FINAL_RESPONSE = _BRAND_ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: TECHNICAL_TAB.FETCH_AVAILABLE_BRAND_ROLES,
            payload: _DATA
          })

          dispatch({
            type: TECHNICAL_TAB.SET_BRAND_ROLE,
            payload: _DATA[0]
          })

          dispatch({
            type: TECHNICAL_TAB.SET_BRAND_ROLE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: TECHNICAL_TAB.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: TECHNICAL_TAB.SET_BRAND_ROLE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: TECHNICAL_TAB.SET_CONNECTED_STATUS,
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
          type: TECHNICAL_TAB.SET_BRAND_ROLE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: TECHNICAL_TAB.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
