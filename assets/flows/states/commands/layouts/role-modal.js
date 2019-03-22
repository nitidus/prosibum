import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { ROLE_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _getRolesTypeWithGroupType: async (groupType, usergroup, dispatch) => {
    dispatch({
      type: ROLE_MODAL.SET_ROLES_TYPE_LOADING_STATUS,
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
            type: ROLE_MODAL.FETCH_AVAILABLE_ROLES_TYPE,
            payload: _DATA
          })

          dispatch({
            type: ROLE_MODAL.SET_CURRENT_ROLE,
            payload: ((_DATA.length > 0)? _DATA[0]: {})
          })

          dispatch({
            type: ROLE_MODAL.SET_ROLES_TYPE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLE_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: ROLE_MODAL.SET_ROLES_TYPE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLE_MODAL.SET_CONNECTED_STATUS,
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
          type: ROLE_MODAL.SET_ROLES_TYPE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: ROLE_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _appendRolesToResourceWithRules: async (rolesRules, callback, dispatch) => {
    dispatch({
      type: ROLE_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH);

      var _ROLES_RULES = rolesRules;

      if (typeof _ROLES_RULES.reference_id == 'undefined'){
        _ROLES_RULES.reference_id =  _AUTH._id;
      }

      if (typeof _ROLES_RULES.cardinal_ancestors == 'undefined'){
        _ROLES_RULES.cardinal_ancestors = [_AUTH._id];
      }

      _ROLES_RULES.cardinal_id = (typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id;

      const _ROLES = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/endusers`, _ROLES_RULES);

      if (_ROLES.status === 200){
        const _FINAL_RESPONSE = _ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: ROLE_MODAL.APPEND_ROLES_TO_RESOURCE,
            payload: _DATA
          })

          dispatch({
            type: ROLE_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLE_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback(_DATA, false);
        }else{
          dispatch({
            type: ROLE_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLE_MODAL.SET_CONNECTED_STATUS,
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
          type: ROLE_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: ROLE_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _fetchAvailableCardinalUsingID: async (token, dispatch) => {
    dispatch({
      type: ROLE_MODAL.SET_CARDINALITY_LOADING_STATUS,
      payload: true
    })

    try {
      const _CARDINAL = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/endusers/${token}`);

      if (_ROLES.status === 200){
        const _FINAL_RESPONSE = _CARDINAL.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: ROLE_MODAL.FETCH_CARDINALITY,
            payload: _DATA
          })

          dispatch({
            type: ROLE_MODAL.SET_CARDINALITY_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLE_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback(_DATA, false);
        }else{
          dispatch({
            type: ROLE_MODAL.SET_CARDINALITY_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLE_MODAL.SET_CONNECTED_STATUS,
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
          type: ROLE_MODAL.SET_CARDINALITY_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: ROLE_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
