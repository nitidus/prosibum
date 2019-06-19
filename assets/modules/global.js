import ENV from 'react-native-config';

import { Platform } from 'react-native';

const __API_HOST = 'http://99.79.48.155'/*(Platform.OS === 'ios')? (ENV.APP_HOST_IOS || ENV.APP_HOST || 'http://localhost'): (ENV.APP_HOST_ANDROID || ENV.APP_HOST || 'http://192.168.0.105')*/,
      __API_PORT = 80/*ENV.APP_HOST_PORT || 16374*/,
      __API_VERSION = ENV.APP_API_VERSION || 'v1',
      GLOBAL = {
        TARGET: 'Wholesaler',
        URLS: {
          INTERFAS: {
            HOST_NAME: `${__API_HOST}:${__API_PORT}/api/${__API_VERSION}`,
            SOCKET_NAME: `${__API_HOST}:${__API_PORT}`
          }
        },
        STORAGE: {
          DEFAULT_NATIVE_SETTINGS: 'SETTINGS/DEFAULT_NATIVE',
          AUTH: 'AUTH/TOKEN',
          SUBSCRIBE_TOKEN: 'SUBSCRIBE/TOKEN'
        }
      };

module.exports = GLOBAL;
