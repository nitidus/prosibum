import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { WALLET_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _appendWalletToResourceWithRules: async (walletRules, callback, dispatch) => {
    dispatch({
      type: WALLET_MODAL.SET_APPEND_WALLET_TO_RESOURCE_LOADING_STATUS,
      payload: true
    })

    try {
      const _WALLET = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/endusers`, walletRules);

      if (_WALLET.status === 200){
        const _FINAL_RESPONSE = _WALLET.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WALLET_MODAL.APPEND_WALLET_TO_RESOURCE,
            payload: _DATA
          })

          dispatch({
            type: WALLET_MODAL.SET_APPEND_WALLET_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLET_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          callback(_DATA, false);
        }else{
          dispatch({
            type: WALLET_MODAL.SET_APPEND_WALLET_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLET_MODAL.SET_CONNECTED_STATUS,
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
          type: WALLET_MODAL.SET_APPEND_WALLET_TO_RESOURCE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: WALLET_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
