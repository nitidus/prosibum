import { VIEWS } from '../../../types/index';
const { USER_PROFILE } = VIEWS.PROFILE;

const mapStateToProps = (state) => {
  return {
    userProfile: state.UserProfile
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPilotCurrentTab: (pilotCurrentTab) => {
      dispatch({
        type: USER_PROFILE.SET_PILOT_CURRENT_TAB,
        payload: pilotCurrentTab
      })
    },
    setPilotTabs: (pilotTabs) => {
      dispatch({
        type: USER_PROFILE.SET_PILOT_TABS,
        payload: pilotTabs
      })
    }
  };
}

const UserProfile = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = UserProfile;
