import { LAYOUTS } from '../../types/index';
const { WALLET_MODAL } = LAYOUTS;

const initialState = {
  currentHiddenTabIndex: 0,
  currencies: [],
  currentCurrency: {},
  walletName: '',
  walletInitialCreditAmount: 0,
  walletCurrentInitialCreditPlan: {},
  walletInitialCreditPlans: [],
  walletInitialCreditPlansLoading: false,
  appendWalletToResourcesLoading: false,
  appendedResources: [],
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WALLET_MODAL.SET_CURRENT_HIDDEN_TAB_INDEX:
      return {
        ...state,
        currentHiddenTabIndex: action.payload
      };
      break;
    case WALLET_MODAL.SET_CURRENCIES:
      return {
        ...state,
        currencies: action.payload
      };
      break;
    case WALLET_MODAL.SET_CURRENT_CURRENCY:
      return {
        ...state,
        currentCurrency: action.payload
      };
      break;
    case WALLET_MODAL.SET_WALLET_NAME:
      return {
        ...state,
        walletName: action.payload
      };
      break;
    case WALLET_MODAL.SET_WALLET_INITIAL_CREDIT_AMOUNT:
      return {
        ...state,
        walletInitialCreditAmount: action.payload
      };
      break;
    case WALLET_MODAL.APPEND_WALLET_TO_RESOURCE:
      return {
        ...state,
        appendedResources: action.payload
      };
      break;
    case WALLET_MODAL.SET_WALLET_CURRENT_INITIAL_CREDIT_PLAN:
      return {
        ...state,
        walletCurrentInitialCreditPlan: action.payload
      };
      break;
    case WALLET_MODAL.FETCH_WALLET_INITIAL_CREDIT_PLANS:
      return {
        ...state,
        walletInitialCreditPlans: action.payload
      };
      break;
    case WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS:
      return {
        ...state,
        walletInitialCreditPlansLoading: action.payload
      };
      break;
    case WALLET_MODAL.SET_APPEND_WALLET_TO_RESOURCE_LOADING_STATUS:
      return {
        ...state,
        appendWalletToResourcesLoading: action.payload
      };
      break;
    case WALLET_MODAL.SET_CONNECTED_STATUS:
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
