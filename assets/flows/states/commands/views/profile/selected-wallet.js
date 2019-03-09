import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { SELECTED_WALLET } = VIEWS.DASHBOARD;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getTransactionsWithWalletToken: async (token, dispatch) => {
    dispatch({
      type: SELECTED_WALLET.SET_TRANSACTIONS_LOADING_STATUS,
      payload: true
    })

    try {
      const _TOKEN = (typeof token._id != 'undefined')? token._id: token,
            _TRANSACTIONS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/histories/${_TOKEN}`);

      if (_TRANSACTIONS.status === 200){
        const _FINAL_RESPONSE = _TRANSACTIONS.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: SELECTED_WALLET.FETCH_AVAILABLE_TRANSACTIONS,
            payload: _DATA
          })

          dispatch({
            type: SELECTED_WALLET.SET_TRANSACTIONS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SELECTED_WALLET.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: SELECTED_WALLET.SET_TRANSACTIONS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: SELECTED_WALLET.SET_CONNECTED_STATUS,
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
          type: SELECTED_WALLET.SET_TRANSACTIONS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: SELECTED_WALLET.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
