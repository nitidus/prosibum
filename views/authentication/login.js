import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

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

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {

  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.login;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.email != '' && _PROPS.password != ''){
      const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(_PROPS.email);

      if (_IS_EMAIL_VALID){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

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
        value={__CONSTANTS.submitInput.state.normal.title.en}
        gradient={Global.colors.pair.ongerine}
        onPress={() => {
          Preparation._prepareLogin(props)
        }}
        forcedDisable={_VALIDATED} />;
    }

    const _VALIDATED = this._componentWillCheckValidation(props);

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title={__CONSTANTS.headline.title.en}
            subtitle={__CONSTANTS.headline.subtitle.en} />

          <InputGroup
            style={Styles.InputGroup}>
            <Input
              type={__CONSTANTS.firstInputGroup.first.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}
              placeholder={__CONSTANTS.firstInputGroup.first.title.en}
              value={props.login.email}
              onChangeText={(currentValue) => props.setEmail(currentValue)} />
            <Input
              type={__CONSTANTS.firstInputGroup.second.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.second.title.en)}
              placeholder={__CONSTANTS.firstInputGroup.second.title.en}
              value={props.login.password}
              link={__CONSTANTS.firstInputGroup.second.link.en}
              onPress={() => {
                const { navigation } = props;

                props.setEmail('');
                // props.setPassword('');

                navigation.navigate('ForgottenPassword');
              }}
              onChangeText={(currentValue) => props.setPassword(currentValue)} />
          </InputGroup>

          {_SUBMIT_BUTTON_CONTENT}

          <Link
            containerStyle={Styles.QuickLink}
            value={__CONSTANTS.quickLink.title.en}
            onPress={() => {
              const { navigation } = props;

              // props.setEmail('');
              // props.setPassword('');

              navigation.navigate('Signup');
            }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
