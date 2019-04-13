import { LAYOUTS } from '../../types/index';
const { PRODUCT_UNIT_DEPENDED_MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    productUnitDependedModal: state.ProductUnitDependedModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: PRODUCT_UNIT_DEPENDED_MODAL.RESET_MODAL
      })
    },
    setSelectedUnit: (unit) => {
      dispatch({
        type: PRODUCT_UNIT_DEPENDED_MODAL.SET_SELECTED_UNIT,
        payload: unit
      })
    },
    setUnits: (units) => {
      dispatch({
        type: PRODUCT_UNIT_DEPENDED_MODAL.SET_UNITS,
        payload: units
      })
    }
  };
}

const ProductUnitDependedModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ProductUnitDependedModal;
