import { VIEWS } from '../../../types/index';
const { NEW_PRODUCT_IDENTITY } = VIEWS.PRODUCTS;

const initialState = {
        name: '',
        currentWarehouse: {},
        warehouses: [],
        features: [],
        warehousesLoading: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_PRODUCT_IDENTITY.SET_PRODUCT_NAME:
      return {
        ...state,
        name: action.payload
      };
      break;
    case NEW_PRODUCT_IDENTITY.SET_CURRENT_WAREHOUSE:
      return {
        ...state,
        currentWarehouse: action.payload
      };
      break;
    case NEW_PRODUCT_IDENTITY.SET_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_PRODUCT_IDENTITY.APPEND_WAREHOUSE:
      return {
        ...state,
        warehouses: [
          ...state.warehouses,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT_IDENTITY.FETCH_AVAILABLE_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case NEW_PRODUCT_IDENTITY.SET_PRODUCT_FEATURES:
      return {
        ...state,
        features: action.payload
      };
      break;
    case NEW_PRODUCT_IDENTITY.APPEND_PRODUCT_FEATURE:
      return {
        ...state,
        features: [
          ...state.features,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT_IDENTITY.SET_WAREHOUSES_LOADING_STATUS:
      return {
        ...state,
        warehousesLoading: action.payload
      };
      break;
    case NEW_PRODUCT_IDENTITY.SET_CONNECTED_STATUS:
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
