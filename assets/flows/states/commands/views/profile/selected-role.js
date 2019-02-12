import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { SELECTED_ROLE } = VIEWS.PROFILE;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getRolesWithUsergroup: async (usergroup, reference, dispatch) => {
    dispatch({
      type: SELECTED_ROLE.SET_ROLES_LOADING_STATUS,
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
            type: SELECTED_ROLE.FETCH_AVAILABLE_ROLES,
            payload: _DATA
          })

          dispatch({
            type: SELECTED_ROLE.SET_ROLES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SELECTED_ROLE.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: SELECTED_ROLE.SET_ROLES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SELECTED_ROLE.SET_CONNECTED_STATUS,
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
          type: SELECTED_ROLE.SET_ROLES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: SELECTED_ROLE.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
