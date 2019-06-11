import { VIEWS } from '../../../types/index';
const { NEW_PRODUCT } = VIEWS.PRODUCTS;

const initialState = {
        language: {},
        category: {},
        name: '',
        inprocessTag: '',
        tags: [],
        inventoryUnits: [],
        description: '',
        features: [],
        photos: [],
        primaryPhoto: {},
        onFetchingModePhoto: {},
        categoriesModalVisibility: false,
        unitsModalVisibility: false,
        featuresModalVisibility: false,
        photoModalVisibility: false,
        appendProductLoading: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_PRODUCT.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      break;
    case NEW_PRODUCT.RESET_FORMS:
      return {
        ...initialState
      };
      break;
    case NEW_PRODUCT.SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
      break;
    case NEW_PRODUCT.SET_NAME:
      return {
        ...state,
        name: action.payload
      };
      break;
    case NEW_PRODUCT.SET_INPROCESS_TAG:
      return {
        ...state,
        inprocessTag: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_TAG:
      return {
        ...state,
        tags: [
          ...state.tags,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT.SET_TAGS:
      return {
        ...state,
        tags: action.payload
      };
      break;
    case NEW_PRODUCT.SET_INVENTORY_UNITS:
      return {
        ...state,
        inventoryUnits: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_INVENTORY_UNIT:
      return {
        ...state,
        inventoryUnits: [
          ...state.inventoryUnits,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
      break;
    case NEW_PRODUCT.SET_FEATURES:
      return {
        ...state,
        features: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_FEATURE:
      return {
        ...state,
        features: [
          ...state.features,
          action.payload
        ]
      };
      break;
    case NEW_PRODUCT.SET_PHOTOS:
      return {
        ...state,
        photos: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PHOTO:
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
    case NEW_PRODUCT.SET_PRIMARY_PHOTO:
      return {
        ...state,
        primaryPhoto: {
          ...action.payload,
          _id: action.payload._id,
          content: action.payload.content
        }
      };
      break;
    case NEW_PRODUCT.SET_SELECTED_PHOTO_FETCHINNG_MODE_ON:
      return {
        ...state,
        onFetchingModePhoto: {
          ...action.payload,
          _id: action.payload._id,
          content: action.payload.content
        }
      };
      break;
    case NEW_PRODUCT.SET_CATEGORIES_MODAL_VISIBILITY:
      return {
        ...state,
        categoriesModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_UNITS_MODAL_VISIBILITY:
      return {
        ...state,
        unitsModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_FEATURES_MODAL_VISIBILITY:
      return {
        ...state,
        featuresModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.SET_PHOTO_MODAL_VISIBILITY:
      return {
        ...state,
        photoModalVisibility: action.payload
      };
      break;
    case NEW_PRODUCT.APPEND_PRODUCT:
      return state;
      break;
    case NEW_PRODUCT.APPEND_PRODUCT_LOADING_STATUS:
      return {
        ...state,
        appendProductLoading: action.payload
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
