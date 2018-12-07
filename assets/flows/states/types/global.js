import { Platform } from 'react-native';

const __LOCALHOST = (Platform.OS === 'ios')? 'localhost': '192.168.0.103',
      GLOBAL = {
        TARGET: 'Wholesaler',
        URLS: {
          INTERFAS: {
            HOST_NAME: `http://${__LOCALHOST}:16374`
          }
        },
        STORAGE: {
          AUTH: 'AUTH/TOKEN',
          SUBSCRIBE_DEPEND_ON_PHONE_NUMBER: 'SUBSCRIBE/TOKEN/LISTENING_ON_VERIFY_PHONE_NUMBER'
        }
      };

module.exports = GLOBAL;
