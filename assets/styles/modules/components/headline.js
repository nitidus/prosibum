import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, I18nManager } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_TITLE = {
      fontSize: 34
    },
    _CUSTOM_SUBTITLE = {
      fontSize: 20
    };

if (width >= 1000 || height >= 1000){
  _CUSTOM_TITLE.fontSize += 10;
  _CUSTOM_SUBTITLE.fontSize += 7;
}

if (Platform.OS !== 'ios'){
  _CUSTOM_TITLE.fontWeight = 'bold';
  _CUSTOM_SUBTITLE.fontWeight = '400';
}

module.exports = StyleSheet.create({
  Container: {

  },
  Title: {
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    textAlign: 'center',
    ..._CUSTOM_TITLE
  },
  Subtitle: {
    fontFamily: (I18nManager.isRTL)? fonts.vazir.medium: fonts.sanFrancisco.textMedium,
    color: colors.single.rangoonGreen,
    textAlign: 'center',
    ..._CUSTOM_SUBTITLE
  }
});
