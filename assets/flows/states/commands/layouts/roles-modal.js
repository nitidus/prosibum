import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { ROLES_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _appendRolesToResourceWithRules: async (rolesRules, callback, dispatch) => {
    dispatch({
      type: ROLES_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_ID = (typeof _AUTH.reference_id != 'undefined')? _AUTH.reference_id: _AUTH._id,
            _ROLES = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/endusers`, {
              ...rolesRules,
              reference_id: _REFERENCE_ID
            });

      if (_ROLES.status === 200){
        const _FINAL_RESPONSE = _ROLES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: ROLES_MODAL.APPEND_ROLES_TO_RESOURCE,
            payload: _DATA
          })

          dispatch({
            type: ROLES_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLES_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback(_DATA, false);
        }else{
          dispatch({
            type: ROLES_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: ROLES_MODAL.SET_CONNECTED_STATUS,
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
          type: ROLES_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: ROLES_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
