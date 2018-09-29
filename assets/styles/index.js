import Global from './global';

/*** Views ***/

//Authentication
import Login from './views/authentication/login';
import Signup from './views/authentication/signup';
import ForgottenPassword from './views/authentication/forgotten-password';
import VerifyPhoneNumber from './views/authentication/verify-phone-number';

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
    }
  },
  Modules: {
    Components,
    Layouts
  }
};
