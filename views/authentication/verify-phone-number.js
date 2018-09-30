import React, { Component } from 'react';
import { StatusBar, View, AsyncStorage, Dimensions, Text, Animated, Easing } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { ActivityIndicator, Toast } from '../../assets/layouts/index';
const Styles = Views.Authentication.VerifyPhoneNumber;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.VerifyPhoneNumber;

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

      console.log(_TOKEN)
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
      const _IS_VALIDATION_TOKEN_VALID = _PROPS.validationToken === _PROPS.secretKey;

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
        type="BUTTON"
        name="verify-phone-number"
        gradient={Global.colors.pair.ongerine}
        style={[
          Styles.FirstCarousel,
          Styles.FirstCarouselLoading
        ]}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (props.verifyPhoneNumber.connected.status){
        _TOP_PINNED_TOAST = <Toast
          launched={!props.verifyPhoneNumber.connected.status} />;
      }else{
        _TOP_PINNED_TOAST = <Toast
          message={props.verifyPhoneNumber.connected.content}
          launched={!props.verifyPhoneNumber.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => Preparation._prepareVerifyPhoneNumberComponentToSubmit(props)} />;
      }

      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type="BUTTON"
        name="verify-phone-number"
        value="Verify Phone Number"
        gradient={Global.colors.pair.ongerine}
        onPress={() => Preparation._prepareVerifyPhoneNumberComponentToSubmit(props)}
        forcedDisable={_VALIDATED} />;
    }

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        {_TOP_PINNED_TOAST}

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title="Dear User"
            subtitle={"Please enter the\nsent confirmation code."} />

            <Input
              type="NUMERIC"
              name="confirmation-code"
              placeholder="Confirmation Code"
              value={props.verifyPhoneNumber.validationToken}
              style={Styles.FirstInput}
              onChangeText={(currentValue) => props.setValidationToken(currentValue)} />

            {_SUBMIT_BUTTON_CONTENT}

            <Link
              containerStyle={Styles.QuickLink}
              value="Wrong Number?"
              onPress={() => {
                const { navigation } = this.props;

                // props.setValidationToken('');
                // props.setSecretKey('');

                navigation.goBack();
              }} />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhoneNumber);
