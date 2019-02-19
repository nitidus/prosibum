import { LAYOUTS } from '../../types/index';
const { WALLET_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.WalletModal;

const mapStateToProps = (state) => {
  return {
    walletModal: state.WalletModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentHiddenTabIndex: (index) => {
      dispatch({
        type: WALLET_MODAL.SET_CURRENT_HIDDEN_TAB_INDEX,
        payload: index
      })
    },
    setCurrenciesItems: (data) => {
      dispatch({
        type: WALLET_MODAL.SET_CURRENCIES,
        payload: data
      })
    },
    setCurrentCurrency: (currentRole) => {
      dispatch({
        type: WALLET_MODAL.SET_CURRENT_CURRENCY,
        payload: currentRole
      })
    },
    setWalletName: (roleCount) => {
      dispatch({
        type: WALLET_MODAL.SET_WALLET_NAME,
        payload: roleCount
      })
    },
    appendWalletToResource: async (walletRules, callback) => CMD._appendWalletToResourceWithRules(walletRules, callback, dispatch),
    setAppendWalletToResourcesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: WALLET_MODAL.SET_APPEND_WALLET_TO_RESOURCE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const WalletModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = WalletModal;
