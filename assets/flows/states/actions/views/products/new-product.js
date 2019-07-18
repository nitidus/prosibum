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
    setCategory: (category) => {
      dispatch({
        type: NEW_PRODUCT.SET_CATEGORY,
        payload: category
      })
    },
    setName: (name) => {
      dispatch({
        type: NEW_PRODUCT.SET_NAME,
        payload: name
      })
    },
    setInprocessTag: (tag) => {
      dispatch({
        type: NEW_PRODUCT.SET_INPROCESS_TAG,
        payload: tag
      })
    },
    setTags: (tags) => {
      dispatch({
        type: NEW_PRODUCT.SET_TAGS,
        payload: tags
      })
    },
    appendTag: (tag) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_TAG,
        payload: tag
      })
    },
    setInventoryUnits: (units) => {
      dispatch({
        type: NEW_PRODUCT.SET_INVENTORY_UNITS,
        payload: units
      })
    },
    appendInvenntoryUnit: (unit) => {
      dispatch({
        type: NEW_PRODUCT.APPEND_INVENTORY_UNIT,
        payload: unit
      })
    },
    setDescription: (description) => {
      dispatch({
        type: NEW_PRODUCT.SET_DESCRIPTION,
        payload: description
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
    setUnitsModalVisibility: (visibilityStatus) => {
      dispatch({
        type: NEW_PRODUCT.SET_UNITS_MODAL_VISIBILITY,
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
