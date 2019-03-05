import { VIEWS } from '../../../types/index';
const { WALLETS } = VIEWS.DASHBOARD;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Profile.Wallets;

const mapStateToProps = (state) => {
  return {
    wallets: state.Wallets
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPilotCurrentTab: (pilotCurrentTab) => {
      dispatch({
        type: WALLETS.SET_PILOT_CURRENT_TAB,
        payload: pilotCurrentTab
      })
    },
    setPilotTabs: (pilotTabs) => {
      dispatch({
        type: WALLETS.SET_PILOT_TABS,
        payload: pilotTabs
      })
    },
    setSelectedWallet: (wallet) => {
      dispatch({
        type: WALLETS.SET_SELECTED_WALLET,
        payload: wallet
      })
    },
    setWalletModalVisibility: (visibilityStatus) => {
      dispatch({
        type: WALLETS.SET_WALLET_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    fetchAvailableWallets: async (currency, usergroup) => CMD._getWalletsWithUsergroup(currency, usergroup, dispatch),
    fetchAvailableWalletCurrenciesType: async () => CMD._getWalletsTypeWithCurrenciesType(dispatch),
    setWalletsLoadingStatus: (loadingStatus) => {
      dispatch({
        type: WALLETS.SET_WALLETS_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setwalletCurrenciesTypeLoadingStatus: (loadingStatus) => {
      dispatch({
        type: WALLETS.SET_WALLET_CURRENCIES_TYPE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const Wallets = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Wallets;
