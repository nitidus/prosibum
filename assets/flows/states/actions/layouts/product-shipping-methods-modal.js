import { LAYOUTS } from '../../types/index';
const { PRODUCT_SHIPPING_METHODS_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.ProductShippingMethodsModal;

const mapStateToProps = (state) => {
  return {
    productShippingMethodsModal: state.ProductShippingMethodsModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: PRODUCT_SHIPPING_METHODS_MODAL.RESET_MODAL
      })
    },
    setSelectedShippingMethod: (shippingMethod) => {
      dispatch({
        type: PRODUCT_SHIPPING_METHODS_MODAL.SET_SELECTED_SHIPPING_METHOD,
        payload: shippingMethod
      })
    },
    fetchAvailableProductShippingMethods: async () => CMD._getAvailableProductShippingMethods(dispatch),
    setShippingMethodsLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_SHIPPING_METHODS_MODAL.SET_FETCH_AVAILABLE_PRODUCT_SHIPPING_METHODS_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const ProductShippingMethodsModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ProductShippingMethodsModal;
