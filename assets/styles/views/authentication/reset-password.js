import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    },
    _CONTENT = {
      width: width - (32 * 2)
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CONTENT.width = width - (202 * 2);
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CONTENT.width = width - (162 * 2);
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    alignItems: 'center'
  },
  ContentContainer: {
    ..._CUSTOM_CONTENT
  },
  Content: {
    position: 'absolute',
    bottom: 0,
    ..._CONTENT
  },
  WarningContainer: {
    height: 'auto',
    marginBottom: _CUSTOM_CONTENT.marginBottom,
    backgroundColor: colors.pair.ongerine.orangeYellow,
    marginTop: 15,
    padding: 18
  },
  WarningContent: {
    textAlign: 'center'
  },
  ErrorContainer: {
    backgroundColor: colors.single.carminePink
  },
  ErrorContent: {
    color: colors.single.romance
  },
  InputGroup: {
    marginTop: 44
  },
  FirstInput: {
    marginTop: 44
  },
  Headline: {
    marginTop: 47
  },
  SubmitButton: {
    marginTop: 15
  },
  QuickLink: {
    marginVertical: 38,
    alignItems: 'center'
  }
});
