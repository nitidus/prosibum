/*** Layouts ***/

//Pilot
import { TopBar, PinnedSide, TabItem } from './layouts/pilot/top-bar'

/*** Views ***/

//Profile
import { DashboardContainer } from './views/profile/dashboard-container';
import { ProfileContainer } from './views/profile/profile-container';
import { RolesContainer } from './views/profile/roles-container'

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
      ProfileContainer,
      RolesContainer
    }
  }
};
