/*** Layouts ***/

//Pilot
import { TopBar, PinnedSide, TabItem } from './layouts/pilot/top-bar';
import { TabBar, TabBarItem } from './layouts/pilot/tab-bar';

//Other
import { Options } from './layouts/options';

/*** Views ***/

//Authentication
import { AuthenticationContainer } from './views/authentication-container';

//Profile
import { ProfileContainer } from './views/profile-container';
import { OverseerContainer } from './views/profile-container/overseer-container';
  //Technical Profile
  import { RolesContainer } from './views/profile-container/technical-container/roles-container';
    //Roles Subsets
    import { SelectedRoleContainer } from './views/profile-container/technical-container/roles-container/selected-role-container';

//Dashboard

import { WalletsContainer } from './views/dashboard-container/wallets-container';
  //Wallets Subsets
  import { SelectedWalletContainer } from './views/dashboard-container/wallets-container/selected-wallet-container';

//Products
import { NewProductContainer } from './views/products-container/new-product-container';
import { NewFragmentContainer } from './views/products-container/new-fragment-container';

module.exports = {
  Layouts: {
    Pilot: {
      TopBar,
      TabBar,
      PinnedSide,
      TabItem,
      TabBarItem
    },
    Options
  },
  Views: {
    Authentication: {
      AuthenticationContainer
    },
    Profile: {
      Technical: {
        Roles: {
          SelectedRoleContainer
        },
        RolesContainer
      },
      OverseerContainer,
      ProfileContainer
    },
    Dashboard: {
      Wallets: {
        SelectedWalletContainer
      },
      WalletsContainer
    },
    Products: {
      NewProductContainer,
      NewFragmentContainer
    }
  }
};
