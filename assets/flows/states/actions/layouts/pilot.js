import { LAYOUTS } from '../../types/index';
const { PILOT } = LAYOUTS;

const mapStateToProps = (state) => {
  return {
    pilot: state.Pilot
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentTab: (tabName) => {
      dispatch({
        type: PILOT.SET_CURRENT_TAB,
        payload: tabName
      })
    },
    setTabs: (availableTabs) => {
      dispatch({
        type: PILOT.SET_TABS,
        payload: availableTabs
      })
    }
  };
}

const Pilot = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Pilot;
