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
        prices: [],
        promotions: [],
        discounts: [],
        shippingPlans: [],
        shippingTypes: [],
        paymentTypes: [],
        warehouseModalVisibility: false,
        productCategoriesModalVisibility: false,
        warehousesLoading: false,
        shippingTypesLoading: false,
        paymentTypesLoading: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
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
            unit: action.payload.unit,
            quantity: action.payload.quantity
          }
        ]
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_PROMOTIONS:
      return {
        ...state,
        promotions: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_PROMOTION:
      return {
        ...state,
        promotions: [
          ...state.promotions,
          {
            ...action.payload,
            _id: action.payload._id,
            name: action.payload.name,
            value: action.payload.value,
            unit: action.payload.unit,
            quantity: action.payload.quantity
          }
        ]
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_DISCOUNTS:
      return {
        ...state,
        discounts: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_DISCOUNT:
      return {
        ...state,
        discounts: [
          ...state.discounts,
          {
            ...action.payload,
            _id: action.payload._id,
            name: action.payload.name,
            amount: action.payload.amount,
            price: action.payload.price,
            priority: action.payload.priority
          }
        ]
      };
      break;
    case NEW_PRODUCT.SET_PRODUCT_SHIPPING_PLANS:
      return {
        ...state,
        shippingPlans: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_SHIPPING_PLAN_USING_PRICE:
      return {
        ...state,
        shippingPlans: [
          ...state.shippingPlans,
          {
            ...action.payload,
            price: action.payload.price,
            shippingType: action.payload.shippingType
          }
        ]
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_SHIPPING_PLAN_USING_PROMOTION:
      return {
        ...state,
        shippingPlans: [
          ...state.shippingPlans,
          {
            ...action.payload,
            promotion: action.payload.promotion,
            shippingType: action.payload.shippingType
          }
        ]
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
    case NEW_PRODUCT.FETCH_AVAILABLE_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_PRODUCT.FETCH_AVAILABLE_SHIPPING_TYPES:
      return {
        ...state,
        shippingTypes: action.payload
      };
      break;
    case NEW_PRODUCT.FETCH_AVAILABLE_PAYMENT_TYPES:
      return {
        ...state,
        paymentTypes: action.payload
      };
      break;
    case NEW_PRODUCT.SET_WAREHOUSES_LOADING_STATUS:
      return {
        ...state,
        warehousesLoading: action.payload
      };
      break;
    case NEW_PRODUCT.SET_SHIPPING_TYPE_LOADING_STATUS:
      return {
        ...state,
        shippingTypesLoading: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PAYMENT_TYPES_LOADING_STATUS:
      return {
        ...state,
        paymentTypesLoading: action.payload
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
