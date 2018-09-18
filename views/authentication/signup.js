import React, { Component } from 'react';
import { StatusBar, View, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { ActivityIndicator, Toast } from '../../assets/layouts/index';
const Styles = Views.Authentication.Signup;

import { Functions } from '../../assets/modules/index';

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Signup;

class Signup extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    props.fetchAvailableUserGroups('Wholesaler');
  }

  render() {
    const { props } = this;

    const _CURRENT_USER_GROUP = props.signup.userGroups.findIndex((userGroup) => {
      const _USER_GROUP_ROLE = userGroup.role,
            _CURRENT_USER_GROUP_ROLE = props.signup.userGroup.role;

      return (_CURRENT_USER_GROUP_ROLE === _USER_GROUP_ROLE)
    });

    var _CAROUSEL_CONTENT, _TOP_PINNED_TOAST;

    if (props.signup.loading){
      _CAROUSEL_CONTENT = <Input
        type="BUTTON"
        name="carrousel_loading"
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
        name="group"
        data={props.signup.userGroups}
        currentCard={props.signup.userGroup}
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
          props.setUserGroup(props.signup.userGroups[selectedItemIndex])
        }}/>;
    }


    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        {_TOP_PINNED_TOAST}

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
                  type="TEXT"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={props.signup.phoneNumber}
                  onChangeText={(currentValue) => props.setPhoneNumber(currentValue)} />
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

              <Input
                style={Styles.SubmitButton}
                type="BUTTON"
                name="signup"
                value="Signup"
                gradient={Global.colors.pair.ongerine}
                onPress={() => {
                  alert('ok')
                }}
                forcedDisable={!props.signup.connected.status} />

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
