import { LAYOUTS } from '../../types/index';
const { PRODUCT_CATEGORIES_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.ProductCategoriesModal;

const mapStateToProps = (state) => {
  return {
    productCategoriesModal: state.ProductCategoriesModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.RESET_MODAL
      })
    },
    setCurrentCategory: (category) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_PRODUCT_CATEGORY,
        payload: category
      })
    },
    fetchAvailableProductCategories: async () => CMD._getAvailableProductCategories(dispatch),
    setCategoriesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const ProductCategoriesModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = ProductCategoriesModal;
