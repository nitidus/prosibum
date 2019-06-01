import { Platform, I18nManager } from 'react-native';
import Prototypes from './prototypes';
import GLOBAL from '../global';

import { name as appName } from '../../../app.json';

module.exports = {
  _prepareSignupSeed: (inputProps) => {
    const _DEMAND_MODE = Prototypes._convertTokenToKey(inputProps.demandMode);

    var _SEED = {};

    switch (_DEMAND_MODE) {
      case 'INVITATION':
        _SEED = {
          ..._SEED,
          personal: {
            first_name: inputProps.first_name,
            last_name: inputProps.last_name
          },
          phone: {
            mobile: `${inputProps.phone.dialCode.area_code}${Prototypes._getRidOfZerosFromPhoneNumber(inputProps.phone.number)}`
          },
          password: inputProps.password
        };
        break;
      default:
        _SEED = {
          ..._SEED,
          phone: {
            mobile: `${inputProps.phone.dialCode.area_code}${Prototypes._getRidOfZerosFromPhoneNumber(inputProps.phone.number)}`
          },
          password: inputProps.password
        };

        if (typeof inputProps.email != 'undefined'){
          _SEED.email = inputProps.email;
        }

        if (typeof inputProps.target != 'undefined'){
          _SEED.target = {
            ...inputProps.target,
            app_name: appName
          };
        }else{
          _SEED.target = {
            app_name: appName
          };
        }
        break;
    }

    return _SEED;
  },
  _prepareLoginSeed: (inputProps) => {
    const _IS_A_VALID_TOKEN = Prototypes._checkIsAValidToken(inputProps.token);

    return {
      token: (_IS_A_VALID_TOKEN)? Prototypes._getRidOfZerosFromPhoneNumber(inputProps.token): inputProps.token,
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

    props.setToken('');
    props.setPassword('');

    navigation.navigate('Authorization');
  },
  _prepareAuthority: async (self) => {
    const { props } = self,
          { navigation } = props;

    const _DID_TOKEN_CREATED = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.AUTH);

    navigation.navigate(_DID_TOKEN_CREATED? 'NewProductFeatures': 'Authentication');
  },
  _prepareSignupComponentToSubmit: async (props) => {
    const { navigation, signup } = props,
          _SUBSCRIBED_USER = await Prototypes._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER);

    if (_SUBSCRIBED_USER === false){
      const _DEMAND_MODE = Prototypes._convertTokenToKey(signup.demandMode),
            _SEED = module.exports._prepareSignupSeed(signup);

      switch (_DEMAND_MODE) {
        case 'INVITATION':
          await props.completeUserRegistration(signup.role.user._id, _SEED);
          break;
        default:
          await props.verifyTheUser(_SEED, () => {
            navigation.navigate('VerifyPhoneNumber');
          });
          break;
      }
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
  _prepareSubscribeTokenToSubmit: async (props) => {
    const { navigation } = props;

    await props.subscribeTheUser(({ status }) => {
      switch (status) {
        case 200:
          navigation.navigate('Overseer');
          break;

        case 701:
          props.setValidationToken('');
          break;
      }
    });
  },
  _prepareWalletTransaction: async (props, { attitude, MODAL }) => {
    var _RULES = {};

    if (props.walletModal.creditCard.number.extracted != ''){
      _RULES.card = {
        ..._RULES.card,
        number: props.walletModal.creditCard.number.extracted
      }
    }

    if (Object.keys(props.walletModal.creditCard.expirationDate.month).length > 0){
      _RULES.card = {
        ..._RULES.card,
        exp_month: parseInt(props.walletModal.creditCard.expirationDate.month.value)
      }
    }

    if (props.walletModal.creditCard.expirationDate.year != ''){
      _RULES.card = {
        ..._RULES.card,
        exp_year: parseInt(props.walletModal.creditCard.expirationDate.year)
      }
    }

    if (props.walletModal.creditCard.cvv != ''){
      _RULES.card = {
        ..._RULES.card,
        cvc: props.walletModal.creditCard.cvv
      }
    }

    if (Object.keys(props.walletModal.wallet).length > 0){
      if (typeof props.walletModal.wallet._id != 'undefined'){
        _RULES.wallet_id = props.walletModal.wallet._id;
      }

      if ((Object.keys(props.walletModal.walletCurrentInitialCreditPlan).length > 0) && (props.walletModal.walletInitialCreditPlans.length > 0)){
        if (props.walletModal.walletInitialCreditAmount === 0){
          _RULES.plan_id = props.walletModal.walletCurrentInitialCreditPlan._id;
          _RULES.amount = parseInt(props.walletModal.walletCurrentInitialCreditPlan.price);
          _RULES.balance = parseInt(props.walletModal.walletCurrentInitialCreditPlan.amount);
        }else{
          _RULES.amount = parseInt(props.walletModal.walletInitialCreditAmount);
          _RULES.balance = parseInt(props.walletModal.walletInitialCreditAmount);
        }
      }else{
        if (props.walletModal.walletInitialCreditAmount > 0){
          _RULES.amount = parseInt(props.walletModal.walletInitialCreditAmount);
          _RULES.balance = parseInt(props.walletModal.walletInitialCreditAmount);
        }
      }

      await props.chargeWallet(_RULES, async (response, state) => {
        if (attitude.onProgressSuccess){
          await MODAL.ON_PROGRESS_SUCCESS(response);
        }

        await MODAL.ON_BLUR(state);
      });
    }else{
      if (typeof props.walletModal.currentCurrency._id != 'undefined'){
        _RULES.currency_id = props.walletModal.currentCurrency._id;
      }

      if (props.walletModal.walletName != ''){
        _RULES.wallet_name = props.walletModal.walletName;
      }

      if ((Object.keys(props.walletModal.walletCurrentInitialCreditPlan).length > 0) && (props.walletModal.walletInitialCreditPlans.length > 0)){
        if (props.walletModal.walletInitialCreditAmount === 0){
          _RULES.plan_id = props.walletModal.walletCurrentInitialCreditPlan._id;
        }else{
          _RULES.amount = parseInt(props.walletModal.walletInitialCreditAmount);
          _RULES.balance = parseInt(props.walletModal.walletInitialCreditAmount);
        }
      }else{
        if (props.walletModal.walletInitialCreditAmount > 0){
          _RULES.amount = parseInt(props.walletModal.walletInitialCreditAmount);
          _RULES.balance = parseInt(props.walletModal.walletInitialCreditAmount);
        }
      }

      await props.appendWalletToResource(_RULES, async (response, state) => {
        if (attitude.onProgressSuccess){
          await MODAL.ON_PROGRESS_SUCCESS(response);
        }

        await MODAL.ON_BLUR(state);
      });
    }
  },
  _prepareProductToAppend: async (props) => {
    const { navigation } = props,
          _PROPS = props.newFragment;

    let _SEED = {
      name: _PROPS.name,
      product_id: _PROPS.product._id,
      features: props.newProduct.features.map((item, i) => {
        let finalResponse = {
          feature_id: item.feature._id,
          unit_id: item.unit._id,
          warehouse: {
            _id: item.warehouse._id
          },
          minimum_order_quantity: item.minimum_order_quantity,
          maximum_order_quantity: item.maximum_order_quantity,
          quantity: item.quantity
        };

        if (typeof item.primary != 'undefined'){
          if (item.primary === true){
            finalResponse.primary = true;
          }
        }

        return finalResponse;
      }),
      prices: props.newProduct.prices.map((item, i) => {
        return {
          name: item.name,
          values: [
            {
              content: parseFloat(item.value),
              currency: _PROPS.currency.key,
              language: _PROPS.language.key
            }
          ],
          feature_reference_id: item.feature._id
        };
      }),
      shipping_plans: props.newProduct.shippingPlans.map((item, i) => {
        return {
          feature_reference_id: item.feature._id,
          shipping_method_id: item.shippingMethod._id
        };
      })
    };

    await props.appendFragment(_SEED);

    if (await props.newProduct.connected.status){
      navigation.navigate('Overseer');
    }
  },
  _prepareCameraRoll: async (props) => {
    const { navigation } = props,
          _SEED = {
            groupTypes: (Object.keys(props.cameraRollPickerModal.currentGroupType).length > 0)? props.cameraRollPickerModal.currentGroupType.en: ''
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
          _NATIVE_SETTINGS = await Prototypes._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language,
          _AUTH = await module.exports._prepareAuthDetails();

    self._language = _LANGUAGE;

    await props.fetchAvailableBrandRoles('Wholesaler');

    var _BRAND_PROFILE_PHOTO = '',
        _BRAND_NAME = '',
        _BRAND_ROLE = '';

    if (_AUTH !== null){
      _BRAND_PROFILE_PHOTO = _AUTH.brand_profile_photo || {};
      _BRAND_NAME = _AUTH.brand_name || '';
      _BRAND_ROLE = _AUTH.brand_role || props.technicalTab.brandRoles[0];
    }

    props.setBrandProfilePhoto(_BRAND_PROFILE_PHOTO);
    props.setBrandName(_BRAND_NAME);
    props.setBrandRole(_BRAND_ROLE);
  },
  _prepareSelectedRolePersonalContactInformation: (tokenizedData) => {
    var _CONTAINER_TITLE = '',
        _ROLE_DETAIL = [],
        _ROLE_DETAIL_FIRST_INDEX = 0;

    if (typeof tokenizedData != 'undefined'){
      if (typeof tokenizedData.user != 'undefined'){
        if (typeof tokenizedData.user.personal != 'undefined'){
          if ((typeof tokenizedData.user.personal.first_name != 'undefined') && (typeof tokenizedData.user.personal.last_name != 'undefined')){
            _CONTAINER_TITLE = Prototypes._convertKeywordToToken(`${tokenizedData.user.personal.first_name} ${tokenizedData.user.personal.last_name}`);

            var _PRIMARY_CAROUSEL_ITEM = {
              full_name: Prototypes._convertKeywordToToken(`${tokenizedData.user.personal.first_name} ${tokenizedData.user.personal.last_name}`),
              role: Prototypes._convertKeywordToToken(tokenizedData.usergroup.role)
            };

            if ((typeof tokenizedData.user.profile != 'undefined') || (typeof tokenizedData.user.profile_photo != 'undefined')){
              _PRIMARY_CAROUSEL_ITEM.profile = tokenizedData.user.profile || tokenizedData.user.profile_photo;
            }

            _ROLE_DETAIL.push({
              key: "PRIMARY",
              value: _PRIMARY_CAROUSEL_ITEM
            });
          }
        }else if (typeof tokenizedData.user.email != 'undefined') {
          if (typeof tokenizedData.user.email.content != 'undefined'){
            _CONTAINER_TITLE = Prototypes._stripLongString(tokenizedData.user.email.content, 8);

            var _PRIMARY_CAROUSEL_ITEM = {
              email: {
                content: tokenizedData.user.email.content,
                validated: tokenizedData.user.email.validation.value
              },
              role: Prototypes._convertKeywordToToken(tokenizedData.usergroup.role)
            };

            if ((typeof tokenizedData.user.profile != 'undefined') || (typeof tokenizedData.user.profile_photo != 'undefined') || (typeof tokenizedData.user.profilePhoto != 'undefined') || (typeof tokenizedData.user.photoProfile != 'undefined')){
              _PRIMARY_CAROUSEL_ITEM.profile = tokenizedData.user.profile || tokenizedData.user.profile_photo || tokenizedData.user.profilePhoto || tokenizedData.user.photoProfile;
            }

            _ROLE_DETAIL.push({
              key: "PRIMARY",
              value: _PRIMARY_CAROUSEL_ITEM
            });
          }
        }else{
          _CONTAINER_TITLE = Prototypes._stripLongString(tokenizedData._id, 8);
        }

        var _PERSONAL_CONTACT_INFO_CAROUSEL_ITEM = {};

        if (typeof tokenizedData.user.phone != 'undefined'){
          if (typeof tokenizedData.user.phone.mobile != 'undefined'){
            if ((typeof tokenizedData.user.phone.mobile.content != 'undefined') && (typeof tokenizedData.user.phone.mobile.validation.value != 'undefined')){
              _PERSONAL_CONTACT_INFO_CAROUSEL_ITEM.mobile_phone = {
                content: tokenizedData.user.phone.mobile.content,
                validated: tokenizedData.user.phone.mobile.validation.value
              };
            }
          }
        }

        if ((typeof tokenizedData.user.email != 'undefined') && (typeof tokenizedData.user.personal != 'undefined')){
          if ((typeof tokenizedData.user.email.content != 'undefined') && (typeof tokenizedData.user.email.validation.value != 'undefined') && (typeof tokenizedData.user.personal.first_name != 'undefined') && (typeof tokenizedData.user.personal.last_name != 'undefined')){
            _PERSONAL_CONTACT_INFO_CAROUSEL_ITEM.email = {
              content: tokenizedData.user.email.content,
              validated: tokenizedData.user.email.validation.value
            };
          }
        }

        if (Object.keys(_PERSONAL_CONTACT_INFO_CAROUSEL_ITEM).length > 0){
          _ROLE_DETAIL.push({
            key: "PERSONAL_CONTACT_INFO",
            value: _PERSONAL_CONTACT_INFO_CAROUSEL_ITEM
          });
        }
      }else{
        _CONTAINER_TITLE = Prototypes._stripLongString(tokenizedData._id, 8);
      }

      return {
        CONTAINER_TITLE: _CONTAINER_TITLE,
        ROLE_DETAIL: _ROLE_DETAIL,
        ROLE_DETAIL_FIRST_INDEX: _ROLE_DETAIL_FIRST_INDEX
      };
    }else{
      throw new Error('You should define main seed parameter.');
    }
  }
};
