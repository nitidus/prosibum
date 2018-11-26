import { VIEWS } from '../../../types/index';
const { BRAND_ROLES_SUBSETS } = VIEWS.PROFILE;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Profile.BrandRolesSubsets;

const mapStateToProps = (state) => {
  return {
    brandRolesSubsets: state.BrandRolesSubsets
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPilotCurrentTab: (pilotCurrentTab) => {
      dispatch({
        type: BRAND_ROLES_SUBSETS.SET_PILOT_CURRENT_TAB,
        payload: pilotCurrentTab
      })
    },
    setPilotTabs: (pilotTabs) => {
      dispatch({
        type: BRAND_ROLES_SUBSETS.SET_PILOT_TABS,
        payload: pilotTabs
      })
    },
    fetchAvailableBrandRoles: async (groupType) => CMD._getBrandRolesWithType(groupType, dispatch),
    setBrandRoleLoadingStatus: (loadingStatus) => {
      dispatch({
        type: BRAND_ROLES_SUBSETS.SET_BRAND_ROLE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const BrandRolesSubsets = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = BrandRolesSubsets;
