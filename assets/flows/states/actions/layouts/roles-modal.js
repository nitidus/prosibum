import { LAYOUTS } from '../../types/index';
const { ROLES_MODAL } = LAYOUTS;

import { Layouts as LayoutsCMD } from '../../commands';
const CMD = LayoutsCMD.RolesModal;

const mapStateToProps = (state) => {
  return {
    rolesModal: state.RolesModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setReference: (data) => {
      dispatch({
        type: ROLES_MODAL.SET_REFERENCE,
        payload: data
      })
    },
    setRolesItems: (data) => {
      dispatch({
        type: ROLES_MODAL.SET_ROLES,
        payload: data
      })
    },
    setCurrentRole: (currentRole) => {
      dispatch({
        type: ROLES_MODAL.SET_CURRENT_ROLE,
        payload: currentRole
      })
    },
    setEmail: (token) => {
      dispatch({
        type: ROLES_MODAL.SET_EMAIL,
        payload: token
      })
    },
    fetchAvailableRolesType: async (groupType, usergroup) => CMD._getRolesTypeWithGroupType(groupType, usergroup, dispatch),
    fetchCardinal: async (token) => CMD._fetchAvailableCardinalUsingID(token, dispatch),
    appendRolesToResource: async (rolesRules, callback) => CMD._appendRolesToResourceWithRules(rolesRules, callback, dispatch),
    setAppendRolesToResourcesLoadingStatus: (loadingStatus) => {
      dispatch({
        type: ROLES_MODAL.SET_APPEND_ROLES_TO_RESOURCE_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const RolesModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = RolesModal;
