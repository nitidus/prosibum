import React, { Component } from 'react';
import { StatusBar, View, Platform } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast, Icon, LanguagesModal } from '../../assets/layouts/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Authentication.Login,
      Container = ViewsContainer.Authentication.AuthenticationContainer;

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
    const { props } = this;

    await this._fetchLanguageFromNativeSettings(props);
  }

  async shouldComponentUpdate(nextProps, nextState) {
    await this._fetchLanguageFromNativeSettings(nextProps);

    return true;
  }

  componentWillReceiveProps(props) {

  }

  async _fetchLanguageFromNativeSettings(props) {
    const _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    if (Object.keys(props.login.language).length === 0){
      props.setLanguage(_LANGUAGE);
    }else{
      if (props.login.language.key !== _LANGUAGE.key){
        props.setLanguage(_LANGUAGE);
      }
    }
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

    var _LOGIN_CONTENT;

    if (Object.keys(props.login.language).length > 0){
      var _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

      const _VALIDATED = this._componentWillCheckValidation(props),
            _LANGUAGE = Functions._convertTokenToKeyword(props.login.language.key),
            _LANGUAGES_MODAL_OTHER_PROPS = {
              language: props.login.language
            };

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

      _LOGIN_CONTENT = (
        <React.Fragment
          name={Functions._convertTokenToKeyword(__CONSTANTS.container.title.en)}>
            {_TOP_PINNED_TOAST}

            <View
              name={Functions._convertTokenToKeyword(__CONSTANTS.container.title.en)}
              style={Styles.Content}>
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

                <View
                  style={Styles.TailContainer}>
                    <Link
                      containerStyle={Styles.QuickLink}
                      value={__CONSTANTS.quickLink.title[_LANGUAGE]}
                      onPress={() => {
                        const { navigation } = props;

                        // props.setToken('');
                        // props.setPassword('');

                        navigation.navigate('Signup');
                      }} />

                      <Input
                        type={"button"}
                        name="language-modal-handler"
                        gradient={Global.colors.pair.ongerine}
                        style={Styles.LanguageHandlerButton}
                        onPress={() => props.setLanguagesModalVisibility(true)}>
                          <Icon
                            name="globe"
                            height={Styles.LanguageHandlerButtonIcon.height} />
                      </Input>
                </View>
            </View>

            <LanguagesModal
              visibility={props.login.languagesModalVisibility}
              onBlur={() => props.setLanguagesModalVisibility(false)}
              onPress={async () => await this._fetchLanguageFromNativeSettings(props)}
              {..._LANGUAGES_MODAL_OTHER_PROPS} />
        </React.Fragment>
      );
    }else{
      _LOGIN_CONTENT = (
        <ActivityIndicator/>
      );
    }

    return (
      <Container
        style={Styles.Container}>
          {_LOGIN_CONTENT}
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
