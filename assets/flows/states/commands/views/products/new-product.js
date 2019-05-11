import axios from 'axios';
import io from 'socket.io-client';

import { VIEWS, GLOBAL } from '../../../types/index';
const { NEW_PRODUCT } = VIEWS.PRODUCTS,
      socket = io(GLOBAL.URLS.INTERFAS.HOST_NAME);

import { Functions } from '../../../../../modules/index';

module.exports = {
  _appendProductOnDemand: async (product, dispatch) => {
    dispatch({
      type: NEW_PRODUCT.APPEND_PRODUCT_LOADING_STATUS,
      payload: true
    })

    socket.emit('collection/insert', {
      collection: 'products',
      data: product
    })

    socket.on('collection/inserted', (response) => {
      if (response.meta.code === 200){
        const _DATA = response.data;

        if (_DATA.length > 0){
          dispatch({
            type: NEW_PRODUCT.APPEND_PRODUCT
          })
        }

        dispatch({
          type: NEW_PRODUCT.APPEND_PRODUCT_LOADING_STATUS,
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
          type: NEW_PRODUCT.APPEND_PRODUCT_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: NEW_PRODUCT.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: response.meta.error_message
          }
        })
      }
    })
  }
};
