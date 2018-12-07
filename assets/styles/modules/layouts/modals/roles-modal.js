import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM___GLOBAL = {
      marginHorizontal: 19,
      marginBottom: 15
    }

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){

  }
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0
  },
  RolesMajorContainer: {
    alignItems: 'center'
  },
  RolesContainer: {
    marginBottom: _CUSTOM___GLOBAL.marginBottom
  },
  RolesCountInput: {
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal,
    marginBottom: _CUSTOM___GLOBAL.marginBottom
  },
  AppendRolesButton: {
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal
  },
  __Global: {
    ..._CUSTOM___GLOBAL
  }
});
