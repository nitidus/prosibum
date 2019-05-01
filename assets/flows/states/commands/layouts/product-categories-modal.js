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
  },
  _appendCategoryWithToken: async (token, dispatch) => {
    dispatch({
      type: PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY_LOADING_STATUS,
      payload: true
    })

    try {
      const _TOKEN = {
              ...token,
              key: 'Product Category'
            },
            _NEW_CATEGORY_ON_TAXONOMIES = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/taxonomies?process_content=false`, _TOKEN);

      if (_NEW_CATEGORY_ON_TAXONOMIES.status === 200){
        const _FINAL_RESPONSE_OF_CATEGORY = _NEW_CATEGORY_ON_TAXONOMIES.data;

        if (_FINAL_RESPONSE_OF_CATEGORY.meta.code === 200){
          const _CATEGORY_DATA = _FINAL_RESPONSE_OF_CATEGORY.data,
                _NEW_PRODUCT_BASED_ON_CATEGORY = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/products`, {
                  name: _TOKEN.value,
                  category_id: _CATEGORY_DATA._id
                });

          if (_NEW_PRODUCT_BASED_ON_CATEGORY.status === 200){
            const _FINAL_RESPONSE = _NEW_PRODUCT_BASED_ON_CATEGORY.data;

            if (_FINAL_RESPONSE.meta.code === 200){
              const _DATA = _FINAL_RESPONSE.data;

              dispatch({
                type: PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY_LOADING_STATUS,
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
                type: PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY_LOADING_STATUS,
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
        }else{
          dispatch({
            type: PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY_LOADING_STATUS,
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
          type: PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY_LOADING_STATUS,
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
