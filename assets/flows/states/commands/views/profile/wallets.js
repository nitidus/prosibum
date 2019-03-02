import axios from 'axios';

import { VIEWS, GLOBAL } from '../../../types/index';
const { WALLETS } = VIEWS.DASHBOARD;

import { Functions } from '../../../../../modules/index';

module.exports = {
  _getWalletsTypeWithCurrenciesType: async (dispatch) => {
    dispatch({
      type: WALLETS.SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS,
      payload: true
    })

    try {
      const _CURRENCIES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/currencies`);

      if (_CURRENCIES.status === 200){
        const _FINAL_RESPONSE = _CURRENCIES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WALLETS.FETCH_AVAILABLE_WALLET_CURRENCIES_TYPE,
            payload: _DATA
          })

          dispatch({
            type: WALLETS.SET_PILOT_CURRENT_TAB,
            payload: _DATA[0]
          })

          dispatch({
            type: WALLETS.SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLETS.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })

          module.exports._getWalletsWithUsergroup(_DATA[0], {}, dispatch);
        }else{
          dispatch({
            type: WALLETS.SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLETS.SET_CONNECTED_STATUS,
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
          type: WALLETS.SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: WALLETS.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _getWalletsWithUsergroup: async (currency, usergroup, dispatch) => {
    dispatch({
      type: WALLETS.SET_WALLETS_LOADING_STATUS,
      payload: true
    })

    try {
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH),
            _REFERENCE_ID = ((typeof usergroup != 'undefined') && (Object.keys(usergroup).length > 0))? ((typeof usergroup.cardinal_id != 'undefined')? usergroup.cardinal_id: usergroup._id): ((typeof _AUTH.cardinal_id != 'undefined')? _AUTH.cardinal_id: _AUTH._id),
            _CURRENCY_ID = ((typeof currency != 'undefined') && (Object.keys(currency).length > 0) && (typeof currency._id != 'undefined'))? currency._id: currency,
            _WALLETS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/wallets/${_REFERENCE_ID}?currency_id=${_CURRENCY_ID}`);

      if (_WALLETS.status === 200){
        const _FINAL_RESPONSE = _WALLETS.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: WALLETS.FETCH_AVAILABLE_WALLETS,
            payload: _DATA
          })

          dispatch({
            type: WALLETS.SET_WALLETS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLETS.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: WALLETS.SET_WALLETS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: WALLETS.SET_CONNECTED_STATUS,
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
          type: WALLETS.SET_WALLETS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: WALLETS.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
