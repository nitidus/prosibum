import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform, Dimensions, Text } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../assets/flows/states/types/index';

import { Global, Views } from '../../assets/styles/index';
import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
import { ActivityIndicator, Toast, CountriesCodesModal } from '../../assets/layouts/index';
const Styles = Views.Authentication.VerifyEmail;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

const _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.VerifyEmail;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.authentication.verify_email;

class VerifyEmail extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {
    const { props } = this,
          { navigation: { state: { params } } } = props;

    if (typeof params != 'undefined'){
      if (Object.keys(params).length > 0){
        if (typeof params.targetToken != 'undefined'){
          props.verifyTheUserEmailAddress(params.targetToken);
        }
      }
    }
  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {

  }

  render() {
    const { props } = this,
          { navigation: { state: { params } } } = props;

    var _MAIN_CONTENT;

    if (props.verifyEmail.verifyTheUserEmailAddressLoading){
      _MAIN_CONTENT = (
        <ActivityIndicator />
      );
    }else{
      var _HEADLINE_SUBTITLE = __CONSTANTS.headline.subtitle.state.normal.en,
          _QUICK_LINK_CONTENT = __CONSTANTS.quickLink.title.state.normal.en;

      if (!props.verifyEmail.connected.status){
        _HEADLINE_SUBTITLE = __CONSTANTS.headline.subtitle.state.disconnect.en;
        _QUICK_LINK_CONTENT = __CONSTANTS.quickLink.title.state.disconnect.en;
      }

      _MAIN_CONTENT = (
        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title={__CONSTANTS.headline.title.en}
            subtitle={_HEADLINE_SUBTITLE} />

          <Link
            containerStyle={Styles.QuickLink}
            value={_QUICK_LINK_CONTENT}
            onPress={() => {
              const { navigation } = props;

              navigation.navigate('Login');
            }} />
        </View>
      );
    }

    const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

    return (
      <KeyboardAvoidingView
        style={Styles.Container}
        behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}>
          <StatusBar hidden={true}/>

          {_MAIN_CONTENT}
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
