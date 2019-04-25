import { LAYOUTS } from '../../types/index';
const { ROLE_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.RoleModal;

const mapStateToProps = (state) => {
  return {
    roleModal: state.RoleModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetModal: () => {
      dispatch({
        type: ROLE_MODAL.RESET_MODAL
      })
    },
    setReference: (data) => {
      dispatch({
        type: ROLE_MODAL.SET_REFERENCE,
        payload: data
      })
    },
    setRolesItems: (data) => {
      dispatch({
        type: ROLE_MODAL.SET_ROLES,
        payload: data
      })
    },
    setCurrentRole: (currentRole) => {
      dispatch({
        type: ROLE_MODAL.SET_CURRENT_ROLE,
        payload: currentRole
      })
    },
    setEmail: (email) => {
      dispatch({
        type: ROLE_MODAL.SET_EMAIL,
        payload: email
      })
    },
    fetchAvailableRolesType: async (groupType, usergroup) => CMD._getRolesTypeWithGroupType(groupType, usergroup, dispatch),
    fetchCardinal: async (token) => CMD._fetchAvailableCardinalUsingID(token, dispatch),
    appendRolesToResource: async (rolesRules, callback) => CMD._appendRolesToResourceWithRules(rolesRules, callback, dispatch),
    setAppendRolesToResourcesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: ROLE_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const RoleModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = RoleModal;
