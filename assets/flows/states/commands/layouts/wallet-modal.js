import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { WALLET_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _appendWalletToResourceWithRules: async (walletRules, callback, dispatch) => {
    dispatch({
      type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _END_USER_ID = (typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id,
            _WALLET = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/wallets`, {
              end_user_id: _END_USER_ID,
              ...walletRules
            });

      if (_WALLET.status === 200){
        const _FINAL_RESPONSE = _WALLET.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WALLET_MODAL.APPEND_WALLET_TO_RESOURCE,
            payload: _DATA
          })

          dispatch({
            type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
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
            type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
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
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
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
  },
  _chargeWalletWithRules: async (chargeRules, callback, dispatch) => {
    dispatch({
      type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _END_USER_ID = (typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id,
            _CHARGE = await axios.post(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/histories`, {
              end_user_id: _END_USER_ID,
              ...chargeRules
            });

      if (_CHARGE.status === 200){
        const _FINAL_RESPONSE = _CHARGE.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WALLET_MODAL.CHARGE_WALLET,
            payload: _DATA
          })

          dispatch({
            type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
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
          let _INTERNAL_ERROR = _FINAL_RESPONSE;

          _INTERNAL_ERROR.content = _INTERNAL_ERROR.meta.error_message;

          delete _INTERNAL_ERROR.meta;

          dispatch({
            type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLET_MODAL.SET_CONNECTED_STATUS,
            payload: {
              ..._INTERNAL_ERROR,
              status: false
            }
          })
        }
      }
    } catch (error) {
      if (error){
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS,
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
  },
  _getWalletInitialCreditPlansUsingCurrencyType: async (currencyType, dispatch) => {
    dispatch({
      type: WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS,
      payload: true
    })

    try {
      const _CURRENCY_TYPE = (typeof currencyType != 'undefined')? Functions._convertTokenToKey(currencyType): 'TP',
            _PLANS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/plans/${_CURRENCY_TYPE}`);

      if (_PLANS.status === 200){
        const _FINAL_RESPONSE = _PLANS.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WALLET_MODAL.FETCH_WALLET_INITIAL_CREDIT_PLANS,
            payload: _DATA
          })

          dispatch({
            type: WALLET_MODAL.SET_WALLET_CURRENT_INITIAL_CREDIT_PLAN,
            payload: (_DATA.length > 0)? _DATA[0]: {}
          })


          dispatch({
            type: WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLET_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS,
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
        const _ERROR_MESSAGE = error.message || error.request._response;

        dispatch({
          type: WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS,
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
