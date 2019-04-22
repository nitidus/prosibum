import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform, Dimensions, Text } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../assets/flows/states/types/index';

import { Global, Views } from '../../assets/styles/index';
import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast, CountriesCodesModal } from '../../assets/layouts/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Authentication.Signup,
      Container = ViewsContainer.Authentication.AuthenticationContainer;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Signup;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.signup;

class Signup extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          { navigation: { state: { params } } } = props,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    if (Object.keys(props.signup.language).length === 0){
      props.setLanguage(_LANGUAGE);
    }else{
      if (props.signup.language.key !== _LANGUAGE.key){
        props.setLanguage(_LANGUAGE);
      }
    }

    if (typeof params != 'undefined'){
      if (Object.keys(params).length > 0){
        if ((typeof params.brandName != 'undefined') && (typeof params.targetToken != 'undefined')){
          props.setDemandMode('INVITATION');
          props.fetchAvailableRoleWithBrandAndToken(params.brandName, params.targetToken);
        }
      }
    }
  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {

  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.signup,
          _DEMAND_MODE = Functions._convertTokenToKey(_PROPS.demandMode),
          _CONNECTED_STATUS = _PROPS.connected.status;

    var _FORM_FIELDS_VALIDITY = false;

    switch (_DEMAND_MODE) {
      case 'INVITATION':
        if (_PROPS.phone.number != '' && _PROPS.phone.dialCode.area_code != '' && _PROPS.firstName != '' && _PROPS.lastName != '' && _PROPS.password != ''){
          const _IS_FIRST_NAME_VALID = Functions._checkIsAValidTextOnlyField(_PROPS.firstName),
                _IS_LAST_NAME_VALID = Functions._checkIsAValidTextOnlyField(_PROPS.lastName),
                _IS_PHONE_NUMBER_VALID = Functions._checkIsAValidPhoneNumber(_PROPS.phone.number),
                _IS_PASSWORD_VALID = Functions._checkIsAValidPassword(_PROPS.password);

          if (_IS_FIRST_NAME_VALID && _IS_LAST_NAME_VALID && _IS_PHONE_NUMBER_VALID && _IS_PASSWORD_VALID){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
        break;

      default:
        if (_PROPS.phone.number != '' && _PROPS.phone.dialCode.area_code != '' && _PROPS.email != '' && _PROPS.password != ''){
          const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(_PROPS.email),
                _IS_PHONE_NUMBER_VALID = Functions._checkIsAValidPhoneNumber(_PROPS.phone.number),
                _IS_PASSWORD_VALID = Functions._checkIsAValidPassword(_PROPS.password);

          if (_IS_EMAIL_VALID && _IS_PHONE_NUMBER_VALID && _IS_PASSWORD_VALID){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
        break;
    }

    return !(_CONNECTED_STATUS && _FORM_FIELDS_VALIDITY);
  }

  render() {
    const { props } = this;

    var _SIGNUP_CONTENT;

    if (Object.keys(props.signup.language).length > 0){
      const { navigation: { state: { params } } } = props,
            _VALIDATED = this._componentWillCheckValidation(props),
            _LANGUAGE = Functions._convertTokenToKeyword(props.signup.language.key),
            _DEMAND_MODE = Functions._convertTokenToKey(props.signup.demandMode);

      var _MAIN_CONTENT, _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

      switch (_DEMAND_MODE) {
        case 'INVITATION':
          if (Object.keys(props.signup.role).length > 0){
            if (props.signup.verificationLoading){
              _SUBMIT_BUTTON_CONTENT = <Input
                type={__CONSTANTS.content.state.invitation.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.invitation.submitInput.state.loading.title.en)}
                gradient={Global.colors.pair.ongerine}
                style={Styles.SubmitButtonInvitationState}
                disable={true}>
                  <ActivityIndicator />
                </Input>;
            }else{
              if (!props.signup.connected.status){
                _TOP_PINNED_TOAST = <Toast
                  message={props.signup.connected.content}
                  launched={!props.signup.connected.status}
                  color={Global.colors.single.carminePink}
                  onPress={() => Preparation._prepareSignupComponentToSubmit(props)} />;
              }

              _SUBMIT_BUTTON_CONTENT = <Input
                style={Styles.SubmitButtonInvitationState}
                type={__CONSTANTS.content.state.invitation.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.invitation.submitInput.state.normal.title.en)}
                value={__CONSTANTS.content.state.normal.submitInput.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                onPress={() => Preparation._prepareSignupComponentToSubmit(props)}
                forcedDisable={_VALIDATED} />;
            }

            _MAIN_CONTENT = (
              <View style={Styles.Content}>
                <Headline
                  style={Styles.Headline}
                  title={__CONSTANTS.content.state.invitation.headline.title[_LANGUAGE]}
                  subtitle={__CONSTANTS.content.state.invitation.headline.subtitle[_LANGUAGE]} />

                <InputGroup
                  style={Styles.FirstInputGroupInvitationState}>
                  <Input
                    type={__CONSTANTS.content.state.invitation.firstInputGroup.first.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.invitation.firstInputGroup.first.title.en)}
                    placeholder={__CONSTANTS.content.state.invitation.firstInputGroup.first.title[_LANGUAGE]}
                    value={props.signup.firstName}
                    onChangeText={(currentValue) => props.setFirstName(currentValue)} />
                  <Input
                    type={__CONSTANTS.content.state.invitation.firstInputGroup.second.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.invitation.firstInputGroup.second.title.en)}
                    placeholder={__CONSTANTS.content.state.invitation.firstInputGroup.second.title[_LANGUAGE]}
                    value={props.signup.lastName}
                    onChangeText={(currentValue) => props.setLastName(currentValue)} />
                </InputGroup>

                <InputGroup
                  style={Styles.SecondInputGroupInvitationState}>
                  <Input
                    type={__CONSTANTS.content.state.invitation.secondInputGroup.first.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.invitation.secondInputGroup.first.title.en)}
                    placeholder={__CONSTANTS.content.state.invitation.secondInputGroup.first.title[_LANGUAGE]}
                    value={props.signup.phone.number}
                    link={props.signup.phone.dialCode.area_code}
                    onPress={() => props.setCountriesCodesModalVisibility(true)}
                    onChangeText={(currentValue) => props.setPhoneNumber({
                      number: currentValue
                    })} />
                  <Input
                    type={__CONSTANTS.content.state.invitation.secondInputGroup.second.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.invitation.secondInputGroup.second.title.en)}
                    placeholder={__CONSTANTS.content.state.invitation.secondInputGroup.second.title[_LANGUAGE]}
                    value={props.signup.password}
                    onChangeText={(currentValue) => props.setPassword(currentValue)} />
                </InputGroup>

                {_SUBMIT_BUTTON_CONTENT}
              </View>
            );
          }else{
            _MAIN_CONTENT = (
              <ActivityIndicator />
            );
          }
          break;

        default:
          if (props.signup.verificationLoading){
            _SUBMIT_BUTTON_CONTENT = <Input
              type={__CONSTANTS.content.state.normal.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.normal.submitInput.state.loading.title.en)}
              gradient={Global.colors.pair.ongerine}
              style={Styles.SubmitButtonNormalState}
              disable={true}>
                <ActivityIndicator />
              </Input>;
          }else{
            if (!props.signup.connected.status){
              _TOP_PINNED_TOAST = <Toast
                message={props.signup.connected.content}
                launched={!props.signup.connected.status}
                color={Global.colors.single.carminePink}
                onPress={() => Preparation._prepareSignupComponentToSubmit(props)} />;
            }

            _SUBMIT_BUTTON_CONTENT = <Input
              style={Styles.SubmitButtonNormalState}
              type={__CONSTANTS.content.state.normal.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.normal.submitInput.state.normal.title.en)}
              value={__CONSTANTS.content.state.normal.submitInput.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              onPress={() => Preparation._prepareSignupComponentToSubmit(props)}
              forcedDisable={_VALIDATED} />;
          }

          var _WARNING_MESSAGE = '';

          if (props.signup.phone.number != ''){
            if (!Functions._checkIsAValidPhoneNumber(props.signup.phone.number)){
              _WARNING_MESSAGE = __CONSTANTS.content.state.normal.firstInputGroup.first.validation.message[_LANGUAGE];
            }
          }

          if (props.signup.email != ''){
            if (!Functions._checkIsAValidEmail(props.signup.email)){
              _WARNING_MESSAGE = __CONSTANTS.content.state.normal.firstInputGroup.second.validation.message[_LANGUAGE];
            }
          }

          if (props.signup.password != ''){
            if (!Functions._checkIsAValidPassword(props.signup.password)){
              _WARNING_MESSAGE = __CONSTANTS.content.state.normal.firstInputGroup.third.validation.message[_LANGUAGE];
            }
          }

          if (_WARNING_MESSAGE != ''){
            _TOP_PINNED_TOAST = <Toast
              message={_WARNING_MESSAGE}
              launched={true}
              color={Global.colors.pair.ongerine.orangeYellow} />;
          }

          var _AREA_CODE = props.signup.phone.dialCode.area_code;

          if (_LANGUAGE == 'fa'){
            _AREA_CODE = Functions._convertDigitsToPersian(_AREA_CODE);
          }

          _MAIN_CONTENT = (
            <View style={Styles.Content}>
              <Headline
                style={Styles.Headline}
                title={__CONSTANTS.content.state.normal.headline.title[_LANGUAGE]}
                subtitle={__CONSTANTS.content.state.normal.headline.subtitle[_LANGUAGE]} />

              <InputGroup
                style={Styles.FirstInputGroupNormalState}>
                <Input
                  type={__CONSTANTS.content.state.normal.firstInputGroup.first.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.normal.firstInputGroup.first.title.en)}
                  placeholder={__CONSTANTS.content.state.normal.firstInputGroup.first.title[_LANGUAGE]}
                  value={props.signup.phone.number}
                  link={_AREA_CODE}
                  onPress={() => props.setCountriesCodesModalVisibility(true)}
                  onChangeText={(currentValue) => props.setPhoneNumber({
                    number: currentValue
                  })} />
                <Input
                  type={__CONSTANTS.content.state.normal.firstInputGroup.second.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.normal.firstInputGroup.second.title.en)}
                  placeholder={__CONSTANTS.content.state.normal.firstInputGroup.second.title[_LANGUAGE]}
                  value={props.signup.email}
                  onChangeText={(currentValue) => props.setEmail(currentValue)} />
                <Input
                  type={__CONSTANTS.content.state.normal.firstInputGroup.third.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.state.normal.firstInputGroup.third.title.en)}
                  placeholder={__CONSTANTS.content.state.normal.firstInputGroup.third.title[_LANGUAGE]}
                  value={props.signup.password}
                  onChangeText={(currentValue) => props.setPassword(currentValue)} />
              </InputGroup>

              {_SUBMIT_BUTTON_CONTENT}

              <Link
                containerStyle={Styles.QuickLink}
                value={__CONSTANTS.content.state.normal.quickLink.title[_LANGUAGE]}
                onPress={() => {
                  const { navigation } = this.props;

                  // props.setEmail('');
                  // props.setPassword('');

                  navigation.goBack();
                }} />
            </View>
          );
          break;
      }

      const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

      _SIGNUP_CONTENT = (
        <React.Fragment>
          {_TOP_PINNED_TOAST}

          <CountriesCodesModal
            visible={props.signup.countriesCodesModalVisibility}
            onBlur={(status) => props.setCountriesCodesModalVisibility(status)}
            selectedItem={props.signup.phone.dialCode}
            onPress={(currentValue) => props.setPhoneNumber({
              dialCode: currentValue
            })} />

          {_MAIN_CONTENT}
        </React.Fragment>
      );
    }else{
      _SIGNUP_CONTENT = (
        <ActivityIndicator/>
      );
    }

    return (
      <Container
        style={Styles.Container}>
          {_SIGNUP_CONTENT}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
