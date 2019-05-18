import { VIEWS } from '../../../types/index';
const { NEW_FRAGMENT } = VIEWS.PRODUCTS;

const initialState = {
        language: {},
        query: '',
        queryItems: [],
        product: {},
        name: '',
        currentWarehouse: {},
        warehouses: [],
        units: [],
        predefinedfeatures: [],
        prices: [],
        onFetchingModePrice: {},
        shippingPlans: [],
        onFetchingModeShippingPlan: {},
        warehouseModalVisibility: false,
        unitsModalVisibility: false,
        unitDependedModalVisibility: false,
        shippingMethodsModalVisibility: false,
        warehousesLoading: false,
        queryItemsLoading: false,
        featuresLoading: false,
        productLoading: false,
        appendProductLoading: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_FRAGMENT.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      break;
    case NEW_FRAGMENT.RESET_FORMS:
      return {
        ...initialState
      };
      break;
    case NEW_FRAGMENT.SET_QUERY:
      return {
        ...state,
        query: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_QUERY_ITEMS:
      return {
        ...state,
        queryItems: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_NAME:
      return {
        ...state,
        name: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_CURRENT_WAREHOUSE:
      return {
        ...state,
        currentWarehouse: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_WAREHOUSE:
      return {
        ...state,
        warehouses: [
          ...state.warehouses,
          action.payload
        ]
      };
      break;
    case NEW_FRAGMENT.SET_UNITS:
      return {
        ...state,
        units: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_UNIT:
      return {
        ...state,
        units: [
          ...state.units,
          action.payload
        ]
      };
      break;
    case NEW_FRAGMENT.SET_PRICES:
      return {
        ...state,
        prices: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_PRICE:
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
    case NEW_FRAGMENT.SET_SELECTED_PRICE_FETCHINNG_MODE_ON:
      return {
        ...state,
        onFetchingModePrice: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_SHIPPING_PLANS:
      return {
        ...state,
        shippingPlans: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_SHIPPING_PLAN:
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
    case NEW_FRAGMENT.SET_SELECTED_SHIPPING_PLANS_MODE_ON:
      return {
        ...state,
        onFetchingModeShippingPlan: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_WAREHOUSE_MODAL_VISIBILITY:
      return {
        ...state,
        warehouseModalVisibility: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_UNITS_MODAL_VISIBILITY:
      return {
        ...state,
        unitsModalVisibility: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_UNIT_DEPENDED_MODAL_VISIBILITY:
      return {
        ...state,
        unitDependedModalVisibility: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_SHIPPING_METHODS_MODAL_VISIBILITY:
      return {
        ...state,
        shippingMethodsModalVisibility: action.payload
      };
      break;
    case NEW_FRAGMENT.FETCH_AVAILABLE_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_FRAGMENT.FETCH_AVAILABLE_PRODUCTS_BASED_ON_QUERY:
      return {
        ...state,
        queryItems: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_FRAGMENT:
      return state;
      break;
    case NEW_FRAGMENT.SET_WAREHOUSES_LOADING_STATUS:
      return {
        ...state,
        warehousesLoading: action.payload
      };
      break;
    case NEW_FRAGMENT.QUERY_BASED_PRODUCTS_LOADING_STATUS:
      return {
        ...state,
        queryItemsLoading: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_FRAGMENT_LOADING_STATUS:
      return {
        ...state,
        appendProductLoading: action.payload
      };
      break;
    case NEW_FRAGMENT.SET_CONNECTED_STATUS:
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
