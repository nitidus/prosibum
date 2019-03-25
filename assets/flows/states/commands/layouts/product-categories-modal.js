import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { PRODUCT_CATEGORIES_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _getAvailableProductCategories: async (callback, dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
      payload: true
    })

    try {
      const _PRODUCT_CATEGORIES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/PRODUCT_CATEGORIES_ENDPOINT_URL`);

      if (_PRODUCT_CATEGORIES.status === 200){
        const _FINAL_RESPONSE = _PRODUCT_CATEGORIES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.APPEND_WAREHOUSE_TO_RESOURCE,
            payload: _DATA
          })

          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback(_DATA, false);
        }else{
          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.SET_CONNECTED_STATUS,
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
          type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: PRODUCT_CATEGORIES_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
