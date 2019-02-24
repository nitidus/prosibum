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
    setWalletInitialCreditAmount: (creditAmount) => {
      dispatch({
        type: WALLET_MODAL.SET_WALLET_INITIAL_CREDIT_AMOUNT,
        payload: creditAmount
      })
    },
    setWalletCurrentInitialCreditPlan: (plan) => {
      dispatch({
        type: WALLET_MODAL.SET_WALLET_CURRENT_INITIAL_CREDIT_PLAN,
        payload: plan
      })
    },
    fetchWalletInitialCreditPlans: async (currencyType) => CMD._getWalletInitialCreditPlansUsingCurrencyType(currencyType, dispatch),
    appendWalletToResource: async (walletRules, callback) => CMD._appendWalletToResourceWithRules(walletRules, callback, dispatch),
    setCreditCardNumber: (number) => {
      dispatch({
        type: WALLET_MODAL.SET_CARD_NUMBER,
        payload: number
      })
    },
    setCreditCardExpirationDate: (expirationDate) => {
      dispatch({
        type: WALLET_MODAL.SET_CARD_EXPIRATION_DATE,
        payload: expirationDate
      })
    },
    setCreditCardExpirationMonth: (month) => {
      dispatch({
        type: WALLET_MODAL.SET_CARD_EXPIRATION_DATE_MONTH,
        payload: month
      })
    },
    setCreditCardExpirationYear: (year) => {
      dispatch({
        type: WALLET_MODAL.SET_CARD_EXPIRATION_DATE_YEAR,
        payload: year
      })
    },
    setCreditCardCVV: (cvv) => {
      dispatch({
        type: WALLET_MODAL.SET_CARD_CVV,
        payload: cvv
      })
    },
    setWalletInitialCreditPlansLoadingStatus: (loadingStatus) => {
      dispatch({
        type: WALLET_MODAL.SET_FETCH_WALLET_INITIAL_CREDIT_PLANS_LOADING_STATUS,
        payload: loadingStatus
      })
    },
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
