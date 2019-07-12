import { VIEWS } from '../../../types/index';
const { NEW_FRAGMENT } = VIEWS.PRODUCTS;

const initialState = {
        language: {},
        query: '',
        queryItems: [],
        product: {},
        name: '',
        features: [],
        prices: [],
        onFetchingModePrice: {},
        shippingPlans: [],
        warehouses: [],
        onFetchingModeShippingPlan: {},
        unitsModalVisibility: false,
        warehousesLoading: false,
        queryItemsLoading: false,
        featuresLoading: false,
        productLoading: false,
        appendFragmentLoading: false,
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
    case NEW_FRAGMENT.SET_FEATURES:
      return {
        ...state,
        features: action.payload
      };
      break;
    case NEW_FRAGMENT.APPEND_FEATURE:
      return {
        ...state,
        features: [
          ...state.features,
          {
            ...action.payload,
            unit: action.payload.unit,
            warehouse: action.payload.warehouse,
            sales_structure: action.payload.sales_structure,
            shipping_method: action.payload.shipping_method,
            quantity: action.payload.quantity,
            isInfiniteMaximumOrderQuantity: action.payload.isInfiniteMaximumOrderQuantity,
            isDetachableUnit: action.payload.isDetachableUnit
          }
        ]
      };
      break;
    case NEW_FRAGMENT.SET_UNITS_MODAL_VISIBILITY:
      return {
        ...state,
        unitsModalVisibility: action.payload
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
        appendFragmentLoading: action.payload
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
