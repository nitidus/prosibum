import axios from 'axios';

import { LAYOUTS, GLOBAL } from '../../types/index';
const { PRODUCT_FEATURES_MODAL } = LAYOUTS;

import { Functions } from '../../../../modules/index';

module.exports = {
  _getAvailableProductFeatures: async (dispatch) => {
    dispatch({
      type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS,
      payload: true
    })

    try {
      const _PRODUCT_FEATURES = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/taxonomies/p.f`);

      if (_PRODUCT_FEATURES.status === 200){
        const _FINAL_RESPONSE = _PRODUCT_FEATURES.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_FEATURES,
            payload: _DATA
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURE,
            payload: (_DATA.length > 0)? _DATA[0]: {}
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
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
          type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  },
  _getAvailableProductUnits: async (dispatch) => {
    dispatch({
      type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS,
      payload: true
    })

    try {
      const _UNITS = await axios.get(`${GLOBAL.URLS.INTERFAS.HOST_NAME}/taxonomies/unit`);

      if (_UNITS.status === 200){
        const _FINAL_RESPONSE = _UNITS.data;

        if (_FINAL_RESPONSE.meta.code === 200){
          const _DATA = _FINAL_RESPONSE.data;

          dispatch({
            type: PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_UNITS,
            payload: _DATA
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_SELECTED_UNIT,
            payload: (_DATA.length > 0)? _DATA[0]: {}
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
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
          type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
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
      type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_WAREHOUSES_LOADING_STATUS,
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
            type: PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_WAREHOUSES,
            payload: _DATA
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_SELECTED_WAREHOUSE,
            payload: (_DATA.length > 0)? _DATA[0]: {}
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_WAREHOUSES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
            payload: {
              status: true
            }
          })
        }else{
          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_WAREHOUSES_LOADING_STATUS,
            payload: false
          })

          dispatch({
            type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
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
          type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_WAREHOUSES_LOADING_STATUS,
          payload: false
        })

        dispatch({
          type: PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS,
          payload: {
            status: false,
            content: _ERROR_MESSAGE
          }
        })
      }
    }
  }
};
