import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _INNER_CONTENT = {};

var _CONTENT = {
      width: width - (32 * 2)
    },
    _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CONTENT.width = width - (202 * 2);

    _CUSTOM_CONTENT.marginHorizontal = 202;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CONTENT.width = width - (162 * 2);

    _CUSTOM_CONTENT.marginHorizontal = 162;
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    alignItems: 'center'
  },
  Content: {
    position: 'absolute',
    bottom: 0,
    ..._CONTENT
  },
  FirstInputGroupNormalState: {
    marginTop: 44
  },
  FirstInputGroupInvitationState: {
    marginTop: 44,
    marginBottom: 15
  },
  SecondInputGroupInvitationState: {

  },
  SubmitButtonNormalState: {
    marginTop: 15
  },
  SubmitButtonInvitationState: {
    marginTop: 15,
    marginBottom: 38
  },
  QuickLink: {
    marginVertical: 38,
    alignItems: 'center'
  },
  WarningContainer: {
    height: 'auto',
    marginBottom: _CUSTOM_CONTENT.marginBottom,
    backgroundColor: colors.pair.ongerine.orangeYellow,
    padding: 18,
    marginTop: 15
  },
  WarningContent: {
    textAlign: 'center'
  }
});
