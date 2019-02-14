import { VIEWS } from '../../../types/index';
const { ROLES } = VIEWS.PROFILE;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Profile.Roles;

const mapStateToProps = (state) => {
  return {
    roles: state.Roles
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPilotCurrentTab: (pilotCurrentTab) => {
      dispatch({
        type: ROLES.SET_PILOT_CURRENT_TAB,
        payload: pilotCurrentTab
      })
    },
    setPilotTabs: (pilotTabs) => {
      dispatch({
        type: ROLES.SET_PILOT_TABS,
        payload: pilotTabs
      })
    },
    fetchAvailableRoles: async (usergroup, reference) => CMD._getRolesWithUsergroup(usergroup, reference, dispatch),
    fetchAvailableRolesType: async (groupType, usergroup) => CMD._getRolesTypeWithGroupType(groupType, usergroup, dispatch),
    setRolesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: ROLES.SET_ROLES_LOADING_STATUS,
        payload: loadingStatus
      })
    },
    setRolesTypeLoadingStatus: (loadingStatus) => {
      dispatch({
        type: ROLES.SET_ROLES_TYPE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const Roles = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Roles;
