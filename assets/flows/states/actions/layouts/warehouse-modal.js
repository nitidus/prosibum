import { LAYOUTS } from '../../types/index';
const { WAREHOUSE_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.WarehouseModal;

const mapStateToProps = (state) => {
  return {
    warehouseModal: state.WarehouseModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: WAREHOUSE_MODAL.RESET_MODAL
      })
    },
    setWarehouseName: (name) => {
      dispatch({
        type: WAREHOUSE_MODAL.SET_WAREHOUSE_NAME,
        payload: name
      })
    },
    setAbsorbedWarehouse: (warehouse) => {
      dispatch({
        type: WAREHOUSE_MODAL.SET_ABSORBED_WAREHOUSE,
        payload: warehouse
      })
    },
    appendWalletToResource: async (warehouseRules, callback) => CMD._appendWarehouseToResourceWithRules(warehouseRules, callback, dispatch),
    setAppendWarehouseToResourceLoadingStatus: (loadingStatus) => {
      dispatch({
        type: WAREHOUSE_MODAL.SET_APPEND_WAREHOUSE_TO_RESOURCE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const WarehouseModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = WarehouseModal;
