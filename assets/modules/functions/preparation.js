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
  }
};
