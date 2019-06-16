import { VIEWS } from '../../../../types/index';
const { SELECTED_WALLET } = VIEWS.DASHBOARD;

const initialState = {
        language: {},
        referenceWallet: {},
        transactions: [],
        loadingTransactions: false,
        connected: {
          status: true,
          content: ''
        }
      };

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_WALLET.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
      break;
    case SELECTED_WALLET.SET_REFERENCE_WALLET:
      return {
        ...state,
        referenceWallet: action.payload
      };
      break;
    case SELECTED_WALLET.FETCH_AVAILABLE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload
      };
      break;
    case SELECTED_WALLET.SET_TRANSACTIONS_LOADING_STATUS:
      return {
        ...state,
        loadingTransactions: action.payload
      };
      break;
    case SELECTED_WALLET.SET_CONNECTED_STATUS:
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
