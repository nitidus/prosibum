import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { ROLES } = VIEWS.PROFILE;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getRolesTypeWithGroupType: async (groupType, usergroup, dispatch) => {
    dispatch({
      type: ROLES.SET_ROLES_TYPE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_PRIORITY = (typeof usergroup != 'undefined')? usergroup.priority: _AUTH.usergroup.priority,
            _ROLES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${groupType}?priority=${_REFERENCE_PRIORITY}`);

      if (_ROLES.status === 200){
        const _FINAL_RESPONSE = _ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: ROLES.FETCH_AVAILABLE_ROLES_TYPE,
            payload: _DATA
          })

          dispatch({
            type: ROLES.SET_PILOT_CURRENT_TAB,
            payload: _DATA[0]
          })

          dispatch({
            type: ROLES.SET_ROLES_TYPE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLES.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          module.exports._getRolesWithUsergroup(_DATA[0], dispatch);
        }else{
          dispatch({
            type: ROLES.SET_ROLES_TYPE_LOADING_STATUS,
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
          type: ROLES.SET_ROLES_TYPE_LOADING_STATUS,
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
  },
  _getRolesWithUsergroup: async (usergroup, dispatch) => {
    dispatch({
      type: ROLES.SET_ROLES_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_ID = (typeof _AUTH.reference_id != 'undefined')? _AUTH.reference_id: _AUTH._id,
            _ROLES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/roles/${_REFERENCE_ID}?reference_id=${usergroup.reference_id}`);

      if (_ROLES.status === 200){
        const _FINAL_RESPONSE = _ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: ROLES.FETCH_AVAILABLE_ROLES,
            payload: _DATA
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
