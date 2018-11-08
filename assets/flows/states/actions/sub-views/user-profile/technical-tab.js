import { SUB_VIEWS } from '../../../types/index';
const { TECHNICAL_TAB } = SUB_VIEWS.USER_PROFILE;

import { SubViews as SubViewsCMD } from '../../../commands';
const CMD = SubViewsCMD.UserProfile.TechnicalTab;

const mapStateToProps = (state) => {
  return {
    technicalTab: state.TechnicalTab
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBrandName: (brandName) => {
      dispatch({
        type: TECHNICAL_TAB.SET_BRAND_NAME,
        payload: brandName
      })
    },
    setBrandProfilePhoto: (profilePhoto) => {
      dispatch({
        type: TECHNICAL_TAB.SET_BRAND_PROFILE_PHOTO,
        payload: profilePhoto
      })
    },
    setBrandRole: (role) => {
      dispatch({
        type: TECHNICAL_TAB.SET_BRAND_ROLE,
        payload: role
      })
    },
    setLoadingStatus: (loadingStatus) => {
      dispatch({
        type: TECHNICAL_TAB.SET_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    editUserTechnicalData: async (userDetail) => CMD._updateUserTechnicalData(userDetail, dispatch)
  };
}

const TechnicalTab = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = TechnicalTab;
