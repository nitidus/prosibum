import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { NEW_PRODUCT_IDENTITY } = VIEWS.PRODUCTS;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getAvailableWarehousesWithToken: async (token, dispatch) => {
    // dispatch({
    //   type: NEW_PRODUCT_IDENTITY.SET_WAREHOUSES_LOADING_STATUS,
    //   payload: true
    // })
    //
    // try {
    //   const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
    //         _AUTH = JSON.parse(_SERIALIZED_AUTH),
    //         _REFERENCE_ID = ((typeof usergroup != 'undefined') && (Object.keys(usergroup).length > 0))? ((typeof usergroup.cardinal_id != 'undefined')? usergroup.cardinal_id: usergroup._id): ((typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id),
    //         _CURRENCY_ID = ((typeof currency != 'undefined') && (Object.keys(currency).length > 0) && (typeof currency._id != 'undefined'))? currency._id: currency,
    //         _WALLETS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/wallets/${_REFERENCE_ID}?currency_id=${_CURRENCY_ID}`);
    //
    //   if (_NEW_PRODUCT_IDENTITY.status === 200){
    //     const _FINAL_RESPONSE = _NEW_PRODUCT_IDENTITY.data;
    //
    //     if (_FINAL_RESPONSE.meta.code === 200){
    //       const _DATA = _FINAL_RESPONSE.data;
    //
    //       dispatch({
    //         type: NEW_PRODUCT_IDENTITY.FETCH_AVAILABLE_WAREHOUSES,
    //         payload: _DATA
    //       })
    //
    //       dispatch({
    //         type: NEW_PRODUCT_IDENTITY.SET_CURRENT_WAREHOUSE,
    //         payload: (_DATA.length > 0)? _DATA[0]: {}
    //       })
    //
    //       dispatch({
    //         type: NEW_PRODUCT_IDENTITY.SET_WAREHOUSES_LOADING_STATUS,
    //         payload: false
    //       })
    //
    //       dispatch({
    //         type: NEW_PRODUCT_IDENTITY.SET_CONNECTED_STATUS,
    //         payload: {
    //           status: true
    //         }
    //       })
    //     }else{
    //       dispatch({
    //         type: NEW_PRODUCT_IDENTITY.SET_WAREHOUSES_LOADING_STATUS,
    //         payload: false
    //       })
    //
    //       dispatch({
    //         type: NEW_PRODUCT_IDENTITY.SET_CONNECTED_STATUS,
    //         payload: {
    //           status: false,
    //           content: _FINAL_RESPONSE.meta.error_message
    //         }
    //       })
    //     }
    //   }
    // } catch (error) {
    //   if (error){
    //     const _ERROR_MESSAGE = error.message || error.request._response;
    //
    //     dispatch({
    //       type: NEW_PRODUCT_IDENTITY.SET_WAREHOUSES_LOADING_STATUS,
    //       payload: false
    //     })
    //
    //     dispatch({
    //       type: NEW_PRODUCT_IDENTITY.SET_CONNECTED_STATUS,
    //       payload: {
    //         status: false,
    //         content: _ERROR_MESSAGE
    //       }
    //     })
    //   }
    // }
  }
};
