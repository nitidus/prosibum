import { LAYOUTS } from '../../types/index';
const { PRODUCT_FEATURES_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.ProductFeaturesModal;

const mapStateToProps = (state) => {
  return {
    productFeaturesModal: state.ProductFeaturesModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.RESET_MODAL
      })
    },
    resetModalIndependly: () => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.RESET_MODAL_INDEPENDLY
      })
    },
    setCurrentFeature: (feature) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURE,
        payload: feature
      })
    },
    setFeatures: (features) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURES,
        payload: features
      })
    },
    setMinimumOrderQuantity: (minimumOrderQuantity) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_MINIMUM_ORDER_QUANTITY,
        payload: minimumOrderQuantity
      })
    },
    setMaximumOrderQuantity: (maximumOrderQuantity) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_MAXIMUM_ORDER_QUANTITY,
        payload: maximumOrderQuantity
      })
    },
    setQuantity: (quantity) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_QUANTITY,
        payload: quantity
      })
    },
    setDescription: (description) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_DESCRIPTION,
        payload: description
      })
    },
    setCustomizedFeatureName: (customizedFeatureName) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_CUSTOMIZED_FEATURE_NAME,
        payload: customizedFeatureName
      })
    },
    setCustomizedFeatureValue: (customizedFeatureValue) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_CUSTOMIZED_FEATURE_VALUE,
        payload: customizedFeatureValue
      })
    },
    setSelectedUnit: (unit) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_SELECTED_UNIT,
        payload: unit
      })
    },
    setSelectedWarehouse: (warehouse) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_SELECTED_WAREHOUSE,
        payload: warehouse
      })
    },
    fetchAvailableProductFeatures: async () => CMD._getAvailableProductFeatures(dispatch),
    fetchAvailableProductUnits: async () => CMD._getAvailableProductUnits(dispatch),
    fetchAvailableProductWarehouses: async () => CMD._getAvailableProductWarehouses(dispatch),
    setFeaturesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setUnitsLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setWarehousesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_WAREHOUSES_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const ProductFeaturesModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ProductFeaturesModal;
