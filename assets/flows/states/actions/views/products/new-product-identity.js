import { VIEWS } from '../../../types/index';
const { NEW_PRODUCT_IDENTITY } = VIEWS.PRODUCTS;

const mapStateToProps = (state) => {
  return {
    newProductIdentity: state.NewProductIdentity
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProductName: (name) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.SET_PRODUCT_NAME,
        payload: name
      })
    },
    setCurrentWarehouse: (warehouse) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.SET_CURRENT_WAREHOUSE,
        payload: warehouse
      })
    },
    setWarehouses: (warehouses) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.SET_WAREHOUSES,
        payload: warehouses
      })
    },
    appendWarehouse: (warehouse) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.APPEND_WAREHOUSE,
        payload: warehouse
      })
    },
    fetchAvailableWarehouses: async () =>  CMD._getAvailableWarehousesWithToken(token, dispatch),
    setProductFeatures: (features) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.SET_PRODUCT_FEATURES,
        payload: features
      })
    },
    appendProductFeature: (feature) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.APPEND_PRODUCT_FEATURE,
        payload: feature
      })
    },
    setWarehousesLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT_IDENTITY.SET_WAREHOUSES_LOADING_STATUS,
        payload: status
      })
    }
  };
}

const NewProductIdentity = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = NewProductIdentity;
