import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { SELF } = VIEWS.DASHBOARD;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getCurrentUserOverallDetail: async (dispatch) => {
    dispatch({
      type: SELF.SET_OVERALL_DETAIL_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_ID = ((typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id),
            _OVERALL_DETAIL = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/overall/${_REFERENCE_ID}`);

      if (_OVERALL_DETAIL.status === 200){
        const _FINAL_RESPONSE = _OVERALL_DETAIL.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: SELF.FETCH_CURRENT_USER_OVERALL_DETAIL,
            payload: _DATA
          })

          dispatch({
            type: SELF.SET_OVERALL_DETAIL_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SELF.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: SELF.SET_OVERALL_DETAIL_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SELF.SET_CONNECTED_STATUS,
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
          type: SELF.SET_OVERALL_DETAIL_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: SELF.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
