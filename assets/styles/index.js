import Global from './global';

/*** Views ***/

//Authentication
import Login from './views/authentication/login';
import Signup from './views/authentication/signup';
import ForgottenPassword from './views/authentication/forgotten-password';
import VerifyPhoneNumber from './views/authentication/verify-phone-number';
import VerifyEmail from './views/authentication/verify-email';

//Profile
import Overseer from './views/profile/overseer';
import Profile from './views/profile';
  //Technical Profile
  import Roles from './views/profile/account/technical/roles';
    //Roles Subsets
    import SelectedRole from './views/profile/account/technical/roles/selected-role';

//Dashboard
import Dashboard from './views/dashboard';
import Wallets from './views/dashboard/wallets';
  //Wallets Subsets
  import SelectedWallet from './views/dashboard/wallets/selected-wallet';

//Products

  //New Product
  import NewProduct from './views/products/new-product';

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
      VerifyPhoneNumber,
      VerifyEmail
    },
    Profile: {
      Technical: {
        RolesSubsets: {
          SelectedRole
        },
        Roles
      },
      Overseer,
      Self: Profile
    },
    Dashboard: {
      WalletsSubsets: {
        SelectedWallet
      },
      Wallets,
      Self: Dashboard
    },
    Products: {
      NewProduct
    }
  },
  Modules: {
    Components,
    Layouts
  }
};
