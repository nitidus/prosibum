import { LAYOUTS } from '../../types/index';
const { PRODUCT_SHIPPING_METHODS_MODAL } = LAYOUTS;

const initialState = {
  selectedShippingMethod: {},
  shippingMethods: [],
  shippingMethodsLoading: false,
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SHIPPING_METHODS_MODAL.RESET_MODAL:
      return initialState;
      break;
    case PRODUCT_SHIPPING_METHODS_MODAL.SET_SELECTED_SHIPPING_METHOD:
      return {
        ...state,
        selectedShippingMethod: action.payload
      };
      break;
    case PRODUCT_SHIPPING_METHODS_MODAL.FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS:
      return {
        ...state,
        shippingMethods: action.payload
      };
      break;
    case PRODUCT_SHIPPING_METHODS_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS:
      return {
        ...state,
        shippingMethodsLoading: action.payload
      };
      break;
    case PRODUCT_SHIPPING_METHODS_MODAL.SET_CONNECTED_STATUS:
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
