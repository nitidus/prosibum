import { VIEWS } from '../../../types/index';
const { NEW_PRODUCT} = VIEWS.PRODUCTS;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Products.NewProduct;

const mapStateToProps = (state) => {
  return {
    newProduct: state.NewProduct
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetProductForms: () => {
      dispatch({
        type: NEW_PRODUCT.RESET_PRODUCT_FORMS
      })
    },
    setProductName: (name) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_NAME,
        payload: name
      })
    },
    setCurrentWarehouse: (warehouse) => {
      dispatch({
        type: NEW_PRODUCT.SET_CURRENT_WAREHOUSE,
        payload: warehouse
      })
    },
    setWarehouses: (warehouses) => {
      dispatch({
        type: NEW_PRODUCT.SET_WAREHOUSES,
        payload: warehouses
      })
    },
    appendWarehouse: (warehouse) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_WAREHOUSE,
        payload: warehouse
      })
    },
    setCategory: (category) => {
      dispatch({
        type: NEW_PRODUCT.SET_CATEGORY,
        payload: category
      })
    },
    setProductFeatures: (features) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_FEATURES,
        payload: features
      })
    },
    appendProductFeature: (feature) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_FEATURE,
        payload: feature
      })
    },
    setProductPhotos: (photos) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_PHOTOS,
        payload: photos
      })
    },
    appendProductPhoto: (photo) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_PHOTO,
        payload: photo
      })
    },
    setProductPrimaryPhoto: (photo) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_PRIMARY_PHOTO,
        payload: photo
      })
    },
    setOnFetchingModePhoto: (photo) => {
      dispatch({
        type: NEW_PRODUCT.SET_SELECTED_PRODUCT_PHOTO_FETCHINNG_MODE_ON,
        payload: photo
      })
    },
    setProductPrices: (prices) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_PRICES,
        payload: prices
      })
    },
    appendProductPrice: (price) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_PRICE,
        payload: price
      })
    },
    setOnFetchingModePrice: (unitFeature) => {
      dispatch({
        type: NEW_PRODUCT.SET_SELECTED_PRODUCT_PRICE_FETCHINNG_MODE_ON,
        payload: unitFeature
      })
    },
    setProductShippingPlans: (shippingPlans) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_SHIPPING_PLANS,
        payload: shippingPlans
      })
    },
    appendProductShippingPlan: (shippingPlan) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_SHIPPING_PLAN,
        payload: shippingPlan
      })
    },
    setOnFetchingModeShippingMethod: (shippingPlan) => {
      dispatch({
        type: NEW_PRODUCT.SET_SELECTED_PRODUCT_SHIPPING_PLANS_MODE_ON,
        payload: shippingPlan
      })
    },
    setWarehouseModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_WAREHOUSE_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setProductCategoriesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_CATEGORIES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setProductFeaturesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_FEATURES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setProductPhotoModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_PHOTO_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setProductUnitDependedModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_UNIT_DEPENDED_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setProductShippingMethodsModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_SHIPPING_METHODS_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    fetchAvailableWarehouses: async (token) =>  CMD._getAvailableWarehousesWithToken(token, dispatch),
    setWarehousesLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
        payload: status
      })
    }
  };
}

const NewProduct = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = NewProduct;
