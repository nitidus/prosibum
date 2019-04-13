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

    return (
      <Text>ok</Text>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
