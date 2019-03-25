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
    setProductPromotions: (promotions) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_PROMOTIONS,
        payload: promotions
      })
    },
    appendProductPromotion: (promotion) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_PROMOTION,
        payload: promotion
      })
    },
    setProductDiscounts: (discounts) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_DISCOUNTS,
        payload: discounts
      })
    },
    appendProductDiscount: (discount) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_DISCOUNT,
        payload: discount
      })
    },
    setProductShippingPlans: (shippingPlans) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_SHIPPING_PLANS,
        payload: shippingPlans
      })
    },
    appendProductShippingPlanUsingPrice: (shippingPlan) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_SHIPPING_PLAN_USING_PRICE,
        payload: shippingPlan
      })
    },
    appendProductShippingPlanUsingPromotion: (shippingPlans) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_SHIPPING_PLAN_USING_PROMOTION,
        payload: shippingPlans
      })
    },
    setWarehouseModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_WAREHOUSE_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setProductModalModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRODUCT_CATEGORIES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    fetchAvailableWarehouses: async (token) =>  CMD._getAvailableWarehousesWithToken(token, dispatch),
    fetchAvailableShippingTypes: async () =>  CMD._getAvailableShippingTypes(dispatch),
    fetchAvailablePaymentTypes: async () =>  CMD._getAvailablePaymentTypes(dispatch),
    setWarehousesLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS,
        payload: status
      })
    },
    setShippingTypesLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_SHIPPING_TYPES_LOADING_STATUS,
        payload: status
      })
    },
    setPaymentTypesLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.SET_PAYMENT_TYPES_LOADING_STATUS,
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
