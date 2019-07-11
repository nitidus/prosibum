import React, { Component } from 'react';
import { StatusBar, View, AsyncStorage, KeyboardAvoidingView, Dimensions, Platform, Text, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast } from '../../assets/layouts/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Authentication.VerifyPhoneNumber,
      Container = ViewsContainer.Authentication.AuthenticationContainer;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Signup;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.verify_phone_number;

import { GLOBAL } from '../../assets/flows/states/types/index';

class VerifyPhoneNumber extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language,
          _SUBSCRIBED_USER = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_TOKEN);

    this._language = _LANGUAGE;

    if (_SUBSCRIBED_USER !== false){
      const _PARSED_SUBSCRIBED_USER = JSON.parse(_SUBSCRIBED_USER),
            _TOKEN = _PARSED_SUBSCRIBED_USER.phone.mobile.validation.token;

      props.setSecretKey(_TOKEN);
    }
  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.signup,
          _CONNECTED_STATUS = _PROPS.connected.status;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.secretKey != '' && _PROPS.validationToken != ''){
      const _IS_VALIDATION_TOKEN_VALID = (_PROPS.validationToken === _PROPS.secretKey) && (Functions._checkIsAValidNumericOnlyField(_PROPS.validationToken, 6));

      if (_IS_VALIDATION_TOKEN_VALID){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !(_CONNECTED_STATUS && _FORM_FIELDS_VALIDITY);
  }

  render() {
    const { props } = this;

    if (typeof props.login != 'undefined'){
      if (Object.keys(props.login.language).length > 0){
        const _LANGUAGE = Functions._convertTokenToKeyword(props.login.language.key);

        if (props.signup.secretKey != ''){
          var _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

          const _VALIDATED = this._componentWillCheckValidation(props);

          if (props.signup.subscribeLoading){
            _SUBMIT_BUTTON_CONTENT = <Input
              type={__CONSTANTS.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.loading.title.en)}
              gradient={Global.colors.pair.ongerine}
              style={Styles.SubmitButton}
              disable={true}>
                <ActivityIndicator />
              </Input>;
          }else{
            if (!props.signup.connected.status){
              _TOP_PINNED_TOAST = <Toast
                message={props.signup.connected.content}
                launched={!props.signup.connected.status}
                color={Global.colors.single.carminePink}
                onPress={() => Preparation._prepareSubscribeTokenToSubmit(props)} />;
            }

            _SUBMIT_BUTTON_CONTENT = <Input
              style={Styles.SubmitButton}
              type={__CONSTANTS.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
              value={__CONSTANTS.submitInput.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              onPress={() => Preparation._prepareSubscribeTokenToSubmit(props)}
              forcedDisable={_VALIDATED} />;
          }

          const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

          var _WARNING_MESSAGE = '';

          if (props.signup.validationToken != ''){
            if (!Functions._checkIsAValidNumericOnlyField(props.signup.validationToken, 6)){
              _WARNING_MESSAGE = __CONSTANTS.firstInputGroup.first.validation.message[_LANGUAGE];
            }
          }

          if (_WARNING_MESSAGE != ''){
            _TOP_PINNED_TOAST = <Toast
              message={_WARNING_MESSAGE}
              launched={true}
              color={Global.colors.pair.ongerine.orangeYellow} />;
          }

          return (
            <Container
              style={Styles.Container}>
                {_TOP_PINNED_TOAST}

                <View
                  name={Functions._convertTokenToKeyword(__CONSTANTS.container.title.en)}
                  style={Styles.Content}>
                    <Headline
                      style={Styles.Headline}
                      title={__CONSTANTS.headline.title[_LANGUAGE]}
                      subtitle={__CONSTANTS.headline.subtitle[_LANGUAGE]} />

                    <Input
                      type={__CONSTANTS.firstInputGroup.first.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}
                      placeholder={__CONSTANTS.firstInputGroup.first.title[_LANGUAGE]}
                      value={props.signup.validationToken}
                      style={Styles.FirstInput}
                      onChangeText={(currentValue) => props.setValidationToken(currentValue)}
                      {...__CONSTANTS.firstInputGroup.first.options} />

                    {_SUBMIT_BUTTON_CONTENT}

                    <Link
                      containerStyle={Styles.QuickLink}
                      value={__CONSTANTS.quickLink.title[_LANGUAGE]}
                      onPress={() => {
                        const { navigation } = this.props;

                        // props.setValidationToken('');
                        // props.setSecretKey('');

                        navigation.goBack();
                      }} />
                </View>
            </Container>
          );
        }else{
          return (
            <Link
              containerStyle={Styles.EmptySecretKey}
              value={__CONSTANTS.emptySecretKey.title[_LANGUAGE]} />
          );
        }
      }else{
        return (
          <ActivityIndicator />
        );
      }
    }else{
      return (
        <ActivityIndicator />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneNumber);
