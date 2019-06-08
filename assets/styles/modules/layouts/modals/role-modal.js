import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM___GLOBAL = {
      width: width - (32 * 2),
      marginHorizontal: 32
    },
    _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 32
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM___GLOBAL.width = width - (202 * 2);
    _CUSTOM___GLOBAL.marginHorizontal = 202;

    _CUSTOM_CONTENT.marginHorizontal = 202;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM___GLOBAL.width = width - (162 * 2);
    _CUSTOM___GLOBAL.marginHorizontal = 162;

    _CUSTOM_CONTENT.marginHorizontal = 162;
  }
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  ModalMajorContent: {
    alignItems: 'center',
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal,
    marginBottom: 15
  },
  RolesContainer: {
    direction: 'ltr',
    marginBottom: 15,
    flexDirection: 'row'
  },
  WarningContainer: {
    height: 'auto',
    width: width - (_CUSTOM_CONTENT.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    marginBottom: _CUSTOM_CONTENT.marginBottom,
    backgroundColor: colors.pair.ongerine.orangeYellow,
    padding: 18
  },
  WarningContent: {
    textAlign: 'center'
  },
  TokenInput: {
    width: width - (_CUSTOM___GLOBAL.marginHorizontal * 2),
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal,
    marginBottom: 15
  },
  AppendRolesButton: {
    width: width - (_CUSTOM___GLOBAL.marginHorizontal * 2),
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal
  },
  EmptyContent: {
    alignItems: 'center',
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal
  },
  __Global: {
    ..._CUSTOM___GLOBAL
  }
});
