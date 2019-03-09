import Global from './global';

/*** Views ***/

//Authentication
import Login from './views/authentication/login';
import Signup from './views/authentication/signup';
import ForgottenPassword from './views/authentication/forgotten-password';
import VerifyPhoneNumber from './views/authentication/verify-phone-number';

//Profile
import Overseer from './views/profile/overseer';
import Profile from './views/profile/profile';

import Wallets from './views/profile/wallets';
  //Wallets Subsets
  import SelectedWallet from './views/profile/profile/wallets/selected-wallet';

//Technical Profile
import Roles from './views/profile/profile/technical/roles';
  //Roles Subsets
  import SelectedRole from './views/profile/profile/technical/roles/selected-role';

import Dashboard from './views/profile/profile/dashboard';

/*** Modules ***/

//Components
import Components from './modules/components';
import Layouts from './modules/layouts';

module.exports = {
  Global: Global,
  Views: {
    Authentication: {
      Login,
      Signup,
      ForgottenPassword,
      VerifyPhoneNumber
    },
    Profile: {
      Technical: {
        RolesSubsets: {
          SelectedRole
        },
        Roles
      },
      WalletsSubsets: {
        SelectedWallet
      },
      Overseer,
      Profile,
      Wallets,
      Dashboard
    }
  },
  Modules: {
    Components,
    Layouts
  }
};
