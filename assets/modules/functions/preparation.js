import { Platform } from 'react-native';
import Prototypes from './prototypes';

import { GLOBAL } from '../../flows/states/types/index';

module.exports = {
  _prepareSignupSeed: (inputProps) => {
    return {
      personal: {
        first_name: inputProps.firstName,
        last_name: inputProps.lastName
      },
      user_group_id: inputProps.userGroup._id,
      phone: {
        mobile: `${inputProps.phone.dialCode.area_code}${Prototypes._getRidOfZerosFromPhoneNumber(inputProps.phone.number)}`
      },
      email: inputProps.email,
      password: inputProps.password
    };
  },
  _prepareVerifyPhoneNumberSeed: (inputProps) => {
    return {
      user_id: inputProps
    };
  },
  _prepareLoginSeed: (inputProps) => {
    return {
      email: inputProps.email,
      password: inputProps.password
    };
  },
  _prepareBrandRolePriority: (props) => {
    const { technicalTab } = props,
          { brandRoles, brandRole } = technicalTab,
          _BRAND_ROLES_PRIORITIES = brandRoles.map((role, i) => {
            return role.priority;
          }),
          _MAXIMUM_PRIORITY_IN_BRAND_ROLE = Math.max(..._BRAND_ROLES_PRIORITIES),
          _MINIMUM_PRIORITY_IN_BRAND_ROLE = Math.min(..._BRAND_ROLES_PRIORITIES),
          _CURRENT_BRAND_ROLE_PRIORITY = brandRole.priority;

      return {
        current: _CURRENT_BRAND_ROLE_PRIORITY,
        range: {
          max: _MAXIMUM_PRIORITY_IN_BRAND_ROLE,
          min: _MINIMUM_PRIORITY_IN_BRAND_ROLE
        }
      };
  },
  _prepareLogout: async (props) => {
    const { navigation } = props,
          _KEYS_LISTENING_TO_REMOVE = [
            GLOBAL.STORAGE.AUTH,
            GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER
          ],
          _DID_TOKENS_REMOVED = await Prototypes._removeDataWithKeys(_KEYS_LISTENING_TO_REMOVE);

    navigation.navigate(_DID_TOKENS_REMOVED? 'Authentication': 'Overseer');
  },
  _prepareLogin: async (props) => {
    const { navigation } = props,
          _LOGIN_SEED = module.exports._prepareLoginSeed(props.login);

    await props.verifyAuthentication(_LOGIN_SEED);

    props.setEmail('');
    props.setPassword('');

    navigation.navigate('Authorization');
  },
  _prepareAuthority: async (self) => {
    const { props } = self,
          { navigation } = props;

    const _DID_TOKEN_CREATED = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.AUTH);
//here
    navigation.navigate(_DID_TOKEN_CREATED? 'Wallets': 'Authentication');
  },
  _prepareSignupComponentToSubmit: async (props) => {
    const { navigation, signup } = props,
          _SUBSCRIBED_USER = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER);

    if (_SUBSCRIBED_USER === false){
      const _SEED = module.exports._prepareSignupSeed(signup);

      await props.subscribeTheUser(_SEED);

      navigation.navigate('VerifyPhoneNumber');
    }else{
      const _TOKEN = JSON.parse(_SUBSCRIBED_USER),
            _TOKEN_MOBILE_PHONE_VALIDATION_VALUE = _TOKEN.phone.mobile.validation.value;

      if (_TOKEN_MOBILE_PHONE_VALIDATION_VALUE === true){
        navigation.goBack();
      }else{
        const _TODAY = new Date(),
              _VALIDATION_DATE = new Date(_TOKEN.phone.mobile.validation.modified_at),
              _TWO_MINUTES = (1000 * 60 * 2),
              _VALIDATION_TOKEN_TIME_LEFT = _TODAY.getTime() - _VALIDATION_DATE.getTime();

        if (_VALIDATION_TOKEN_TIME_LEFT > _TWO_MINUTES){
          const _RECHECKED_SUBSCRIBED_USER = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER);

          if (_RECHECKED_SUBSCRIBED_USER !== false){
            const _TARGET = JSON.parse(_RECHECKED_SUBSCRIBED_USER);

            var _SEED = {
              user_id: _TARGET._id
            },
            _CURRENT_PHONE_NUMBER = `${props.signup.phone.dialCode.area_code}${Prototypes._getRidOfZerosFromPhoneNumber(props.signup.phone.number)}`;

            if (_TARGET.phone.mobile.content !== _CURRENT_PHONE_NUMBER){
              _SEED.phone_number = _CURRENT_PHONE_NUMBER;
            }

            await props.regenerateTheUserPhoneNumberValidationToken(_SEED);

            navigation.navigate('VerifyPhoneNumber');
          }
        }else{
          navigation.navigate('VerifyPhoneNumber');
        }
      }
    }
  },
  _prepareVerifyPhoneNumberComponentToSubmit: async (props) => {
    const { navigation } = props,
          _SUBSCRIBED_USER = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER);

    if (_SUBSCRIBED_USER !== false){
      const _TOKEN = JSON.parse(_SUBSCRIBED_USER),
            _USER_ID = _TOKEN._id,
            _SEED = module.exports._prepareVerifyPhoneNumberSeed(_USER_ID);

      await props.verifyTheUserPhoneNumber(_SEED);

      navigation.navigate('Login');
    }
  },
  _prepareVerifyPhoneNumberComponentToSubmit: async (props) => {
    const { navigation, login } = props,
          _SEED = module.exports._prepareLoginSeed(login);

    await props.verifyAuthentication(_SEED);

    const _DID_TOKEN_CREATED = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.AUTH);

    if (_DID_TOKEN_CREATED !== false){
      const _PARSED_TOKEN = JSON.parse(_DID_TOKEN_CREATED);

      navigation.navigate('Dashboard');
    }
  },
  _prepareCameraRoll: async (props) => {
    const { navigation } = props,
          _SEED = {
            groupTypes: props.cameraRollPickerModal.currentGroupType
          };

    const _FETCHED_CAMERA_ROLL_ITEMS = await Prototypes._retrieveLocalStoragePhotosWithOptions(_SEED),
          _CHECK_CRITERIA_ON_FETCHED_ITEMS = ((_FETCHED_CAMERA_ROLL_ITEMS.edges.length > 0) && (_FETCHED_CAMERA_ROLL_ITEMS !== null) && (typeof _FETCHED_CAMERA_ROLL_ITEMS != 'undefined') && (_FETCHED_CAMERA_ROLL_ITEMS !== false));

    if (_CHECK_CRITERIA_ON_FETCHED_ITEMS){
      props.setCameraRollItems(_FETCHED_CAMERA_ROLL_ITEMS.edges);
    }
  },
  _prepareAuthDetails: async () => {
    const _DID_TOKEN_CREATED = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.AUTH);

    var _RESPONSE = {};

    if (_DID_TOKEN_CREATED !== false){
      const _AUTH = JSON.parse(_DID_TOKEN_CREATED);

      _RESPONSE._id = _AUTH._id;

      if (typeof _AUTH.brand != 'undefined'){
        _RESPONSE.brand_profile_photo = _AUTH.brand.photo || _AUTH.brand.profile_photo || _AUTH.brand.profilePhoto || _AUTH.brand.logo || _AUTH.brand.profile || _AUTH.brand.emblem || '';
        _RESPONSE.brand_name = _AUTH.brand.name || _AUTH.brand.title || _AUTH.brand.head || _AUTH.brand.heading || _AUTH.brand.headline || _AUTH.brand.caption || '';
      }

      _RESPONSE.brand_role = _AUTH.usergroup;
    }

    return _RESPONSE;
  },
  _prepareTechnicalTabInProfile: async (self) => {
    const { props } = self,
          { navigation } = props,
          _AUTH = await module.exports._prepareAuthDetails();

    props.fetchAvailableBrandRoles('Wholesaler');

    var _BRAND_PROFILE_PHOTO = '',
        _BRAND_NAME = '',
        _BRAND_ROLE = '';

    if (_AUTH !== null){
      _BRAND_PROFILE_PHOTO = _AUTH.brand_profile_photo || '';
      _BRAND_NAME = _AUTH.brand_name || '';
      _BRAND_ROLE = _AUTH.brand_role || props.technicalTab.brandRoles[0];
    }

    props.setBrandProfilePhoto(_BRAND_PROFILE_PHOTO);
    props.setBrandName(_BRAND_NAME);
    props.setBrandRole(_BRAND_ROLE);
  }
};
