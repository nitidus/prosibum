import React, { Component } from 'react';
import { StatusBar, View, Dimensions, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { ActivityIndicator, Toast, CountriesCodesModal } from '../../assets/layouts/index';
const Styles = Views.Authentication.Signup;

import { Functions } from '../../assets/modules/index';

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Signup;

import { GLOBAL } from '../../assets/flows/states/types/index';

class Signup extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    props.fetchAvailableUserGroups('Wholesaler');
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.signup,
          _CONNECTED_STATUS = _PROPS.connected.status;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.firstName != '' && _PROPS.lastName != '' && _PROPS.userGroup != '' && _PROPS.phone.number != '' && _PROPS.phone.dialCode.area_code != '' && _PROPS.email != '' && _PROPS.password != ''){
      const _IS_EMAIL_VALID = Functions._checkIsAValidEmail(_PROPS.email),
            _IS_PHONE_NUMBER_VALID = Functions._checkIsAValidPhoneNumber(_PROPS.phone.number),
            _IS_PASSWORD_VALID = Functions._checkIsAValidPassword(_PROPS.password);

      if (_IS_EMAIL_VALID && _IS_PHONE_NUMBER_VALID && _IS_PASSWORD_VALID){
        _FORM_FIELDS_VALIDITY = true;
      }
    }

    return !(_CONNECTED_STATUS && _FORM_FIELDS_VALIDITY);
  }

  async __prepareComponentToSubscribeTheUser() {
    const { props } = this,
          { navigation } = props,
          _SEED = Functions._prepareSignupSeed(props.signup);

    await props.subscribeTheUser(_SEED);

    navigation.navigate('VerifyPhoneNumber');
  }

  async __prepareComponentToRegenerateTheUserPhoneNumberValidationToken(sentProps) {
    const { props } = this,
          { navigation } = props;

    var _SEED = {
      user_id: sentProps._id
    },
    _CURRENT_PHONE_NUMBER = `${props.signup.phone.dialCode.area_code}${Functions._getRidOfZerosFromPhoneNumber(props.signup.phone.number)}`;

    if (sentProps.phone.mobile.content !== _CURRENT_PHONE_NUMBER){
      _SEED.phone_number = _CURRENT_PHONE_NUMBER;
    }

    await props.regenerateTheUserPhoneNumberValidationToken(_SEED);

    navigation.navigate('VerifyPhoneNumber');
  }

  async _prepareComponentToSubmit() {
    const { props } = this,
          { navigation } = props;

    Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER)
    .then((didRetrieve) => {
      if (didRetrieve === false){
        this.__prepareComponentToSubscribeTheUser();
      }else{
        const _TOKEN = JSON.parse(didRetrieve);

        if (typeof _TOKEN.phone != 'undefined'){
          const _TOKEN_MOBILE_PHONE = _TOKEN.phone.mobile;

          if (typeof _TOKEN_MOBILE_PHONE != 'undefined'){
            const _TOKEN_MOBILE_PHONE_VALIDATION_VALUE = _TOKEN_MOBILE_PHONE.validation.value;

            if (_TOKEN_MOBILE_PHONE_VALIDATION_VALUE === true){
              navigation.goBack();
            }else{
              const _TODAY = new Date(),
                    _VALIDATION_DATE = new Date(_TOKEN_MOBILE_PHONE.validation.modified_at),
                    _TWO_MINUTES = (1000 * 60 * 2),
                    _VALIDATION_TOKEN_TIME_LEFT = _TODAY.getTime() - _VALIDATION_DATE.getTime();

              if (_VALIDATION_TOKEN_TIME_LEFT > _TWO_MINUTES){
                Functions._retrieveDataWithKey(GLOBAL.STORAGE.SUBSCRIBE_DEPEND_ON_PHONE_NUMBER)
                .then((secondDidRetrieve) => {
                  if (secondDidRetrieve !== false){
                    const _TARGET = JSON.parse(secondDidRetrieve);

                    this.__prepareComponentToRegenerateTheUserPhoneNumberValidationToken(_TARGET);
                  }
                })
                .catch((secondDidErrorOccureOnRetrieve) => {

                })
              }else{
                navigation.navigate('VerifyPhoneNumber');
              }
            }
          }
        }
      }
    })
    .catch((didErrorOccureOnRetrieve) => {

    })
  }

  render() {
    const { props } = this;

    const _CURRENT_USER_GROUP = props.signup.userGroups.findIndex((userGroup) => {
      const _USER_GROUP_ROLE = userGroup.role,
            _CURRENT_USER_GROUP_ROLE = props.signup.userGroup.role;

      return (_CURRENT_USER_GROUP_ROLE === _USER_GROUP_ROLE)
    });

    var _CAROUSEL_CONTENT, _SUBMIT_BUTTON_CONTENT, _TOP_PINNED_TOAST;

    if (props.signup.loadingUserGroups){
      _CAROUSEL_CONTENT = <Input
        type="BUTTON"
        name="carrousel-loading"
        gradient={Global.colors.pair.ongerine}
        style={[
          Styles.FirstCarousel,
          Styles.FirstCarouselLoading
        ]}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (props.signup.connected.status){
        _TOP_PINNED_TOAST = <Toast
          launched={!props.signup.connected.status} />;
      }else{
        _TOP_PINNED_TOAST = <Toast
          message={props.signup.connected.content}
          launched={!props.signup.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => props.fetchAvailableUserGroups('Wholesaler')} />;
      }

      _CAROUSEL_CONTENT = <Carousel
        name="user-group"
        data={props.signup.userGroups}
        style={Styles.FirstCarousel}
        itemWidth={_SCREEN.width - (Styles.InnerContent.marginHorizontal * 2)}
        firstItem={_CURRENT_USER_GROUP}
        onLayout={({ item, i }) => {
          var _CURRENT_USER_GROUP = props.signup.userGroup,
              _INACTIVE_STYLE = {
                backgroundColor: Global.colors.single.wildSand
              },
              _ITEM_NAME = item.role.toLowerCase(),
              _ITEM_VALUE = Functions._convertKeywordToToken(_ITEM_NAME);

          if (_CURRENT_USER_GROUP.role === item.role){
            return (
              <Input
                type="BUTTON"
                name={_ITEM_NAME}
                value={_ITEM_VALUE}
                gradient={Global.colors.pair.ongerine}
                disable={true}/>
            );
          }else{
            return (
              <Input
                type="BUTTON"
                name={_ITEM_NAME}
                value={_ITEM_VALUE}
                style={_INACTIVE_STYLE}
                disable={true}/>
            );
          }
        }}
        onSnap={(selectedItemIndex) => {
          props.setUserGroup(props.signup.userGroups[selectedItemIndex]);
        }}/>;
    }

    const _VALIDATED = this._componentWillCheckValidation(props);

    if (props.signup.loadingSubscribe){
      _SUBMIT_BUTTON_CONTENT = <Input
        type="BUTTON"
        name="signup-loading"
        gradient={Global.colors.pair.ongerine}
        style={Styles.SubmitButton}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (props.signup.connected.status){
        _TOP_PINNED_TOAST = <Toast
          launched={!props.signup.connected.status} />;
      }else{
        _TOP_PINNED_TOAST = <Toast
          message={props.signup.connected.content}
          launched={!props.signup.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => () => this._prepareComponentToSubmit()} />;
      }

      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type="BUTTON"
        name="signup"
        value="Signup"
        gradient={Global.colors.pair.ongerine}
        onPress={() => this._prepareComponentToSubmit()}
        forcedDisable={_VALIDATED} />;
    }

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        {_TOP_PINNED_TOAST}

        <CountriesCodesModal
          name="countries-codes-modal"
          visible={props.signup.countriesCodesModalVisibility}
          onBlur={(status) => props.setCountriesCodesModalVisibility(status)}
          selectedItem={props.signup.phone.dialCode}
          onPress={(currentValue) => props.setPhoneNumber({
            dialCode: currentValue
          })} />

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title="Dear User"
            subtitle={"Please enter your\nuser account details."} />

          {_CAROUSEL_CONTENT}

          <View
            style={Styles.InnerContent}>
              <InputGroup
                style={Styles.FirstInputGroup}>
                  <Input
                    type="TEXT"
                    name="firstName"
                    placeholder="First Name"
                    value={props.signup.firstName}
                    onChangeText={(currentValue) => props.setFirstName(currentValue)} />
                  <Input
                    type="TEXT"
                    name="lastName"
                    placeholder="Last Name"
                    value={props.signup.lastName}
                    onChangeText={(currentValue) => props.setLastName(currentValue)} />
              </InputGroup>

              <InputGroup
                style={Styles.SecondInputGroup}>
                <Input
                  type="PHONE-LINK"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={props.signup.phone.number}
                  link={props.signup.phone.dialCode.area_code}
                  onPress={() => props.setCountriesCodesModalVisibility(true)}
                  onChangeText={(currentValue) => props.setPhoneNumber({
                    number: currentValue
                  })} />
                <Input
                  type="EMAIL"
                  name="email"
                  placeholder="Email"
                  value={props.signup.email}
                  onChangeText={(currentValue) => props.setEmail(currentValue)} />
                <Input
                  type="PASSWORD"
                  name="password"
                  placeholder="Password"
                  value={props.signup.password}
                  onChangeText={(currentValue) => props.setPassword(currentValue)} />
              </InputGroup>

              {_SUBMIT_BUTTON_CONTENT}

              <Link
                containerStyle={Styles.QuickLink}
                value="Already have an account?"
                onPress={() => {
                  const { navigation } = this.props;

                  // props.setEmail('');
                  // props.setPassword('');

                  navigation.goBack();
                }} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
