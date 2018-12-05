import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { ROLES } = VIEWS.PROFILE;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getRolesWithType: async (groupType, dispatch) => {
    dispatch({
      type: ROLES.SET_ROLES_LOADING_STATUS,
      payload: true
    })

    try {
      const _ROLES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${groupType}`);

      if (_ROLES.status === 200){
        const _FINAL_RESPONSE = _ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: ROLES.FETCH_AVAILABLE_ROLES,
            payload: _DATA
          })

          dispatch({
            type: ROLES.SET_PILOT_CURRENT_TAB,
            payload: _DATA[0]
          })

          dispatch({
            type: ROLES.SET_ROLES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLES.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: ROLES.SET_ROLES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLES.SET_CONNECTED_STATUS,
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
          type: ROLES.SET_ROLES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: ROLES.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
