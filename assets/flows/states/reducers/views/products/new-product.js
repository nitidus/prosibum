import { VIEWS } from '../../../types/index';
const { NEW_PRODUCT } = VIEWS.PRODUCTS;

const initialState = {
        name: '',
        currentWarehouse: {},
        warehouses: [],
        category: {},
        features: [],
        photos: [],
        primaryPhoto: {},
        onFetchingModePhoto: {},
        prices: [],
        onFetchingModePrice: {},
        shippingPlans: [],
        onFetchingModeShippingMethod: {},
        warehouseModalVisibility: false,
        productCategoriesModalVisibility: false,
        productFeaturesModalVisibility: false,
        productPhotoModalVisibility: false,
        productUnitDependedModalVisibility: false,
        warehousesLoading: false,
        shippingMethodsModalVisibility: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_PRODUCT.RESET_PRODUCT_FORMS:
      return {
        ...initialState
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_NAME:
      return {
        ...state,
        name: action.payload
      };
      break;
    case NEW_PRODUCT.SET_CURRENT_WAREHOUSE:
      return {
        ...state,
        currentWarehouse: action.payload
      };
      break;
    case NEW_PRODUCT.SET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_WAREHOUSE:
      return {
        ...state,
        warehouses: [
          ...state.warehouses,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_FEATURES:
      return {
        ...state,
        features: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_FEATURE:
      return {
        ...state,
        features: [
          ...state.features,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_PHOTOS:
      return {
        ...state,
        photos: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_PHOTO:
      return {
        ...state,
        photos: [
          ...state.photos,
          {
            ...action.payload,
            _id: action.payload._id,
            content: action.payload.content
          }
        ]
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_PRIMARY_PHOTO:
      return {
        ...state,
        primaryPhoto: {
          ...action.payload,
          _id: action.payload._id,
          content: action.payload.content
        }
      };
      break;
    case NEW_PRODUCT.SET_SELECTED_PRODUCT_PHOTO_FETCHINNG_MODE_ON:
      return {
        ...state,
        onFetchingModePhoto: {
          ...action.payload,
          _id: action.payload._id,
          content: action.payload.content
        }
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_PRICES:
      return {
        ...state,
        prices: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_PRICE:
      return {
        ...state,
        prices: [
          ...state.prices,
          {
            ...action.payload,
            _id: action.payload._id,
            name: action.payload.name,
            value: action.payload.value,
            unit: action.payload.unit
          }
        ]
      };
      break;
    case NEW_PRODUCT.SET_SELECTED_PRODUCT_PRICE_FETCHINNG_MODE_ON:
      return {
        ...state,
        onFetchingModePrice: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_SHIPPING_PLANS:
      return {
        ...state,
        shippingPlans: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_SHIPPING_PLAN:
      return {
        ...state,
        shippingPlans: [
          ...state.shippingPlans,
          {
            ...action.payload,
            _id: action.payload._id,
            unit: action.payload.unit,
            shippingMethod: action.payload.shippingMethod
          }
        ]
      };
      break;
    case NEW_PRODUCT.SET_SELECTED_PRODUCT_SHIPPING_PLANS_MODE_ON:
      return {
        ...state,
        onFetchingModeShippingMethod: action.payload
      };
      break;
    case NEW_PRODUCT.SET_WAREHOUSE_MODAL_VISIBILITY:
      return {
        ...state,
        warehouseModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_CATEGORIES_MODAL_VISIBILITY:
      return {
        ...state,
        productCategoriesModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_FEATURES_MODAL_VISIBILITY:
      return {
        ...state,
        productFeaturesModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_PHOTO_MODAL_VISIBILITY:
      return {
        ...state,
        productPhotoModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_UNIT_DEPENDED_MODAL_VISIBILITY:
      return {
        ...state,
        productUnitDependedModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_SHIPPING_METHODS_MODAL_VISIBILITY:
      return {
        ...state,
        shippingMethodsModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.FETCH_AVAILABLE_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS:
      return {
        ...state,
        warehousesLoading: action.payload
      };
      break;
    case NEW_PRODUCT.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: {
          ...state.connected,
          status: action.payload.status,
          content: action.payload.content || ''
        }
      };
      break;

    default:
      return state;
  }
}
