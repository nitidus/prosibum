import { VIEWS } from '../../../types/index';
const { NEW_FRAGMENT } = VIEWS.PRODUCTS;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Products.NewFragment;

const mapStateToProps = (state) => {
  return {
    newFragment: state.NewFragment
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => {
      dispatch({
        type: NEW_FRAGMENT.SET_LANGUAGE,
        payload: language
      })
    },
    resetForms: () => {
      dispatch({
        type: NEW_FRAGMENT.RESET_FORMS
      })
    },
    setProduct: (product) => {
      dispatch({
        type: NEW_FRAGMENT.SET_PRODUCT,
        payload: product
      })
    },
    setName: (name) => {
      dispatch({
        type: NEW_FRAGMENT.SET_NAME,
        payload: name
      })
    },
    setQuery: (query) => {
      dispatch({
        type: NEW_FRAGMENT.SET_QUERY,
        payload: query
      })
    },
    setQueryItems: (items) => {
      dispatch({
        type: NEW_FRAGMENT.SET_QUERY_ITEMS,
        payload: items
      })
    },
    setFeatures: (features) => {
      dispatch({
        type: NEW_FRAGMENT.SET_FEATURES,
        payload: features
      })
    },
    appendFeature: (feature) => {
      dispatch({
        type: NEW_FRAGMENT.APPEND_FEATURE,
        payload: feature
      })
    },
    setUnits: (units) => {
      dispatch({
        type: NEW_FRAGMENT.SET_UNITS,
        payload: units
      })
    },
    appendUnit: (unit) => {
      dispatch({
        type: NEW_FRAGMENT.APPEND_UNIT,
        payload: unit
      })
    },
    setPrices: (prices) => {
      dispatch({
        type: NEW_FRAGMENT.SET_PRICES,
        payload: prices
      })
    },
    appendPrice: (price) => {
      dispatch({
        type: NEW_FRAGMENT.APPEND_PRICE,
        payload: price
      })
    },
    setOnFetchingModePrice: (unitFeature) => {
      dispatch({
        type: NEW_FRAGMENT.SET_SELECTED_PRICE_FETCHINNG_MODE_ON,
        payload: unitFeature
      })
    },
    setShippingPlans: (shippingPlans) => {
      dispatch({
        type: NEW_FRAGMENT.SET_SHIPPING_PLANS,
        payload: shippingPlans
      })
    },
    appendShippingPlan: (shippingPlan) => {
      dispatch({
        type: NEW_FRAGMENT.APPEND_SHIPPING_PLAN,
        payload: shippingPlan
      })
    },
    setOnFetchingModeShippingPlan: (shippingPlan) => {
      dispatch({
        type: NEW_FRAGMENT.SET_SELECTED_SHIPPING_PLANS_MODE_ON,
        payload: shippingPlan
      })
    },
    setUnitsModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_FRAGMENT.SET_UNITS_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setFeaturesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_FRAGMENT.SET_FEATURES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setUnitDependedModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_FRAGMENT.SET_UNIT_DEPENDED_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setShippingMethodsModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_FRAGMENT.SET_SHIPPING_METHODS_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    fetchAvailableProductsBasedOnQuery: async (query) =>  CMD._getAvailableProductsBasedOnQuery(query, dispatch),
    fetchAvailableProductsBasedOnQueryOnDemand: async (query) => CMD._getAvailableProductsBasedOnQueryOnDemand(query, dispatch),
    appendFragment: async (fragment) =>  CMD._appendFragmentOnDemand(fragment, dispatch),
    setQueryItemsLoadingStatus: (status) => {
      dispatch({
        type: NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS,
        payload: status
      })
    },
    setFeaturesLoadingStatus: (status) => {
      dispatch({
        type: NEW_FRAGMENT.FEATURES_LOADING_STATUS,
        payload: status
      })
    },
    setAppendFragmentLoadingStatus: (status) => {
      dispatch({
        type: NEW_FRAGMENT.APPEND_FRAGMENNT_LOADING_STATUS,
        payload: status
      })
    }
  };
}

const NewFragment = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = NewFragment;
