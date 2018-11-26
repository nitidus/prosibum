import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { BRAND_ROLES_SUBSETS } = VIEWS.PROFILE;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getBrandRolesWithType: async (groupType, dispatch) => {
    dispatch({
      type: BRAND_ROLES_SUBSETS.SET_BRAND_ROLE_LOADING_STATUS,
      payload: true
    })

    try {
      const _BRAND_ROLES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${groupType}`);

      if (_BRAND_ROLES.status === 200){
        const _FINAL_RESPONSE = _BRAND_ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: BRAND_ROLES_SUBSETS.FETCH_AVAILABLE_BRAND_ROLES,
            payload: _DATA
          })

          dispatch({
            type: BRAND_ROLES_SUBSETS.SET_PILOT_CURRENT_TAB,
            payload: _DATA[0]
          })

          dispatch({
            type: BRAND_ROLES_SUBSETS.SET_BRAND_ROLE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: BRAND_ROLES_SUBSETS.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: BRAND_ROLES_SUBSETS.SET_BRAND_ROLE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: BRAND_ROLES_SUBSETS.SET_CONNECTED_STATUS,
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
          type: BRAND_ROLES_SUBSETS.SET_BRAND_ROLE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: BRAND_ROLES_SUBSETS.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
