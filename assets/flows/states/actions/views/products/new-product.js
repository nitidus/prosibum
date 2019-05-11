import { VIEWS } from '../../../types/index';
const { NEW_PRODUCT } = VIEWS.PRODUCTS;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Products.NewProduct;

const mapStateToProps = (state) => {
  return {
    newProduct: state.NewProduct
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: (language) => {
      dispatch({
        type: NEW_PRODUCT.SET_LANGUAGE,
        payload: language
      })
    },
    resetForms: () => {
      dispatch({
        type: NEW_PRODUCT.RESET_FORMS
      })
    },
    setName: (name) => {
      dispatch({
        type: NEW_PRODUCT.SET_NAME,
        payload: name
      })
    },
    setCategory: (category) => {
      dispatch({
        type: NEW_PRODUCT.SET_CATEGORY,
        payload: category
      })
    },
    setFeatures: (features) => {
      dispatch({
        type: NEW_PRODUCT.SET_FEATURES,
        payload: features
      })
    },
    appendFeature: (feature) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_FEATURE,
        payload: feature
      })
    },
    setPhotos: (photos) => {
      dispatch({
        type: NEW_PRODUCT.SET_PHOTOS,
        payload: photos
      })
    },
    appendPhoto: (photo) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PHOTO,
        payload: photo
      })
    },
    setPrimaryPhoto: (photo) => {
      dispatch({
        type: NEW_PRODUCT.SET_PRIMARY_PHOTO,
        payload: photo
      })
    },
    setOnFetchingModePhoto: (photo) => {
      dispatch({
        type: NEW_PRODUCT.SET_SELECTED_PHOTO_FETCHINNG_MODE_ON,
        payload: photo
      })
    },
    setCategoriesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_CATEGORIES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setFeaturesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_FEATURES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    setPhotoModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_PHOTO_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    appendProduct: async (product) =>  CMD._appendProductOnDemand(product, dispatch),
    setAppendProductLoadingStatus: (status) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_PRODUCT_LOADING_STATUS,
        payload: status
      })
    }
  };
}

const NewProduct = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = NewProduct;
