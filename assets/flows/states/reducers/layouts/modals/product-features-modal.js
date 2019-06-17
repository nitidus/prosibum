import { LAYOUTS } from '../../../types/index';
const { PRODUCT_FEATURES_MODAL } = LAYOUTS;

const initialState = {
  currentHiddenTabIndex: 0,
  currentFeature: {},
  selectedUnit: {},
  selectedWarehouse: {},
  minimumOrderQuantity: 0,
  maximumOrderQuantity: 0,
  isInfiniteMaximumOrderQuantity: true,
  quantity: 0,
  description: '',
  customizedFeatureName: '',
  customizedFeatureValue: '',
  features: [],
  patternBasedFeatures: [],
  units: [],
  isDetachableUnit: false,
  minimumDetachableOrderQuantity: 0,
  maximumDetachableOrderQuantity: 0,
  detachablePrice: 0,
  warehouses: [],
  price: 0,
  selectedShippingMethod: {},
  shippingMethods: [],
  featuresLoading: false,
  unitsLoading: false,
  warehousesLoading: false,
  shippingMethodsLoading: false,
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
    case PRODUCT_FEATURES_MODAL.TOGGLE_INFINITE_MAXIMUM_ORDER_QUANTITY:
      return {
        ...state,
        isInfiniteMaximumOrderQuantity: !state.isInfiniteMaximumOrderQuantity
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
    case PRODUCT_FEATURES_MODAL.TOGGLE_DETACHABLE_UNIT:
      return {
        ...state,
        isDetachableUnit: !state.isDetachableUnit
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_MINIMUM_DETACHABLE_ORDER_QUANTITY:
      return {
        ...state,
        minimumDetachableOrderQuantity: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_MAXIMUM_DETACHABLE_ORDER_QUANTITY:
      return {
        ...state,
        maximumDetachableOrderQuantity: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_DETACHABLE_PRICE:
      return {
        ...state,
        detachablePrice: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_WAREHOUSES:
      return {
        ...state,
        warehouses: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_PRICE:
      return {
        ...state,
        price: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.SET_SELECTED_SHIPPING_METHOD:
      return {
        ...state,
        selectedShippingMethod: action.payload
      };
      break;
    case PRODUCT_FEATURES_MODAL.FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS:
      return {
        ...state,
        shippingMethods: action.payload
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
    case PRODUCT_FEATURES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS:
      return {
        ...state,
        shippingMethodsLoading: action.payload
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
