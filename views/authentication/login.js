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
        type="BUTTON"
        name="signin-loading"
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
          onPress={() => Preparation._prepareVerifyPhoneNumberComponentToSubmit(props)} />;
      }

      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type="BUTTON"
        name="signin"
        value="Sign In"
        gradient={Global.colors.pair.ongerine}
        onPress={() => Preparation._prepareVerifyPhoneNumberComponentToSubmit(props)}
        forcedDisable={_VALIDATED} />;
    }

    const _VALIDATED = this._componentWillCheckValidation(props);

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title="Welcome"
            subtitle={"Please login to\n your account."} />

          <InputGroup
            style={Styles.InputGroup}>
            <Input
              type="EMAIL"
              name="email"
              placeholder="Email"
              value={props.login.email}
              onChangeText={(currentValue) => props.setEmail(currentValue)} />
            <Input
              type="PASSWORD-LINK"
              name="password"
              placeholder="Password"
              value={props.login.password}
              link="Forgot it?"
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
            value="Don't have an account?"
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
