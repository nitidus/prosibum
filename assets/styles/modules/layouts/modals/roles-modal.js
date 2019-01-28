import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM___GLOBAL = {};

if (width >= 1000 || height >= 1000){
  _CUSTOM___GLOBAL = {
    width: (Platform.OS === 'ios')? width - (162 * 2): width - (202 * 2),
    marginHorizontal: (Platform.OS === 'ios')? 162: 202
  };
}else{
  _CUSTOM___GLOBAL = {
    width: width - (32 * 2),
    marginHorizontal: 32
  };
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0
  },
  ModalMajorContent: {
    alignItems: 'center',
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal,
    marginBottom: 15
  },
  RolesContainer: {
    marginBottom: 15,
    flexDirection: 'row'
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
  __Global: {
    ..._CUSTOM___GLOBAL
  }
});
