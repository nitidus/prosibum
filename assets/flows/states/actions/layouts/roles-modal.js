import { LAYOUTS } from '../../types/index';
const { ROLES_MODAL } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    rolesModal: state.RolesModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
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
    setRoleCount: (roleCount) => {
      dispatch({
        type: ROLES_MODAL.SET_ROLES_COUNT,
        payload: roleCount
      })
    }
  };
}

const RolesModal = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = RolesModal;
