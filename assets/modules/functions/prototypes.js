import { AsyncStorage, CameraRoll, PermissionsAndroid, Platform } from 'react-native';
import Lodash from 'lodash';

import { countries as __COUNTRIES } from '../../flows/knowledge/index';
import { name as __APP_NAME } from '../../../app.json';

module.exports = {
  _convertDigitsToEnglish: (digits) => {
    return digits.replace(/[\u0660-\u0669]/g, function (c) {
        return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function (c) {
       return c.charCodeAt(0) - 0x06f0;
   });
  },
  _convertDigitsToPersian: (digits) => {
    return digits.replace(/[0-9]/g, function (c) {
        return String.fromCharCode(c.charCodeAt(0) + 0x0630);
    });
  },
  _convertGregorianToJalali: (gy, gm, gd) => {
   g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

   if (gy > 1600){
    jy = 979;
    gy -= 1600;
   }else{
    jy = 0;
    gy -= 621;
   }

   gy2 = (gm > 2)? (gy + 1): gy;
   days = (365*gy) + (parseInt((gy2+3)/4)) - (parseInt((gy2 + 99) / 100)) +(parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
   jy += 33 * (parseInt(days / 12053));
   days %= 12053;
   jy += 4 * (parseInt(days / 1461));
   days %= 1461;

   if (days > 365){
    jy += parseInt((days - 1) / 365);
    days = (days - 1) % 365;
   }

   jm = (days < 186)? 1 + parseInt(days/31): 7 + parseInt((days - 186) / 30);
   jd = 1 + ((days < 186)? (days % 31): ((days - 186) % 30));

   return {
     year: jy,
     month: jm,
     day: jd
   };
 },
 _convertJalaliToGregorian: (jy, jm, jd) => {
   if (jy > 979){
    gy = 1600;
    jy -= 979;
   }else{
    gy = 621;
   }

   days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7)? (jm - 1) * 31: ((jm - 7) * 30) + 186);
   gy += 400 * (parseInt(days / 146097));
   days %= 146097;

   if (days > 36524){
    gy += 100 * (parseInt(--days / 36524));
    days %= 36524;

    if (days >= 365) days++;
   }

   gy += 4 * (parseInt(days / 1461));
   days %= 1461;

   if (days > 365){
    gy += parseInt((days - 1) / 365);
    days = (days - 1) % 365;
   }

   gd = days + 1;
   sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0))? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

   for (gm = 0; gm < 13; gm++){
    v = sal_a[gm];

    if (gd <= v) break;

    gd -= v;
   }

   return (new Date(gy + '/' + gm + '/' + gd));
 },
 _convertDigitsToMoneyFormat: (n, c, d, t) => {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  },
  _convertKeywordToToken: (keyword) => {
    return keyword.toLowerCase().replace(/(_|-| )/ig, ' ').replace(/\b\w/ig, char => char.toUpperCase());
  },
  _convertTokenToKeyword: (token) => {
    return token.replace(/(_|-| )+/ig, '-').toLowerCase();
  },
  _convertTokenToIconName: (token) => {
    return token.replace(/(_|-| )+/ig, '_').toUpperCase();
  },
  _generateNewUniqueObjectKey: (seedKey) => {
    const _TODAY = new Date(),
          _TODAY_IN_TIME_FORMAT = Lodash.shuffle(_TODAY.getTime().toString(16)).reduce((totalChars, char) => {
            return `${totalChars}${char}`;
          }),
          _RANDOM_TOKEN = Lodash.shuffle((Math.floor((Math.random() * 999999999999) + 100000000000)).toString(16)).reduce((totalChars, char) => {
            return `${totalChars}${char}`;
          }),
          _TIME_LIMITED_RANDOM_TOKEN = `${_TODAY_IN_TIME_FORMAT}${_RANDOM_TOKEN}`,
          SECRET_SEED_KEY = `${(seedKey || '')}${_TIME_LIMITED_RANDOM_TOKEN}`;

    return `${_TIME_LIMITED_RANDOM_TOKEN}${SECRET_SEED_KEY}`;
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
    const _CODE = (code || "AF").toUpperCase();

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
  _chunkArray: (selectedArray, chunkSize) => {
    var index = 0,
        arrayLength = selectedArray.length,
        finalResult = [];

    for (i = 0; i < arrayLength; i += chunkSize) {
        var myChunk = selectedArray.slice(i, (i + chunkSize));

        finalResult.push(myChunk);
    }

    return finalResult;
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
  },
  _fetchPrivatelyLocalStoragePhotoWithOptions: async (options) => {
    const cameraRollPhotos = await CameraRoll.getPhotos(options);

    return cameraRollPhotos;
  },
  _retrieveLocalStoragePhotosWithOptions: async (options) => {
    var _CAMERA_ROLL_OPTIONS = {
        first: 20,
        mimeTypes: [
          'image/jpeg', 'image/png'
        ],
        assetType: 'Photos'
      };

    if (typeof options != 'undefined'){
      if (typeof options.first != 'undefined' && options.first > 0){
        _CAMERA_ROLL_OPTIONS.first = options.first;
      }

      if (typeof options.mimeTypes != 'undefined' && options.mimeTypes.length > 0){
        _CAMERA_ROLL_OPTIONS.mimeTypes = options.mimeTypes;
      }

      if (typeof options.assetType != 'undefined' && options.assetType != ''){
        _CAMERA_ROLL_OPTIONS.assetType = options.assetType;
      }
    }

    if (Platform.OS === 'ios'){
      _CAMERA_ROLL_OPTIONS.groupTypes = (typeof options != 'undefined')? options.groupTypes : 'All';

      const fetchedCameraRollPhotos = await module.exports._fetchPrivatelyLocalStoragePhotoWithOptions(_CAMERA_ROLL_OPTIONS);

      return fetchedCameraRollPhotos;
    }else if (Platform.OS === 'android'){
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': `${module.exports._convertKeywordToToken(__APP_NAME)} Read External Storage Permission`,
            'message': `${module.exports._convertKeywordToToken(__APP_NAME)} app needs access to your external storage.`
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const fetchedCameraRollPhotos = await module.exports._fetchPrivatelyLocalStoragePhotoWithOptions(_CAMERA_ROLL_OPTIONS);

          return fetchedCameraRollPhotos;
        }else{
          return false;
        }
      } catch (err) {
        throw err;
      }
    }
  }
};
