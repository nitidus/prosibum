import Global from './global';

/*** Views ***/

//Authentication
import Login from './views/authentication/login';
import Signup from './views/authentication/signup';
import ForgottenPassword from './views/authentication/forgotten-password';

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
      ForgottenPassword
    }
  },
  Modules: {
    Components,
    Layouts
  }
};
