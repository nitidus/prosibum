import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Segment, Link } from '../../assets/components/index';
import { Container, CountriesCodesModal } from '../../assets/layouts/index';
const Styles = Views.Authentication.ForgottenPassword;

import { Functions } from '../../assets/modules/index';

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.ForgottenPassword;

class ForgottenPassword extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {

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
          if (_PROPS.phone.number != '' && _PROPS.phone.dial_code.area_code != ''){
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

    const _VALIDATED = this._componentWillCheckValidation(props);

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <CountriesCodesModal
          name="countries-codes-modal"
          visible={props.forgottenPassword.countries_codes_modal_visibility}
          onBlur={(status) => props.setCountriesCodesModalVisibility(status)}
          selectedItem={props.forgottenPassword.phone.dial_code}
          onPress={(currentValue) => props.setPhoneNumber({
            dial_code: currentValue
          })}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title="Dear User"
            subtitle={"To change your password\nuse the form below."} />

          <Segment
            style={Styles.Segment}
            name="forgotten-options"
            onChange={(currentValue) => props.setRequestType(currentValue)}>
              <Container
                active={true}
                name="email"
                title="Email">
                  <Input
                    type="EMAIL"
                    name="email"
                    placeholder="Email"
                    value={props.forgottenPassword.email}
                    onChangeText={(currentValue) => props.setEmail(currentValue)} />
              </Container>
              <Container
                name="phone-number"
                title="Phone">
                  <Input
                    type="PHONE-LINK"
                    name="phone-number"
                    placeholder="Phone Number"
                    value={props.forgottenPassword.phone.number}
                    link={props.forgottenPassword.phone.dial_code.area_code}
                    onPress={() => props.setCountriesCodesModalVisibility(true)}
                    onChangeText={(currentValue) => props.setPhoneNumber({
                      number: currentValue
                    })} />
              </Container>
          </Segment>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="send"
            value="Send"
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }}
            forcedDisable={_VALIDATED} />

          <Link
            containerStyle={Styles.QuickLink}
            value="Remember your password?"
            onPress={() => {
              const { navigation } = props;

              props.setEmail('');
              // props.setPhoneNumber('');

              navigation.goBack();
            }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);
