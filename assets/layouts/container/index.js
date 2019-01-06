/*** Layouts ***/

//Pilot
import { TopBar, PinnedSide, TabItem } from './layouts/pilot/top-bar'
import { TabBar, TabBarItem } from './layouts/pilot/tab-bar'

/*** Views ***/

//Profile
import { OverseerContainer } from './views/profile/overseer-container';
import { ProfileContainer } from './views/profile/profile-container';
import { RolesContainer } from './views/profile/roles-container'

module.exports = {
  Layouts: {
    Pilot: {
      TopBar,
      TabBar,
      PinnedSide,
      TabItem,
      TabBarItem
    }
  },
  Views: {
    Profile: {
      OverseerContainer,
      ProfileContainer,
      RolesContainer
    }
  }
};
