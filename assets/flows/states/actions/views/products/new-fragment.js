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
    setUnitsModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_FRAGMENT.SET_UNITS_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    fetchAvailableProductsBasedOnQuery: async (query) =>  CMD._getAvailableProductsBasedOnQuery(query, dispatch),
    fetchAvailableProductsBasedOnQueryOnDemand: async (query) => CMD._getAvailableProductsBasedOnQueryOnDemand(query, dispatch),
    fetchAvailableProductWarehouses: async () => CMD._getAvailableProductWarehouses(dispatch),
    fetchAvailableProductShippingMethods: async () => CMD._getAvailableProductShippingMethods(dispatch),
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
    setWarehousesLoadingStatus: (status) => {
      dispatch({
        type: NEW_FRAGMENT.SET_WAREHOUSES_LOADING_STATUS,
        payload: status
      })
    },
    setShippingMethodsLoadingStatus: (status) => {
      dispatch({
        type: NEW_FRAGMENT.SET_SHIPPING_METHODS_LOADING_STATUS,
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
