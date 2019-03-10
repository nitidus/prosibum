import { VIEWS } from '../../../../types/index';
const { SELECTED_WALLET } = VIEWS.DASHBOARD;

import { Views as ViewsCMD } from '../../../../commands';
const CMD = ViewsCMD.Dashboard.SelectedWallet;

const mapStateToProps = (state) => {
  return {
    selectedWallet: state.SelectedWallet
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReferenceWallet: (wallet) => {
      dispatch({
        type: SELECTED_WALLET.SET_REFERENCE_WALLET,
        payload: wallet
      })
    },
    fetchTransactions: async (token) => CMD._getTransactionsWithWalletToken(token, dispatch),
    setTransactionsLoadingStatus: (loadingStatus) => {
      dispatch({
        type: SELECTED_WALLET.SET_TRANSACTIONS_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const SelectedWallet = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = SelectedWallet;
