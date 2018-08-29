import Global from './global';

/*** Views ***/

//Authentication
import Certification from './views/authentication/certification';

/*** Modules ***/

//Components
import Components from './modules/components';

module.exports = {
  Global: Global,
  Views: {
    Authentication: {
      Certification: Certification
    }
  },
  Modules: {
    Components: Components
  }
};
