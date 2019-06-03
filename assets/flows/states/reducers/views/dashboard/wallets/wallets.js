import { VIEWS } from '../../../../types/index';
const { WALLETS } = VIEWS.DASHBOARD;

const initialState = {
        currentTab: {},
        tabs: [],
        selectedWallet: {},
        wallets: [],
        walletModalVisibility: false,
        loadingWalletCurrenciesType: false,
        loadingWallets: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case WALLETS.SET_PILOT_CURRENT_TAB:
      return {
        ...state,
        currentTab: action.payload
      };
      break;
    case WALLETS.SET_PILOT_TABS:
      return {
        ...state,
        tabs: action.payload
      };
      break;
    case WALLETS.SET_SELECTED_WALLET:
      return {
        ...state,
        selectedWallet: action.payload
      };
      break;
    case WALLETS.SET_WALLET_MODAL_VISIBILITY:
      return {
        ...state,
        walletModalVisibility: action.payload
      };
      break;
    case WALLETS.SET_WALLETS:
      return {
        ...state,
        wallets: action.payload
      };
      break;
    case WALLETS.FETCH_AVAILABLE_WALLETS:
      return {
        ...state,
        wallets: action.payload
      };
      break;
    case WALLETS.FETCH_AVAILABLE_WALLET_CURRENCIES_TYPE:
      return {
        ...state,
        tabs: action.payload
      };
      break;
    case WALLETS.SET_WALLETS_LOADING_STATUS:
      return {
        ...state,
        loadingWallets: action.payload
      };
      break;
    case WALLETS.SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS:
      return {
        ...state,
        loadingWalletCurrenciesType: action.payload
      };
      break;
    case WALLETS.SET_CONNECTED_STATUS:
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
