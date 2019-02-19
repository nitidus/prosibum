import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM___GLOBAL = {
  marginBottom: 15
};

if (width >= 1000 || height >= 1000){
  _CUSTOM___GLOBAL = {
    ..._CUSTOM___GLOBAL,
    width: (Platform.OS === 'ios')? width - (162 * 2): width - (202 * 2),
    marginHorizontal: (Platform.OS === 'ios')? 162: 202
  };
}else{
  _CUSTOM___GLOBAL = {
    ..._CUSTOM___GLOBAL,
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
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal
  },
  WalletContainer: {
    marginBottom: 15,
    flexDirection: 'row'
  },
  WalletItemContainer: {
    height: 'auto',
    padding: 18
  },
  WalletItemTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 26,
    marginBottom: 3
  },
  WalletItemSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 14
  },
  WalletNameInput: {
    width: width - (_CUSTOM___GLOBAL.marginHorizontal * 2),
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal,
    marginBottom: 15
  },
  NormalContent: {
    width: width - (_CUSTOM___GLOBAL.marginHorizontal * 2),
    marginHorizontal: _CUSTOM___GLOBAL.marginHorizontal
  },
  Center_ContentAlignment: {
    alignItems: 'flex-start'
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  },
  __Global: {
    ..._CUSTOM___GLOBAL
  }
});
