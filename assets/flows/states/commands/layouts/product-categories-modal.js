import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { PRODUCT_CATEGORIES_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _getAvailableProductCategories: async (dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
      payload: true
    })

    try {
      const _PRODUCT_CATEGORIES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/taxonomies/p.c`);

      if (_PRODUCT_CATEGORIES.status === 200){
        const _FINAL_RESPONSE = _PRODUCT_CATEGORIES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.FETCH_AVAILABLE_PRODUCT_CATEGORIES,
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
        const _ERROR_MESSAGE = error.message || error.request._response;

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
