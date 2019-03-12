import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { NEW_PRODUCT } = VIEWS.PRODUCTS;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getAvailableWarehousesWithToken: async (token, dispatch) => {
    dispatch({
      type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_ID = ((typeof token != 'undefined') && (Object.keys(token).length > 0))? ((typeof token.cardinal_id != 'undefined')? token.cardinal_id: token._id): ((typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id),
            _WAREHOUSES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/warehouses/${_REFERENCE_ID}`);

      if (_WAREHOUSES.status === 200){
        const _FINAL_RESPONSE = _WAREHOUSES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: NEW_PRODUCT.FETCH_AVAILABLE_WAREHOUSES,
            payload: _DATA
          })

          dispatch({
            type: NEW_PRODUCT.SET_CURRENT_WAREHOUSE,
            payload: (_DATA.length > 0)? _DATA[0]: {}
          })

          dispatch({
            type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_PRODUCT.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_PRODUCT.SET_CONNECTED_STATUS,
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
          type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_PRODUCT.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _getAvailableShippingTypes: async (dispatch) => {},
  _getAvailablePaymentTypes: async (dispatch) => {}
};
