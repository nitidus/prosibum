import { VIEWS } from '../../../types/index';
const { SELECTED_ROLE } = VIEWS.PROFILE;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Profile.SelectedRole;

const mapStateToProps = (state) => {
  return {
    selectedRole: state.SelectedRole
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setRolesModalVisibility: (visibilityStatus) => {
      dispatch({
        type: SELECTED_ROLE.SET_ROLES_MODAL_VISIBILITY,
        payload: visibilityStatus
      })
    },
    fetchAvailableRoles: async (usergroup, reference) => CMD._getRolesWithUsergroup(usergroup, reference, dispatch),
    setRolesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: SELECTED_ROLE.SET_ROLES_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const SelectedRole = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = SelectedRole;
