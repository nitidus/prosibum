import { LAYOUTS } from '../../types/index';
const { WALLET_MODAL } = LAYOUTS;

const initialState = {
  currentHiddenTabIndex: 0,
  currencies: [],
  currentCurrency: {},
  walletName: '',
  wallet: {},
  walletInitialCreditAmount: 0,
  walletCurrentInitialCreditPlan: {},
  walletInitialCreditPlans: [],
  creditCard: {
    number: {
      formatted: '',
      extracted: ''
    },
    expirationDate: {
      month: {},
      year: ''
    },
    cvv: ''
  },
  walletInitialCreditPlansLoading: false,
  appendToResourcesLoading: false,
  appendedResource: {},
  connected: {
    status: true,
    content: ''
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case WALLET_MODAL.RESET_MODAL:
      return initialState;
      break;
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
    case WALLET_MODAL.SET_WALLET:
      return {
        ...state,
        wallet: action.payload
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
        appendedResource: action.payload
      };
      break;
    case WALLET_MODAL.CHARGE_WALLET:
      return {
        ...state,
        appendedResource: action.payload
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
    case WALLET_MODAL.SET_CARD_NUMBER:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          number: action.payload
        }
      };
      break;
    case WALLET_MODAL.SET_CARD_EXPIRATION_DATE:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          expirationDate: {
            ...state.creditCard.expirationDate,
            month: action.payload.month,
            year: action.payload.year
          }
        }
      };
      break;
    case WALLET_MODAL.SET_CARD_EXPIRATION_DATE_MONTH:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          expirationDate: {
            ...state.creditCard.expirationDate,
            month: action.payload
          }
        }
      };
      break;
    case WALLET_MODAL.SET_CARD_EXPIRATION_DATE_YEAR:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          expirationDate: {
            ...state.creditCard.expirationDate,
            year: action.payload
          }
        }
      };
      break;
    case WALLET_MODAL.SET_CARD_CVV:
      return {
        ...state,
        creditCard: {
          ...state.creditCard,
          cvv: action.payload
        }
      };
      break;
    case WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS:
      return {
        ...state,
        walletInitialCreditPlansLoading: action.payload
      };
      break;
    case WALLET_MODAL.SET_MULTI_PURPOSE_REQUEST_TO_RESOURCE_LOADING_STATUS:
      return {
        ...state,
        appendToResourcesLoading: action.payload
      };
      break;
    case WALLET_MODAL.SET_CONNECTED_STATUS:
      return {
        ...state,
        connected: {
          ...state.connected,
          ...action.payload,
          status: action.payload.status,
          content: action.payload.content || ''
        }
      };
      break;
    case WALLET_MODAL.RESET_CONNECTION:
      return {
        ...state,
        connected: initialState.connected
      };
      break;

    default:
      return state;
  }
}
