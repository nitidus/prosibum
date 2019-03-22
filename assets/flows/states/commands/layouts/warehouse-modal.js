import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { WAREHOUSE_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _appendWarehouseToResourceWithRules: async (warehouseRules, callback, dispatch) => {
    dispatch({
      type: WAREHOUSE_MODAL.SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _END_USER_ID = (typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id,
            _WAREHOUSE = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/warehouses`, {
              end_user_id: _END_USER_ID,
              ...warehouseRules
            });

      if (_WAREHOUSE.status === 200){
        const _FINAL_RESPONSE = _WAREHOUSE.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WAREHOUSE_MODAL.APPEND_WAREHOUSE_TO_RESOURCE,
            payload: _DATA
          })

          dispatch({
            type: WAREHOUSE_MODAL.SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WAREHOUSE_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback(_DATA, false);
        }else{
          dispatch({
            type: WAREHOUSE_MODAL.SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WAREHOUSE_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: false,
              content: _FINAL_RESPONSE.meta.error_message
            }
          })
        }
      }
    } catch (error) {
      if (error){
        const WALLET_MODAL = error.message || error.request._response;

        dispatch({
          type: WAREHOUSE_MODAL.SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: WAREHOUSE_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
