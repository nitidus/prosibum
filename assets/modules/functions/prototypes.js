import { AsyncStorage, CameraRoll, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import Lodash from 'lodash';
import Moment from 'moment';

import Utils from '../utils';
const { ObjectID } = Utils.Structures;

import { countries as __COUNTRIES, views_constants as __VIEWS_CONSTANTS } from '../../flows/knowledge/index';
const __WALLETS = __VIEWS_CONSTANTS.dashboard.wallets;

import { name as __APP_NAME } from '../../../app.json';

module.exports = {
  _convertDigitsToEnglish: (digits) => {
    return digits.replace(/[\u0660-\u0669]/g, function(c) {
      return c.charCodeAt(0) - 0x0660;
    }).replace(/[\u06f0-\u06f9]/g, function(c) {
      return c.charCodeAt(0) - 0x06f0;
    });
  },
  _convertDigitsToPersian: (digits) => {
    return digits.replace(/[0-9]/g, function(c) {
      return String.fromCharCode(c.charCodeAt(0) + 0x0630);
    });
  },
  _convertGregorianToJalali: (gy, gm, gd) => {
    g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

    if (gy > 1600) {
      jy = 979;
      gy -= 1600;
    } else {
      jy = 0;
      gy -= 621;
    }

    gy2 = (gm > 2) ? (gy + 1) : gy;
    days = (365 * gy) + (parseInt((gy2 + 3) / 4)) - (parseInt((gy2 + 99) / 100)) + (parseInt((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (parseInt(days / 12053));
    days %= 12053;
    jy += 4 * (parseInt(days / 1461));
    days %= 1461;

    if (days > 365) {
      jy += parseInt((days - 1) / 365);
      days = (days - 1) % 365;
    }

    jm = (days < 186) ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30);
    jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));

    return {
      year: jy,
      month: jm,
      day: jd
    };
  },
  _convertJalaliToGregorian: (jy, jm, jd) => {
    if (jy > 979) {
      gy = 1600;
      jy -= 979;
    } else {
      gy = 621;
    }

    days = (365 * jy) + ((parseInt(jy / 33)) * 8) + (parseInt(((jy % 33) + 3) / 4)) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * (parseInt(days / 146097));
    days %= 146097;

    if (days > 36524) {
      gy += 100 * (parseInt(--days / 36524));
      days %= 36524;

      if (days >= 365) days++;
    }

    gy += 4 * (parseInt(days / 1461));
    days %= 1461;

    if (days > 365) {
      gy += parseInt((days - 1) / 365);
      days = (days - 1) % 365;
    }

    gd = days + 1;
    sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    for (gm = 0; gm < 13; gm++) {
      v = sal_a[gm];

      if (gd <= v) break;

      gd -= v;
    }

    return (new Date(gy + '/' + gm + '/' + gd));
  },
  _jalali33YearsRule: () => {
    return [ -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178 ];
  },
  _mod: (a, b) => {
    return a - ~~(a / b) * b;
  },
  _isJalaliLeapYear: (jy) => {
    var breaks = module.exports._jalali33YearsRule(),
        bl = breaks.length,
        jp = breaks[0],
        jm, jump, leap, n, i;

    if (jy < jp || jy >= breaks[bl - 1]){
      throw new Error('Invalid Jalaali year ' + jy)
    }

    for (i = 1; i < bl; i += 1) {
      jm = breaks[i];
      jump = jm - jp;

      if (jy < jm){
        break
      }

      jp = jm;
    }

    n = jy - jp;

    if (jump - n < 6){
      n = n - jump + div(jump + 4, 33) * 33
    }

    leap = module.exports._mod(module.exports._mod(n + 1, 33) - 1, 4);

    if (leap === -1) {
      leap = 4
    }

    return (leap === 0);
  },
  _isGregorianLeapYear: (year) => {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  },
  _createYearArrayFromToday: () => {
    const _TODAY = new Date(),
          _THIS_YEAR = _TODAY.getFullYear();

    return Lodash.range((_THIS_YEAR - 1), ((_THIS_YEAR + 1) + 30));
  },
  _createMonthArrayFromNumber: (number) => {
    if (!isNaN(number)){
      return Lodash.range(1, number + 1);
    }else{
      throw new Error('You should define a numerical value.')
    }
  },
  _convertDateToHumanReadableFormat: (isoDate) => {
    if (typeof isoDate == 'string'){
      return Moment(isoDate).fromNow();
    }else{
      throw new Error("You should define the date as ISO date in string format.");
    }
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
  _convertTokenToKey: (token) => {
    return token.replace(/(_|-| )+/ig, '_').toUpperCase();
  },
  _convertTokenToIconName: (token) => {
    return module.exports._convertTokenToKey(token);
  },
  _convertKeywordToBlockToken: (keyword) => {
    return module.exports._convertKeywordToToken(keyword).replace(/ /ig, '');
  },
  _convertTokenToCreditCard: (token) => {
    const _TOKEN = (!isNaN(token)) ? token.toString() : token,
      _ESCAPED_TOKEN = token.replace(/\s+/g, '').replace(/[^0-9]/gi, ''),
      _MATCHES = _ESCAPED_TOKEN.match(/\d{4,16}/g),
      _MATCH = _MATCHES && _MATCHES[0] || '';

    var _PARTS = [];

    for (var i = 0; i < _MATCH.length; i += 4) {
      _PARTS.push(_MATCH.substring(i, i + 4));
    }

    if (_PARTS.length) {
      return _PARTS.join(' ');
    } else {
      return token;
    }
  },
  _convertNestedArrayToFlattenDeep: (content) => {
    return Lodash.flattenDeep(content);
  },
  _stripLongString: (longString, targetLength) => {
    if ((typeof longString === 'string') && (typeof longString !== 'undefined') && (typeof targetLength === 'number') && (typeof targetLength !== 'undefined')) {
      return (longString.length > targetLength) ? `${longString.substr(0, targetLength)}...` : longString;
    } else {
      throw new Error('Define the first parameter as a string and second as a number.');
    }
  },
  _returnCurrencyDependOnLanguage: (currency) => {
    if (typeof currency != 'undefined' && currency != '') {
      const _CURRENCY_TYPE_KEY = module.exports._convertTokenToKey(currency);

      const _PILOT_TABS_TITLE = __WALLETS.pilot.content.map((item, j) => {
          return item.title;
        }),
        _FOUNDED_TAB_NAME_INDEX = _PILOT_TABS_TITLE.findIndex((item) => {
          return (_CURRENCY_TYPE_KEY === module.exports._convertTokenToKey(item.en));
        });

      if (_FOUNDED_TAB_NAME_INDEX > -1) {
        return _PILOT_TABS_TITLE[_FOUNDED_TAB_NAME_INDEX].en;
      } else {
        return module.exports._convertKeywordToToken(currency);
      }
    }
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
  _generateNewBSONObjectID: () => {
    const _OBJECT_ID_INSTANCE = new ObjectID();

    return _OBJECT_ID_INSTANCE.toHexString();
  },
  _convertHexColorToRGBA: (hex, opacity) => {
    var c;

    opacity = (typeof opacity != 'undefined') ? ((opacity >= 0 && opacity <= 1) ? opacity : 1) : 1;

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');

      if (c.length == 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }

      c = '0x' + c.join('');

      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + opacity + ')';
    }
  },
  _refactorColor: (col, amt) => {
    var usePound = false;

    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }

    var num = parseInt(col, 16),
        r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
  },
  _checkIsAValidNumericOnlyField: (content, targetLength) => {
    const _TARGET_LENGTH = targetLength || 16,
          _TARGET_REGEX = new RegExp(`^[0-9]{${_TARGET_LENGTH},}$`, 'g'),
          _IS_TEXT_ONLY_VALID = content.match(_TARGET_REGEX);

    return (_IS_TEXT_ONLY_VALID !== null) ? true : false;
  },
  _checkIsAValidCurrencyValueOnlyField: (content, targetLength) => {
    const _TARGET_REGEX = new RegExp(`^[0-9]+(\.[0-9]{1,2})?$`, 'g'),
          _IS_TEXT_ONLY_VALID = content.match(_TARGET_REGEX);

    return (_IS_TEXT_ONLY_VALID !== null) ? true : false;
  },
  _checkIsAValidTextOnlyField: (content, targetLength) => {
    const _TARGET_LENGTH = targetLength || 16,
          _TARGET_REGEX = new RegExp(`^[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC ]{${_TARGET_LENGTH},}$`, 'g'),
          _IS_TEXT_ONLY_VALID = content.match(_TARGET_REGEX);

    return (_IS_TEXT_ONLY_VALID !== null) ? true : false;
  },
  _checkIsAValidEmail: (email) => {
    const _IS_EMAIL_VALID = email.match(/[a-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);

    return (_IS_EMAIL_VALID !== null) ? true : false;
  },
  _checkIsAValidPhoneNumber: (phoneNumber) => {
    const _IS_PHONE_NUMBER_VALID = phoneNumber.match(/^\+?[0-9]{1,4}[0-9]{9,14}$/);

    return (_IS_PHONE_NUMBER_VALID !== null) ? true : false;
  },
  _checkIsAValidPhoneNumberOrEmail: (token) => {
    return (token.match(/^\+?[0-9]{1,4}[0-9]{10,14}/) !== null) ? true : false;
  },
  _checkIsAValidToken: (token) => {
    if (module.exports._checkIsAValidPhoneNumberOrEmail(token)) {
      return module.exports._checkIsAValidPhoneNumber(token);
    } else {
      return module.exports._checkIsAValidEmail(token);
    }
  },
  _convertNumberToHumanReadableFormat: (targetNumber) => {
    if (typeof targetNumber != 'string'){
      targetNumber = targetNumber.toString();
    }

    return targetNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },
  _checkIsAValidPassword: (password) => {
    const _IS_PASSWORD_VALID = password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\$%&#!~`\^*\(\)_\-\+\=\?><])[0-9a-zA-Z\$%&#!~`\^*\(\)_\-\+\=\?><]{8,}$/);

    return (_IS_PASSWORD_VALID !== null) ? true : false;
  },
  _checkIsAValidCreditCardNumber: (creditCardNumber) => {
    return (creditCardNumber.match(/^[0-9]{16}$/) !== null) ? true : false;
  },
  _checkIsAValidCreditCardExpirationDate: (creditCardMonth, creditCardYear) => {
    return ((creditCardMonth.match(/^[0-9]{1,2}$/) !== null) && (creditCardYear.match(/^[0-9]{4}$/) !== null)) ? true : false;
  },
  _checkIsAValidCreditCardCVV: (creditCardCVV) => {
    return (creditCardCVV.match(/^[0-9]{3,4}$/) !== null) ? true : false;
  },
  _getCountryDetailWithCode: (code) => {
    const _CODE = (code || "IR").toUpperCase();

    return __COUNTRIES.find((country) => {
      if (country.code == _CODE) {
        return country;
      }
    })
  },
  _generateNextOffset: (offset, limit) => {
    if (typeof offset == 'object') {
      return {
        from: offset.from + limit,
        to: (offset.from === 0) ? offset.to + limit + 1 : offset.to + limit
      };
    } else {
      return {
        from: offset,
        to: (offset === 0) ? offset + limit + 1 : offset + limit
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
  _storeDataWithKeys: async (keyValuePairs) => {
    if ((typeof keyValuePairs != 'object') && (Array.isArray(keyValuePairs))) {
      throw new Error('You should define Key value pairs of array.');
    } else {
      for (var i = 0; i < keyValuePairs.length; i++) {
        const _KEY_VALUE_PAIR = keyValuePairs[i];

        if (_KEY_VALUE_PAIR.length !== 2) {
          throw new Error('You should define key value pair set.');
        } else {
          try {
            await AsyncStorage.multiSet(`@${__APP_NAME}:${_KEY_VALUE_PAIR[0]}`, _KEY_VALUE_PAIR[1]);

            return true;
          } catch (error) {
            //Error saving data
          }
        }
      }
    }
  },
  _retrieveDataWithKey: async (key) => {
    try {
      const _DATA = await AsyncStorage.getItem(`@${__APP_NAME}:${key}`);

      if (_DATA !== null) {
        return _DATA;
      } else {
        return false;
      }
    } catch (error) {
      //Error retrieving data
    }
  },
  _retrieveDataWithKeys: async (keys) => {
    if ((typeof keys != 'object') && (Array.isArray(keys))) {
      throw new Error('You should define keys as an array.');
    } else {
      const _KEYS = keys.map((key, i) => {
        return `@${__APP_NAME}:${key}`;
      });

      try {
        const _DATA = await AsyncStorage.multiGet(_KEYS, (err, stores) => {
          return stores.map((result, i, store) => {
            const _ROW_KEY = store[i][0],
              _ROW_VALUE = store[i][1];

            return _ROW_VALUE;
          });
        });

        if (_DATA !== null) {
          return _DATA;
        } else {
          return false;
        }
      } catch (error) {
        //Error saving data
      }
    }
  },
  _removeDataWithKey: async (key) => {
    try {
      await AsyncStorage.removeItem(`@${__APP_NAME}:${key}`);

      return true;
    } catch (error) {
      //Error removing data
    }
  },
  _removeDataWithKeys: async (keys) => {
    if ((typeof keys != 'object') && (Array.isArray(keys))) {
      throw new Error('You should define keys as an array.');
    } else {
      const _KEYS = keys.map((key, i) => {
        return `@${__APP_NAME}:${key}`;
      });

      try {
        await AsyncStorage.multiRemove(_KEYS, (err) => {
          //Error removing data
        });

        return true;
      } catch (error) {
        //Error saving data
      }
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
  _removeAllKeys: async () => {
    try {
      const _KEYS = await AsyncStorage.clear();

      return true;
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

    if (typeof options != 'undefined') {
      if (typeof options.first != 'undefined' && options.first > 0) {
        _CAMERA_ROLL_OPTIONS.first = options.first;
      }

      if (typeof options.mimeTypes != 'undefined' && options.mimeTypes.length > 0) {
        _CAMERA_ROLL_OPTIONS.mimeTypes = options.mimeTypes;
      }

      if (typeof options.assetType != 'undefined' && options.assetType != '') {
        _CAMERA_ROLL_OPTIONS.assetType = options.assetType;
      }
    }

    if (Platform.OS === 'ios') {
      _CAMERA_ROLL_OPTIONS.groupTypes = (typeof options != 'undefined') ? ((options.groupTypes != '') ? module.exports._convertKeywordToBlockToken(options.groupTypes) : 'All') : 'All';

      const fetchedCameraRollPhotos = await module.exports._fetchPrivatelyLocalStoragePhotoWithOptions(_CAMERA_ROLL_OPTIONS);

      return fetchedCameraRollPhotos;
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
            'title': `${module.exports._convertKeywordToToken(__APP_NAME)} Read External Storage Permission`,
            'message': `${module.exports._convertKeywordToToken(__APP_NAME)} app needs access to your external storage.`
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const fetchedCameraRollPhotos = await module.exports._fetchPrivatelyLocalStoragePhotoWithOptions(_CAMERA_ROLL_OPTIONS);

          return fetchedCameraRollPhotos;
        } else {
          return false;
        }
      } catch (err) {
        throw err;
      }
    }
  },
  _fetchBase64BlobFromPhoto: (photo, callback, bufferSize) => {
    if (typeof callback != 'undefined') {
      const _BASE64_CONFIG = {
        NAME: 'base64',
        MIME_TYPE: 'image/png'
      };

      var _BUFFER_SIZE = bufferSize || 4096,
        _URI = photo;

      if (typeof photo.image != 'undefined') {
        const {
          width,
          height,
          uri
        } = photo.image,
          _SIZE_IN_BYTES = Math.floor(((width * height) * 16) / 8),
          _SIZE_IN_BYTES_MULTIPLES_OF_THREE = (_SIZE_IN_BYTES % 3 === 0) ? _SIZE_IN_BYTES : (_SIZE_IN_BYTES - (_SIZE_IN_BYTES % 3));

        if ((_SIZE_IN_BYTES_MULTIPLES_OF_THREE >= (2 * 1024 * 1024)) && (_SIZE_IN_BYTES_MULTIPLES_OF_THREE < (5 * 1024 * 1024))) {
          _BUFFER_SIZE = _BUFFER_SIZE * (2 * 3);
        } else if ((_SIZE_IN_BYTES_MULTIPLES_OF_THREE >= (5 * 1024 * 1024)) && (_SIZE_IN_BYTES_MULTIPLES_OF_THREE < (8 * 1024 * 1024))) {
          _BUFFER_SIZE = _BUFFER_SIZE * (5 * 3);
        } else {
          _BUFFER_SIZE = _SIZE_IN_BYTES_MULTIPLES_OF_THREE;
        }

        _URI = uri;
      }

      RNFetchBlob.fs.readStream(_URI, _BASE64_CONFIG.NAME, _BUFFER_SIZE)
        .then((stream) => {
          var dataStream = `data:${_BASE64_CONFIG.MIME_TYPE};${_BASE64_CONFIG.NAME},`;

          stream.open();

          stream.onData((chunk) => {
            dataStream += chunk;
          })

          stream.onEnd(() => {
            callback(dataStream);
          })
        })
        .catch((error) => {
          module.exports._fetchBase64BlobFromPhoto(photo, callback, _BUFFER_SIZE * 3);
        })
    }
  }
};
