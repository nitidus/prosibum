import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Segment, Link } from '../../assets/components/index';
import { Container, Toast, CountriesCodesModal } from '../../assets/layouts/index';
const Styles = Views.Authentication.ForgottenPassword;

import { Functions } from '../../assets/modules/index';

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.ForgottenPassword;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.forgotten_password;

class ForgottenPassword extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;
  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    this._componentWillInitialize(props);
  }

  _componentWillInitialize(props) {
    props.setRequestType("email");
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.forgottenPassword;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.requestType != ''){
      switch (_PROPS.requestType.toLowerCase()) {
        case 'email':
          if (_PROPS.email != ''){
            const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(_PROPS.email);

            if (_IS_EMAIL_VALID){
              _FORM_FIELDS_VALIDITY = true;
            }
          }
          break;
        case 'phone':
          if (_PROPS.phone.number != '' && _PROPS.phone.dialCode.area_code != ''){
            const _IS_PHONE_NUMBER_VALID = Functions._checkIsAValidPhoneNumber(_PROPS.phone.number);

            if (_IS_PHONE_NUMBER_VALID){
              _FORM_FIELDS_VALIDITY = true;
            }
          }
          break;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    const _VALIDATED = this._componentWillCheckValidation(props),
          _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en';

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

    var _TOP_PINNED_TOAST,
        _WARNING_MESSAGE = '';

    switch (props.forgottenPassword.requestType.toLowerCase()) {
      case 'email':
        if (props.forgottenPassword.email != ''){
          if (!Functions._checkIsAValidEmail(props.forgottenPassword.email)){
            _WARNING_MESSAGE = __CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.validation.message[_LANGUAGE];
          }
        }
        break;
      case 'phone':
        if (props.forgottenPassword.phone.number != ''){
          if (!Functions._checkIsAValidPhoneNumber(props.forgottenPassword.phone.number)){
            _WARNING_MESSAGE = __CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.validation.message[_LANGUAGE];
          }
        }
        break;
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

          <CountriesCodesModal
            name={__CONSTANTS.modals.first.title.en}
            visible={props.forgottenPassword.countriesCodesModalVisibility}
            onBlur={(status) => props.setCountriesCodesModalVisibility(status)}
            selectedItem={props.forgottenPassword.phone.dialCode}
            onPress={(currentValue) => props.setPhoneNumber({
              dialCode: currentValue
            })}/>

          <View style={Styles.Content}>
            <Headline
              style={Styles.Headline}
              title={__CONSTANTS.headline.title[_LANGUAGE]}
              subtitle={__CONSTANTS.headline.subtitle[_LANGUAGE]} />

            <Segment
              style={Styles.Segment}
              name={__CONSTANTS.firstSegment.title.en}
              onChange={(currentValue) => props.setRequestType(currentValue)}>
                <Container
                  active={true}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.firstSegmentContainer.title.en)}
                  title={__CONSTANTS.firstSegment.content.firstSegmentContainer.title[_LANGUAGE]}>
                    <Input
                      type={__CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.title.en)}
                      placeholder={__CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.title[_LANGUAGE]}
                      value={props.forgottenPassword.email}
                      onChangeText={(currentValue) => props.setEmail(currentValue)} />
                </Container>
                <Container
                  name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.secondSegmentContainer.title.en)}
                  title={__CONSTANTS.firstSegment.content.secondSegmentContainer.title[_LANGUAGE]}>
                    <Input
                      type={__CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.title.en)}
                      placeholder={__CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.title[_LANGUAGE]}
                      value={props.forgottenPassword.phone.number}
                      link={props.forgottenPassword.phone.dialCode.area_code}
                      onPress={() => props.setCountriesCodesModalVisibility(true)}
                      onChangeText={(currentValue) => props.setPhoneNumber({
                        number: currentValue
                      })} />
                </Container>
            </Segment>

            <Input
              style={Styles.SubmitButton}
              type={__CONSTANTS.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
              value={__CONSTANTS.submitInput.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              onPress={() => {
                alert('ok')
              }}
              forcedDisable={_VALIDATED} />

            <Link
              containerStyle={Styles.QuickLink}
              value={__CONSTANTS.quickLink.title[_LANGUAGE]}
              onPress={() => {
                const { navigation } = props;

                props.setEmail('');
                // props.setPhoneNumber('');

                navigation.goBack();
              }} />
          </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
