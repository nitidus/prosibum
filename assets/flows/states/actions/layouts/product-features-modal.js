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
    setCurrentHiddenTabIndex: (index) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_CURRENT_HIDDEN_TAB_INDEX,
        payload: index
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
    setPatternBasedFeatures: (patternBasedFeatures) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURES_BASED_ON_PATTERN,
        payload: patternBasedFeatures
      })
    },
    toggleDetachableUnit: () => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.TOGGLE_DETACHABLE_UNIT
      })
    },
    setMinimumDetachaleOrderQuantity: (minimumDetachableOrderQuantity) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_MINIMUM_DETACHABLE_ORDER_QUANTITY,
        payload: minimumDetachableOrderQuantity
      })
    },
    setMaximumDetachaleOrderQuantity: (maximumDetachableOrderQuantity) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_MAXIMUM_DETACHABLE_ORDER_QUANTITY,
        payload: maximumDetachableOrderQuantity
      })
    },
    setDetachablePrice: (detachablePrice) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_DETACHABLE_PRICE,
        payload: detachablePrice
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
    setPrice: (price) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_PRICE,
        payload: price
      })
    },
    setSelectedShippingMethod: (shippingMethod) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_SELECTED_SHIPPING_METHOD,
        payload: shippingMethod
      })
    },
    fetchAvailableProductFeatures: async (exludedItems) => CMD._getAvailableProductFeatures(exludedItems, dispatch),
    fetchAvailableProductUnits: async () => CMD._getAvailableProductUnits(dispatch),
    fetchAvailableProductWarehouses: async () => CMD._getAvailableProductWarehouses(dispatch),
    fetchAvailableProductShippingMethods: async () => CMD._getAvailableProductShippingMethods(dispatch),
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
    },
    setShippingMethodsLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS,
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
