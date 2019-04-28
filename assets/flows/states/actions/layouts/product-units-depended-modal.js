import { LAYOUTS } from '../../types/index';
const { PRODUCT_UNITS_DEPENDED_MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    productUnitsDependedModal: state.ProductUnitsDependedModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: PRODUCT_UNITS_DEPENDED_MODAL.RESET_MODAL
      })
    },
    setSelectedUnit: (unit) => {
      dispatch({
        type: PRODUCT_UNITS_DEPENDED_MODAL.SET_SELECTED_UNIT,
        payload: unit
      })
    },
    setUnits: (units) => {
      dispatch({
        type: PRODUCT_UNITS_DEPENDED_MODAL.SET_UNITS,
        payload: units
      })
    }
  };
}

const ProductUnitsDependedModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ProductUnitsDependedModal;
