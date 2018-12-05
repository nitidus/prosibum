import Global from './global';

/*** Views ***/

//Authentication
import Login from './views/authentication/login';
import Signup from './views/authentication/signup';
import ForgottenPassword from './views/authentication/forgotten-password';
import VerifyPhoneNumber from './views/authentication/verify-phone-number';

//Profile
import Dashboard from './views/profile/dashboard';
import Profile from './views/profile/profile';
import Roles from './views/profile/roles';

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
      Dashboard,
      Profile,
      Roles
    }
  },
  Modules: {
    Components,
    Layouts
  }
};
