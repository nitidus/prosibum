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
            _REFERENCE_PREFERED_USERGROUP_ID = (typeof usergroup != 'undefined')? usergroup._id: _AUTH.usergroup._id,
            _ROLES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/usergroups/type/${groupType}?token=${_REFERENCE_PREFERED_USERGROUP_ID}`);

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
            payload: (_DATA.length > 0)? _DATA[0]: {}
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

          const _PREFERED_ID = (typeof _AUTH.reference_id != 'undefined')? _AUTH.reference_id: _AUTH._id;

          module.exports._getRolesWithUsergroup(_DATA[0], _PREFERED_ID, dispatch);
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
  _getRolesWithUsergroup: async (usergroup, reference, dispatch) => {
    dispatch({
      type: ROLES.SET_ROLES_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _PREFERED_ID = (typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id,
            _PREFERED_REFERENCE_ID = reference || _AUTH.reference_id || _AUTH._id,
            _PREFERED_USERGROUP_ID = usergroup._id;

      var _TARGET_URL = `${GLOBAL.URLS.INTERFAS.HOST_NAME}/roles/${_PREFERED_ID}?user_group_id=${_PREFERED_USERGROUP_ID}`;

      if (_PREFERED_ID !== _PREFERED_REFERENCE_ID){
        _TARGET_URL += `reference_id=${_PREFERED_REFERENCE_ID}`;
      }

      const _ROLES = await axios.get(_TARGET_URL);

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
