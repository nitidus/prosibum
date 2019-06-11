import { LAYOUTS } from '../../../types/index';
const { PRODUCT_FEATURES_MODAL } = LAYOUTS;

const initialState = {
  currentHiddenTabIndex: 0,
  currentFeature: {},
  selectedUnit: {},
  selectedWarehouse: {},
  minimumOrderQuantity: 0,
  maximumOrderQuantity: 0,
  quantity: 0,
  description: '',
  customizedFeatureName: '',
  customizedFeatureValue: '',
  features: [],
  patternBasedFeatures: [],
  units: [],
  warehouses: [],
  featuresLoading: false,
  unitsLoading: false,
  warehousesLoading: false,
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FEATURES_MODAL.RESET_MODAL:
      return initialState;
      break;
    case PRODUCT_FEATURES_MODAL.RESET_MODAL_INDEPENDLY:
      return {
        ...initialState,
        currentFeature: state.currentFeature,
        selectedUnit: state.selectedUnit,
        features: state.features,
        units: state.units,
        featuresLoading: state.featuresLoading,
        unitsLoading: state.unitsLoading,
        connected: state.connected
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_CURRENT_HIDDEN_TAB_INDEX:
      return {
        ...state,
        currentHiddenTabIndex: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURE:
      return {
        ...state,
        currentFeature: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURES:
      return {
        ...state,
        features: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_SELECTED_UNIT:
      return {
        ...state,
        selectedUnit: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_SELECTED_WAREHOUSE:
      return {
        ...state,
        selectedWarehouse: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_MINIMUM_ORDER_QUANTITY:
      return {
        ...state,
        minimumOrderQuantity: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_MAXIMUM_ORDER_QUANTITY:
      return {
        ...state,
        maximumOrderQuantity: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_QUANTITY:
      return {
        ...state,
        quantity: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_CUSTOMIZED_FEATURE_NAME:
      return {
        ...state,
        customizedFeatureName: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_CUSTOMIZED_FEATURE_VALUE:
      return {
        ...state,
        customizedFeatureValue: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_FEATURES:
      return {
        ...state,
        features: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURE_BASED_ON_PATTERN:
      return {
        ...state,
        patternBasedFeatures: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_PRODUCT_FEATURES_BASED_ON_PATTERN:
      return {
        ...state,
        patternBasedFeatures: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_UNITS:
      return {
        ...state,
        units: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_FEATURES_LOADING_STATUS:
      return {
        ...state,
        featuresLoading: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_UNITS_LOADING_STATUS:
      return {
        ...state,
        unitsLoading: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_WAREHOUSES_LOADING_STATUS:
      return {
        ...state,
        warehousesLoading: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_CONNECTED_STATUS:
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
