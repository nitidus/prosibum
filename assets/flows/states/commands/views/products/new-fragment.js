import axios from 'axios';
import io from 'socket.io-client';

import { VIEWS, GLOBAL } from '../../../types/index';
const { NEW_FRAGMENT } = VIEWS.PRODUCTS,
      socket = io(GLOBAL.URLS.INTERFAS.SOCKET_NAME);

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getAvailableProductsBasedOnQuery: async (query, dispatch) => {
    dispatch({
      type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
      payload: true
    })

    try {
      const _QUERY = query.trim(),
            _PRODUCTS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/search/products?q=${_QUERY}`);

      if (_PRODUCTS.status === 200){
        const _FINAL_RESPONSE = _PRODUCTS.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: NEW_FRAGMENT.FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY,
            payload: _DATA
          })

          dispatch({
            type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
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
          type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _getAvailableProductsBasedOnQueryOnDemand: async (query, dispatch) => {
    dispatch({
      type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
      payload: true
    })

    const _QUERY = query.trim();

    socket.emit('collection/find/token', {
      collection: 'search',
      token: 'products',
      data: {
        query: query
      }
    })

    socket.on('collection/founded/search/products', (response) => {
      if (response.meta.code === 200){
        const _DATA = response.data;

        dispatch({
          type: NEW_FRAGMENT.FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY,
          payload: _DATA
        })

        dispatch({
          type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
          payload: {
            status: true
          }
        })
      }else{
        dispatch({
          type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: response.meta.error_message
          }
        })
      }
    })
  },
  _appendFragmentOnDemand: async (fragment, dispatch) => {
    dispatch({
      type: NEW_FRAGMENT.APPEND_FRAGMENT_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH);

      let finalData = {
        end_user_id: _AUTH._id,
        ...fragment
      };

      if (typeof _AUTH.cardinal_id != 'undefined'){
        finalData.cardinal_id = _AUTH.cardinal_id;
      }

      socket.emit('collection/insert', {
        collection: 'fragments',
        data: finalData
      })

      socket.on('collection/inserted/fragments', (response) => {
        if (response.meta.code === 200){
          const _DATA = response.data;

          if (_DATA.length > 0){
            dispatch({
              type: NEW_FRAGMENT.APPEND_FRAGMENT
            })

            dispatch({
              type: NEW_FRAGMENT.APPEND_FRAGMENT_LOADING_STATUS,
              payload: false
            })

            dispatch({
              type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
              payload: {
                status: true
              }
            })
          }
        }else{
          dispatch({
            type: NEW_FRAGMENT.APPEND_FRAGMENT_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
            payload: {
              status: false,
              content: response.meta.error_message
            }
          })
        }
      })
    } catch (error) {
      if (error){
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: NEW_FRAGMENT.APPEND_FRAGMENT_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _getAvailableProductWarehouses: async (dispatch) => {
    dispatch({
      type: NEW_FRAGMENT.SET_WAREHOUSES_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_ID = (typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id,
            _WAREHOUSES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/warehouses/${_REFERENCE_ID}`);

      if (_WAREHOUSES.status === 200){
        const _FINAL_RESPONSE = _WAREHOUSES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: NEW_FRAGMENT.FETCH_AVAILABLE_WAREHOUSES,
            payload: _DATA
          })

          dispatch({
            type: NEW_FRAGMENT.SET_WAREHOUSES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: NEW_FRAGMENT.SET_WAREHOUSES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
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
          type: NEW_FRAGMENT.SET_WAREHOUSES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_FRAGMENT.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
