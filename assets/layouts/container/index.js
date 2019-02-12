/*** Layouts ***/

//Pilot
import { TopBar, PinnedSide, TabItem } from './layouts/pilot/top-bar'
import { TabBar, TabBarItem } from './layouts/pilot/tab-bar'

/*** Views ***/

//Profile
import { OverseerContainer } from './views/profile/overseer-container';
import { ProfileContainer } from './views/profile/profile-container';
import { WalletsContainer } from './views/profile/wallets-container';

//Technical Profile
import { RolesContainer } from './views/profile/technical/roles-container';

//Roles Subsets
import { SelectedRoleContainer } from './views/profile/technical/roles/selected-role-container';

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
      Technical: {
        Roles: {
          SelectedRoleContainer
        },
        RolesContainer
      },
      OverseerContainer,
      ProfileContainer,
      WalletsContainer
    }
  }
};
