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
    setLanguage: (language) => {
      dispatch({
        type: NEW_PRODUCT.SET_LANGUAGE,
        payload: language
      })
    },
    resetProductForms: () => {
      dispatch({
        type: NEW_PRODUCT.RESET_PRODUCT_FORMS
      })
    },
    setProduct: (product) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT,
        payload: product
      })
    },
    setProductInternalName: (internalName) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_INTERNAL_NAME,
        payload: internalName
      })
    },
    setProductQuery: (query) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_QUERY,
        payload: query
      })
    },
    setProductQueryItems: (items) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_QUERY_ITEMS,
        payload: items
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
    setOnFetchingModeShippingPlan: (shippingPlan) => {
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
    fetchAvailableProductsBasedOnQuery: async (query) =>  CMD._getAvailableProductsBasedOnQuery(query, dispatch),
    fetchAvailableProductsBasedOnQueryOnDemand: async (query) => CMD._getAvailableProductsBasedOnQueryOnDemand(query, dispatch),
    fetchProductBasedOnCategory: async (category) =>  CMD._getProductsBasedOnCategory(category, dispatch),
    appendProductOnDemand: async (product) =>  CMD._appendProductOnDemand(product, dispatch),
    setWarehousesLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
        payload: status
      })
    },
    setProductQueryItemsLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY_LOADING_STATUS,
        payload: status
      })
    },
    setProductLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_FETCH_PRODUCT_BASED_ON_CATEGORY_LOADING_STATUS,
        payload: status
      })
    },
    setAppendProductLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_LOADING_STATUS,
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
