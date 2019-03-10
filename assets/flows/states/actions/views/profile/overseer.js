import { VIEWS } from '../../../types/index';
const { OVERSEER } = VIEWS.PROFILE;

const mapStateToProps = (state) => {
  return {
    overseer: state.Overseer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTopPilotCurrentTab: (pilotCurrentTab) => {
      dispatch({
        type: OVERSEER.SET_TOP_PILOT_BAR_CURRENT_TAB,
        payload: pilotCurrentTab
      })
    },
    setTopPilotTabs: (pilotTabs) => {
      dispatch({
        type: OVERSEER.SET_TOP_PILOT_BAR_TABS,
        payload: pilotTabs
      })
    },
    setBottomPilotCurrentTab: (pilotCurrentTab) => {
      dispatch({
        type: OVERSEER.SET_BOTTOM_PILOT_TAB_BAR_CURRENT_TAB,
        payload: pilotCurrentTab
      })
    },
    setBottomPilotTabs: (pilotTabs) => {
      dispatch({
        type: OVERSEER.SET_BOTTOM_PILOT_TAB_BAR_TABS,
        payload: pilotTabs
      })
    }
  };
}

const Overseer = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Overseer;
