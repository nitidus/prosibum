import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { PRODUCT_SHIPPING_METHODS_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _getAvailableProductShippingMethods: async (dispatch) => {
    dispatch({
      type: PRODUCT_SHIPPING_METHODS_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS,
      payload: true
    })

    try {
      const _PRODUCT_SHIPPING_METHODS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/taxonomies/p.s.h`);

      if (_PRODUCT_SHIPPING_METHODS.status === 200){
        const _FINAL_RESPONSE = _PRODUCT_SHIPPING_METHODS.data;
      
        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: PRODUCT_SHIPPING_METHODS_MODAL.FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS,
            payload: _DATA
          })

          dispatch({
            type: PRODUCT_SHIPPING_METHODS_MODAL.SET_SELECTED_SHIPPING_METHOD,
            payload: (_DATA.length > 0)? _DATA[0]: {}
          })

          dispatch({
            type: PRODUCT_SHIPPING_METHODS_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_SHIPPING_METHODS_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: PRODUCT_SHIPPING_METHODS_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_SHIPPING_METHODS_MODAL.SET_CONNECTED_STATUS,
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
          type: PRODUCT_SHIPPING_METHODS_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: PRODUCT_SHIPPING_METHODS_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
