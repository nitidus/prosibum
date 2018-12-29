import { Platform } from 'react-native';

const __API_HOST = (Platform.OS === 'ios')? 'localhost': '192.168.0.104',
      __API_PORT = 16374,
      GLOBAL = {
        TARGET: 'Wholesaler',
        URLS: {
          INTERFAS: {
            HOST_NAME: `http://${__API_HOST}:${__API_PORT}`
          }
        },
        STORAGE: {
          AUTH: 'AUTH/TOKEN',
          SUBSCRIBE_DEPEND_ON_PHONE_NUMBER: 'SUBSCRIBE/TOKEN/LISTENING_ON_VERIFY_PHONE_NUMBER'
        }
      };

module.exports = GLOBAL;
