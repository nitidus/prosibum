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
    setCurrentHiddenTabIndex: (index) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_CURRENT_HIDDEN_TAB_INDEX,
        payload: index
      })
    },
    setNewCategoryName: (categoryName) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_NEW_PRODUCT_CATEGORY_NAME,
        payload: categoryName
      })
    },
    setCurrentCategory: (category) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_PRODUCT_CATEGORY,
        payload: category
      })
    },
    fetchAvailableProductCategories: async () => CMD._getAvailableProductCategories(dispatch),
    appendCategory: async (token) => CMD._appendCategoryWithToken(token, dispatch),
    setIsAddingMode: (isAddingMode) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_IS_ADDING_MODE,
        payload: isAddingMode
      })
    },
    setCategoriesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.SET_FETCH_AVAILABLE_PRODUCT_CATEGORIES_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setAppendCategoryLoadingStatus: (loadingStatus) => {
      dispatch({
        type: PRODUCT_CATEGORIES_MODAL.APPEND_CATEGORY_LOADING_STATUS,
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
