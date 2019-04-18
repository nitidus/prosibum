import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast } from '../../assets/layouts/index';
const Styles = Views.Authentication.Login;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Login;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.login;

class Login extends Component<{}> {
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

  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.login;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.token != '' && _PROPS.password != ''){
      const _IS_TOKEN_VALID = Functions._checkIsAValidToken(_PROPS.token),
            _IS_PASSWORD_VALID = Functions._checkIsAValidPassword(_PROPS.password);

      if (_IS_TOKEN_VALID && _IS_PASSWORD_VALID){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

    const _VALIDATED = this._componentWillCheckValidation(props),
          _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en';

    if (props.login.loading){
      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type={__CONSTANTS.submitInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.loading.title.en)}
        gradient={Global.colors.pair.ongerine}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (props.login.connected.status){
        _TOP_PINNED_TOAST = <Toast
          launched={!props.login.connected.status} />;
      }else{
        _TOP_PINNED_TOAST = <Toast
          message={props.login.connected.content}
          launched={!props.login.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => {
            Preparation._prepareLogin(props)
          }} />;
      }

      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type={__CONSTANTS.submitInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
        value={__CONSTANTS.submitInput.state.normal.title[_LANGUAGE]}
        gradient={Global.colors.pair.ongerine}
        onPress={async () => {
          await Preparation._prepareLogin(props);
        }}
        forcedDisable={_VALIDATED} />;
    }

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

    var _WARNING_MESSAGE = '';

    if (props.login.token != ''){
      if (!Functions._checkIsAValidToken(props.login.token)){
        _WARNING_MESSAGE = __CONSTANTS.firstInputGroup.first.validation.message[_LANGUAGE];
      }
    }

    if (props.login.password != ''){
      if (!Functions._checkIsAValidPassword(props.login.password)){
        _WARNING_MESSAGE = __CONSTANTS.firstInputGroup.second.validation.message[_LANGUAGE];
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
              title={__CONSTANTS.headline.title[_LANGUAGE]}
              subtitle={__CONSTANTS.headline.subtitle[_LANGUAGE]} />

            <InputGroup
              style={Styles.InputGroup}>
              <Input
                type={__CONSTANTS.firstInputGroup.first.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}
                placeholder={__CONSTANTS.firstInputGroup.first.title[_LANGUAGE]}
                value={props.login.token}
                autoCapitalize="none"
                onChangeText={(currentValue) => props.setToken(currentValue)} />
              <Input
                type={__CONSTANTS.firstInputGroup.second.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.second.title.en)}
                placeholder={__CONSTANTS.firstInputGroup.second.title[_LANGUAGE]}
                value={props.login.password}
                link={__CONSTANTS.firstInputGroup.second.link[_LANGUAGE]}
                onPress={() => {
                  const { navigation } = props;

                  props.setToken('');
                  // props.setPassword('');

                  navigation.navigate('ForgottenPassword');
                }}
                onChangeText={(currentValue) => props.setPassword(currentValue)} />
            </InputGroup>

            {_SUBMIT_BUTTON_CONTENT}

            <Link
              containerStyle={Styles.QuickLink}
              value={__CONSTANTS.quickLink.title[_LANGUAGE]}
              onPress={() => {
                const { navigation } = props;

                // props.setToken('');
                // props.setPassword('');

                navigation.navigate('Signup');
              }} />
          </View>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
