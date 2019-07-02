import ENV from 'react-native-config';

import { Platform } from 'react-native';

const __API_HOST = (Platform.OS === 'ios')? 'http://localhost': 'http://192.168.0.105',
      __API_PORT = 16374,
      __API_VERSION = 'v1',
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
          SUBSCRIBE_TOKEN: 'SUBSCRIBE/TOKEN',
          FRAGMENT_DRAFT: 'FRAGMENT/DRAFT'
        }
      };

module.exports = GLOBAL;
