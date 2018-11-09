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

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.forgotten_password;

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

    const _VALIDATED = this._componentWillCheckValidation(props);

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

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
            title={__CONSTANTS.headline.title.en}
            subtitle={__CONSTANTS.headline.subtitle.en} />

          <Segment
            style={Styles.Segment}
            name={__CONSTANTS.firstSegment.title.en}
            onChange={(currentValue) => props.setRequestType(currentValue)}>
              <Container
                active={true}
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.firstSegmentContainer.title.en)}
                title={__CONSTANTS.firstSegment.content.firstSegmentContainer.title.en}>
                  <Input
                    type={__CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.title.en)}
                    placeholder={__CONSTANTS.firstSegment.content.firstSegmentContainer.content.firstInput.title.en}
                    value={props.forgottenPassword.email}
                    onChangeText={(currentValue) => props.setEmail(currentValue)} />
              </Container>
              <Container
                name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.secondSegmentContainer.title.en)}
                title={__CONSTANTS.firstSegment.content.secondSegmentContainer.title.en}>
                  <Input
                    type={__CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.title.en)}
                    placeholder={__CONSTANTS.firstSegment.content.secondSegmentContainer.content.firstInput.title.en}
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
            value={__CONSTANTS.submitInput.state.normal.title.en}
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }}
            forcedDisable={_VALIDATED} />

          <Link
            containerStyle={Styles.QuickLink}
            value={__CONSTANTS.quickLink.title.en}
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
