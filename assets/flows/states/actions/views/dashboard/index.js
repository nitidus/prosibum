import { VIEWS } from '../../../types/index';
const { SELF } = VIEWS.DASHBOARD;

import { Views as ViewsCMD } from '../../../commands';
const CMD = ViewsCMD.Dashboard.Self;

const mapStateToProps = (state) => {
  return {
    dashboard: state.Dashboard
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUserOverallDetail: async () => CMD._getCurrentUserOverallDetail(dispatch),
    setOverallDetailLoadingStatus: (loadingStatus) => {
      dispatch({
        type: WALLETS.SET_OVERALL_DETAIL_LOADING_STATUS,
        payload: loadingStatus
      })
    }
  };
}

const Dashboard = {
  mapStateToProps,
  mapDispatchToProps
};

module.exports = Dashboard;
