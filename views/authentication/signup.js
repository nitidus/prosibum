import React, { Component } from 'react';
import { StatusBar, View, Dimensions, Platform, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { Headline, Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { ActivityIndicator, Toast, CountriesCodesModal } from '../../assets/layouts/index';
const Styles = Views.Authentication.Signup;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Signup;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.signup;

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
        type={__CONSTANTS.firstCarouselContainer.content.self.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.content.self.state.loading.title.en)}
        gradient={Global.colors.pair.ongerine}
        style={[
          Styles.FirstCarousel,
          Styles.FirstCarouselLoading
        ]}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (!props.signup.connected.status){
        _TOP_PINNED_TOAST = <Toast
          message={props.signup.connected.content}
          launched={!props.signup.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => props.fetchAvailableUserGroups('Wholesaler')} />;
      }

      _CAROUSEL_CONTENT = <Carousel
        name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.title.en)}
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
                type={__CONSTANTS.firstCarouselContainer.content.self.type}
                name={_ITEM_NAME}
                value={_ITEM_VALUE}
                gradient={Global.colors.pair.ongerine}
                disable={true}/>
            );
          }else{
            return (
              <Input
                type={__CONSTANTS.firstCarouselContainer.content.self.type}
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
        type={__CONSTANTS.submitInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.loading.title.en)}
        gradient={Global.colors.pair.ongerine}
        style={Styles.SubmitButton}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (!props.signup.connected.status && !_VALIDATED){
        _TOP_PINNED_TOAST = <Toast
          message={props.signup.connected.content}
          launched={!props.signup.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => Preparation._prepareSignupComponentToSubmit(props)} />;
      }

      _SUBMIT_BUTTON_CONTENT = <Input
        style={Styles.SubmitButton}
        type={__CONSTANTS.submitInput.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
        value={__CONSTANTS.submitInput.state.normal.title.en}
        gradient={Global.colors.pair.ongerine}
        onPress={() => Preparation._prepareSignupComponentToSubmit(props)}
        forcedDisable={_VALIDATED} />;
    }

    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        {_TOP_PINNED_TOAST}

        <CountriesCodesModal
          name={__CONSTANTS.modals.first.title.en}
          visible={props.signup.countriesCodesModalVisibility}
          onBlur={(status) => props.setCountriesCodesModalVisibility(status)}
          selectedItem={props.signup.phone.dialCode}
          onPress={(currentValue) => props.setPhoneNumber({
            dialCode: currentValue
          })} />

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title={__CONSTANTS.headline.title.en}
            subtitle={__CONSTANTS.headline.subtitle.en} />

          {_CAROUSEL_CONTENT}

          <View
            style={Styles.InnerContent}>
              <InputGroup
                style={Styles.FirstInputGroup}>
                  <Input
                    type={__CONSTANTS.firstInputGroup.first.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.first.title.en)}
                    placeholder={__CONSTANTS.firstInputGroup.first.title.en}
                    value={props.signup.firstName}
                    onChangeText={(currentValue) => props.setFirstName(currentValue)} />
                  <Input
                    type={__CONSTANTS.firstInputGroup.second.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.firstInputGroup.second.title.en)}
                    placeholder={__CONSTANTS.firstInputGroup.second.title.en}
                    value={props.signup.lastName}
                    onChangeText={(currentValue) => props.setLastName(currentValue)} />
              </InputGroup>

              <InputGroup
                style={Styles.SecondInputGroup}>
                <Input
                  type={__CONSTANTS.secondInputGroup.first.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.secondInputGroup.first.title.en)}
                  placeholder={__CONSTANTS.secondInputGroup.first.title.en}
                  value={props.signup.phone.number}
                  link={props.signup.phone.dialCode.area_code}
                  onPress={() => props.setCountriesCodesModalVisibility(true)}
                  onChangeText={(currentValue) => props.setPhoneNumber({
                    number: currentValue
                  })} />
                <Input
                  type={__CONSTANTS.secondInputGroup.second.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.secondInputGroup.second.title.en)}
                  placeholder={__CONSTANTS.secondInputGroup.second.title.en}
                  value={props.signup.email}
                  onChangeText={(currentValue) => props.setEmail(currentValue)} />
                <Input
                  type={__CONSTANTS.secondInputGroup.third.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.secondInputGroup.third.title.en)}
                  placeholder={__CONSTANTS.secondInputGroup.third.title.en}
                  value={props.signup.password}
                  onChangeText={(currentValue) => props.setPassword(currentValue)} />
              </InputGroup>

              {_SUBMIT_BUTTON_CONTENT}

              <Link
                containerStyle={Styles.QuickLink}
                value={__CONSTANTS.quickLink.title.en}
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
