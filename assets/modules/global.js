import { Platform } from 'react-native';

const __API_HOST = (Platform.OS === 'ios')? 'localhost': '192.168.0.105',
      __API_PORT = 16374,
      GLOBAL = {
        TARGET: 'Wholesaler',
        URLS: {
          INTERFAS: {
            HOST_NAME: `http://${__API_HOST}:${__API_PORT}` /*'http://99.79.48.155'*/
          }
        },
        STORAGE: {
          DEFAULT_NATIVE_SETTINGS: 'SETTINGS/DEFAULT_NATIVE',
          AUTH: 'AUTH/TOKEN',
          SUBSCRIBE_TOKEN: 'SUBSCRIBE/TOKEN'
        }
      };

module.exports = GLOBAL;
