import { LAYOUTS } from '../../../types/index';
const { PRODUCT_CATEGORIES_MODAL } = LAYOUTS;

const initialState = {
  currentHiddenTabIndex: 0,
  currentCategory: {},
  categories: [],
  categoriesLoading: false,
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CATEGORIES_MODAL.RESET_MODAL:
      return initialState;
      break;
    case PRODUCT_CATEGORIES_MODAL.SET_PRODUCT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload
      };
      break;
    case PRODUCT_CATEGORIES_MODAL.FETCH_AVAILABLE_PRODUCT_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
      break;
    case PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY:
      return state;
      break;
    case PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS:
      return {
        ...state,
        categoriesLoading: action.payload
      };
      break;
    case PRODUCT_CATEGORIES_MODAL.SET_CONNECTED_STATUS:
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
