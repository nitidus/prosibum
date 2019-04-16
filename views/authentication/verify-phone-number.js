import React, { Component } from 'react';
import { StatusBar, View, AsyncStorage, KeyboardAvoidingView, Dimensions, Platform, Text, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast } from '../../assets/layouts/index';
const Styles = Views.Authentication.VerifyPhoneNumber;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.VerifyPhoneNumber;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.verify_phone_number;

import { GLOBAL } from '../../assets/flows/states/types/index';

class VerifyPhoneNumber extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    const _SUBSCRIBED_USER = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER);

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
    const _PROPS = props.verifyPhoneNumber,
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

    var _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

    const _VALIDATED = this._componentWillCheckValidation(props);

    if (props.verifyPhoneNumber.loadingFinalSubscribe){
      _SUBMIT_BUTTON_CONTENT = <Input
        type={__CONSTANTS.submitInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.loading.title.en)}
        gradient={Global.colors.pair.ongerine}
        style={[
          Styles.FirstCarousel,
          Styles.FirstCarouselLoading
        ]}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (!props.verifyPhoneNumber.connected.status){
        _TOP_PINNED_TOAST = <Toast
          message={props.verifyPhoneNumber.connected.content}
          launched={!props.verifyPhoneNumber.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => Preparation._prepareVerifyPhoneNumberComponentToSubmit(props)} />;
      }

      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type={__CONSTANTS.submitInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
        value={__CONSTANTS.submitInput.state.normal.title.en}
        gradient={Global.colors.pair.ongerine}
        onPress={() => Preparation._prepareVerifyPhoneNumberComponentToSubmit(props)}
        forcedDisable={_VALIDATED} />;
    }

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

    var _WARNING_MESSAGE = '';
    if (props.verifyPhoneNumber.validationToken != ''){
      if (!Functions._checkIsAValidNumericOnlyField(props.verifyPhoneNumber.validationToken, 6)){
        _WARNING_MESSAGE = __CONSTANTS.firstInputGroup.first.validation.message.en;
      }
    }

    if (_WARNING_MESSAGE != ''){
      _TOP_PINNED_TOAST = <Toast
        message={_WARNING_MESSAGE}
        launched={true}
        color={Global.colors.pair.ongerine.orangeYellow} />;
    }

    return (
      <KeyboardAvoidingView
        style={Styles.Container}
        behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}>
          <StatusBar hidden={true}/>

          {_TOP_PINNED_TOAST}

          <View style={Styles.Content}>
            <Headline
              style={Styles.Headline}
              title={__CONSTANTS.headline.title.en}
              subtitle={__CONSTANTS.headline.subtitle.en} />

              <Input
                type={__CONSTANTS.firstInputGroup.first.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}
                placeholder={__CONSTANTS.firstInputGroup.first.title.en}
                value={props.verifyPhoneNumber.validationToken}
                style={Styles.FirstInput}
                onChangeText={(currentValue) => props.setValidationToken(currentValue)}
                {...__CONSTANTS.firstInputGroup.first.options} />

              {_SUBMIT_BUTTON_CONTENT}

              <Link
                containerStyle={Styles.QuickLink}
                value={__CONSTANTS.quickLink.title.en}
                onPress={() => {
                  const { navigation } = this.props;

                  // props.setValidationToken('');
                  // props.setSecretKey('');

                  navigation.goBack();
                }} />
          </View>
      </KeyboardAvoidingView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneNumber);
