import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform, Dimensions, Text } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../assets/flows/states/types/index';

import { Global, Views } from '../../assets/styles/index';
import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast, CountriesCodesModal } from '../../assets/layouts/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Authentication.ResetPassword,
      Container = ViewsContainer.Authentication.AuthenticationContainer;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.ResetPassword;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.reset_password;

class ResetPassword extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          { navigation: { state: { params } } } = props,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;
  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {

  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.resetPassword;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.oldPassword != '' && _PROPS.newPassword != '' && _PROPS.newPasswordConfirmation != ''){
      const _IS_OLD_PASSWORD_VALID = Functions._checkIsAValidPassword(_PROPS.oldPassword),
            _IS_NEW_PASSWORD_VALID = Functions._checkIsAValidPassword(_PROPS.newPassword),
            _IS_NEW_PASSWORD_CONFIRMATION_VALID = Functions._checkIsAValidPassword(_PROPS.newPasswordConfirmation);

      if (_IS_OLD_PASSWORD_VALID && _IS_NEW_PASSWORD_VALID && _IS_NEW_PASSWORD_CONFIRMATION_VALID){
        if (_PROPS.oldPassword !== _PROPS.newPassword){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this,
          { navigation: { state: { params } } } = props;

    if (typeof props.login != 'undefined'){
      if (Object.keys(props.login.language).length > 0){
        var _MAIN_CONTENT, _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;
            _LANGUAGE = Functions._convertTokenToKeyword(props.login.language.key),
            _VALIDATED = this._componentWillCheckValidation(props);

          if (props.resetPassword.changeThePasswordLoading){
            _SUBMIT_BUTTON_CONTENT = <Input
              style={Styles.SubmitButton}
              type={__CONSTANTS.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.loading.title.en)}
              gradient={Global.colors.pair.ongerine}
              disable={true}>
                <ActivityIndicator />
              </Input>;
          }else{
            if (!props.resetPassword.connected.status){
              _TOP_PINNED_TOAST = <Toast
                launched={!props.resetPassword.connected.status} />;
            }else{
              _TOP_PINNED_TOAST = <Toast
                message={props.resetPassword.connected.content}
                launched={!props.resetPassword.connected.status}
                color={Global.colors.single.carminePink}
                onPress={async () => {
                  const _SEED = {
                          old_password: props.resetPassword.oldPassword,
                          password: props.resetPassword.newPassword
                        },
                        { navigation: { state: { params } } } = props;

                  if (typeof params.targetToken != 'undefined'){
                    await props.changeThePassword(_SEED, params.targetToken);

                    if (props.resetPassword.connected.status){
                      await props.navigation.navigate('Login');
                    }
                  }
                }} />;
            }

            _SUBMIT_BUTTON_CONTENT = <Input
              style={Styles.SubmitButton}
              type={__CONSTANTS.submitInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
              value={__CONSTANTS.submitInput.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              onPress={async () => {
                const _SEED = {
                        old_password: props.resetPassword.oldPassword,
                        password: props.resetPassword.newPassword
                      },
                      { navigation: { state: { params } } } = props;

                if (typeof params.targetToken != 'undefined'){
                  await props.changeThePassword(_SEED, params.targetToken);

                  if (props.resetPassword.connected.status){
                    await props.navigation.navigate('Login');
                  }
                }
              }}
              forcedDisable={_VALIDATED} />;
          }

        var _HEADLINE_SUBTITLE = __CONSTANTS.headline.subtitle.state.normal[_LANGUAGE],
            _QUICK_LINK_CONTENT = __CONSTANTS.quickLink.title[_LANGUAGE];

        if (_VALIDATED){
          var _MESSAGE = '',
              countOfFirstMessageItem = 0,
              countOfSecondMessageItem = 0;

          if (props.resetPassword.oldPassword != '' && props.resetPassword.newPassword != '' && props.resetPassword.newPasswordConfirmation != ''){
            if (props.resetPassword.oldPassword === props.resetPassword.newPassword){
              _MESSAGE += `${(_MESSAGE != '')? '\n': ''}${__CONSTANTS.warning.secondLevel[_LANGUAGE]}`;
            }

            if (props.resetPassword.newPassword !== props.resetPassword.newPasswordConfirmation){
              _MESSAGE += `${(_MESSAGE != '')? '\n': ''}${__CONSTANTS.warning.fourthLevel[_LANGUAGE]}`;
            }
          }else if (props.resetPassword.oldPassword == '' || props.resetPassword.newPassword == '' || props.resetPassword.newPasswordConfirmation == ''){
            if (props.resetPassword.oldPassword == ''){
              _MESSAGE += `${((countOfFirstMessageItem > 0)? __CONSTANTS.warning.delimiter[_LANGUAGE]: '')} ${__CONSTANTS.warning.firstLevel.firstPart[_LANGUAGE]}`;
              countOfFirstMessageItem++;
            }

            if (props.resetPassword.newPassword == ''){
              _MESSAGE += `${((countOfFirstMessageItem > 0)? __CONSTANTS.warning.delimiter[_LANGUAGE]: '')} ${__CONSTANTS.warning.firstLevel.secondPart[_LANGUAGE]}`;
              countOfFirstMessageItem++;
            }

            if (props.resetPassword.newPasswordConfirmation == ''){
              _MESSAGE += `${((countOfFirstMessageItem > 0)? __CONSTANTS.warning.delimiter[_LANGUAGE]: '')} ${__CONSTANTS.warning.firstLevel.thirdPart[_LANGUAGE]}`;
              countOfFirstMessageItem++;
            }

            if (countOfFirstMessageItem > 1){
              _MESSAGE += ` ${__CONSTANTS.warning.firstLevel.verbComposition.more[_LANGUAGE]}`;
            }else{
              _MESSAGE += ` ${__CONSTANTS.warning.firstLevel.verbComposition.one[_LANGUAGE]}`;
            }
          }

          _MESSAGE = (_MESSAGE != '')? `${_MESSAGE}\n`: _MESSAGE;

          if (!Functions._checkIsAValidPassword(props.resetPassword.oldPassword) || !Functions._checkIsAValidPassword(props.resetPassword.newPassword) || !Functions._checkIsAValidPassword(props.resetPassword.newPasswordConfirmation)){
            if (props.resetPassword.oldPassword == ''){
              _MESSAGE += `${((countOfSecondMessageItem > 0)? __CONSTANTS.warning.delimiter[_LANGUAGE]: '')} ${__CONSTANTS.warning.thirdLevel.firstPart[_LANGUAGE]}`;
              countOfSecondMessageItem++;
            }

            if (props.resetPassword.newPassword == ''){
              _MESSAGE += `${((countOfSecondMessageItem > 0)? __CONSTANTS.warning.delimiter[_LANGUAGE]: '')} ${__CONSTANTS.warning.thirdLevel.secondPart[_LANGUAGE]}`;
              countOfSecondMessageItem++;
            }

            if (props.resetPassword.newPasswordConfirmation == ''){
              _MESSAGE += `${((countOfSecondMessageItem > 0)? __CONSTANTS.warning.delimiter[_LANGUAGE]: '')} ${__CONSTANTS.warning.thirdLevel.thirdPart[_LANGUAGE]}`;
              countOfSecondMessageItem++;
            }

            if (countOfSecondMessageItem > 1){
              _MESSAGE += ` ${__CONSTANTS.warning.thirdLevel.verbComposition.more[_LANGUAGE]}`;
            }else{
              _MESSAGE += ` ${__CONSTANTS.warning.thirdLevel.verbComposition.one[_LANGUAGE]}`;
            }
          }

          if (_MESSAGE != ''){
            _SUBMIT_BUTTON_CONTENT = (
              <Input
                type={__CONSTANTS.submitInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
                value={_MESSAGE}
                style={Styles.WarningContainer}
                textStyle={Styles.WarningContent} />
            );
          }
        }

        _MAIN_CONTENT = (
            <View
              name={__CONSTANTS.firstInputGroup.title.en}
              style={Styles.Content}>
                <Headline
                  style={Styles.Headline}
                  title={__CONSTANTS.headline.title[_LANGUAGE]}
                  subtitle={_HEADLINE_SUBTITLE} />

                <InputGroup
                  style={Styles.InputGroup}>
                  <Input
                    type={__CONSTANTS.firstInputGroup.first.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}
                    placeholder={__CONSTANTS.firstInputGroup.first.title[_LANGUAGE]}
                    value={props.resetPassword.oldPassword}
                    onChangeText={(currentValue) => props.setOldPassword(currentValue)} />
                  <Input
                    type={__CONSTANTS.firstInputGroup.second.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.second.title.en)}
                    placeholder={__CONSTANTS.firstInputGroup.second.title[_LANGUAGE]}
                    value={props.resetPassword.newPassword}
                    onChangeText={(currentValue) => props.setNewPassword(currentValue)} />
                  <Input
                    type={__CONSTANTS.firstInputGroup.third.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.third.title.en)}
                    placeholder={__CONSTANTS.firstInputGroup.third.title[_LANGUAGE]}
                    value={props.resetPassword.newPasswordConfirmation}
                    onChangeText={(currentValue) => props.setNewPasswordConfirmation(currentValue)} />
                </InputGroup>

                {_SUBMIT_BUTTON_CONTENT}

                <Link
                  containerStyle={Styles.QuickLink}
                  value={_QUICK_LINK_CONTENT}
                  onPress={() => {
                    const { navigation } = props;

                    navigation.navigate('Login');
                  }} />
            </View>
          );

        const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

        return (
          <Container
            style={Styles.Container}>
              {_TOP_PINNED_TOAST}

              {_MAIN_CONTENT}
          </Container>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
