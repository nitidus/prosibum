import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_TEXT_INPUT_LINK = {
  fontSize: 16
};

if (width >= 1000 || height >= 1000){
  _CUSTOM_TEXT_INPUT_LINK.fontSize += (Platform.OS === 'ios')? 2: 7;
}

if (Platform.OS !== 'ios'){
  _CUSTOM_TEXT_INPUT_LINK.fontWeight = '500';
}

module.exports = StyleSheet.create({
  TextInputLink: {
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.lavenderGray,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    ..._CUSTOM_TEXT_INPUT_LINK
  },
});
