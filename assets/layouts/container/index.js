/*** Layouts ***/

//Pilot
import { TopBar, PinnedSide, TabItem } from './layouts/pilot/top-bar'

/*** Views ***/

//Profile
import { DashboardContainer } from './views/profile/dashboard-container';
import { ProfileContainer } from './views/profile/profile-container';

module.exports = {
  Layouts: {
    Pilot: {
      TopBar,
      PinnedSide,
      TabItem
    }
  },
  Views: {
    Profile: {
      DashboardContainer,
      ProfileContainer
    }
  }
};
