import { AsyncStorage } from 'react-native';

import { countries as __COUNTRIES } from '../flows/knowledge/index';
import { name as __APP_NAME } from '../../app.json';

module.exports = {
  _convertKeywordToToken: (keyword) => {
    return keyword.replace(/_/ig, ' ').replace(/\b\w/ig, char => char.toUpperCase());
  },
  _generateNewUniqueObjectKey: () => {
    const today = new Date(),
          randomToken = Math.floor((Math.random() * 999999999999) + 100000000000);

    return today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString();
  },
  _convertHexColorToRGBA: (hex, opacity) => {
      var c;

      opacity = (typeof opacity != 'undefined')? ((opacity >= 0 && opacity <= 1)? opacity: 1): 1;

      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c = hex.substring(1).split('');

          if (c.length == 3){
              c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }

          c= '0x' + c.join('');

          return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + opacity + ')';
      }
  },
  _checkIsAValidEmail: (email) => {
    const _IS_EMAIL_VALID = email.match(/[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);

    return (_IS_EMAIL_VALID !== null)? true: false;
  },
  _checkIsAValidPhoneNumber: (phoneNumber) => {
    const _IS_PHONE_NUMBER_VALID = phoneNumber.match(/^(?=.*\d)[0-9]{6,12}$/);

    return (_IS_PHONE_NUMBER_VALID !== null)? true: false;
  },
  _checkIsAValidPassword: (password) => {
    const _IS_PASSWORD_VALID = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\$%&#!~`\^*\(\)_\-\+\=\?><])[0-9a-zA-Z\$%&#!~`\^*\(\)_\-\+\=\?><]{8,}$/);

    return (_IS_PASSWORD_VALID !== null)? true: false;
  },
  _getCountryDetailWithCode: (code) => {
    const _CODE = (code || "IR").toUpperCase();

    return __COUNTRIES.find((country) => {
      if (country.code == _CODE){
        return country;
      }
    })
  },
  _generateNextOffset: (offset, limit) => {
    if (typeof offset == 'object'){
      return {
        from: offset.from + limit,
        to: (offset.from === 0)? offset.to + limit + 1: offset.to + limit
      };
    }else{
      return {
        from: offset,
        to: (offset === 0)? offset + limit + 1: offset + limit
      };
    }
  },
  _getRidOfZerosFromPhoneNumber: (phoneNumber) => {
    return phoneNumber.replace(/\b[0]+/, '');
  },
  _prepareSignupSeed: (inputProps) => {
    return {
      personal: {
        first_name: inputProps.firstName,
        last_name: inputProps.lastName
      },
      user_group_id: inputProps.userGroup._id,
      phone: {
        mobile: `${inputProps.phone.dialCode.area_code}${module.exports._getRidOfZerosFromPhoneNumber(inputProps.phone.number)}`
      },
      email: inputProps.email,
      password: inputProps.password
    };
  },
  _storeDataWithKey: async (key, value) => {
    try {
      await AsyncStorage.setItem(`@${__APP_NAME}:${key}`, value);

      return true;
    } catch (error) {
      //Error saving data
    }
  },
  _retrieveDataWithKey: async (key) => {
    try {
      const _DATA = await AsyncStorage.getItem(`@${__APP_NAME}:${key}`);

      if (_DATA !== null){
        return _DATA;
      }else{
        return false;
      }
    } catch (error) {
      //Error retrieving data
    }
  },
  _removeDataWithKey: async (key) => {
    try {
      await AsyncStorage.removeItem(`@${__APP_NAME}:${key}`);

      return true;
    } catch (error) {
      //Error retrieving data
    }
  },
  _retrieveAllKeys: async () => {
    try {
      const _KEYS = await AsyncStorage.getAllKeys();

      return _KEYS;
    } catch (error) {
      //Error retrieving all keys
    }
  }
};
