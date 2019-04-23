import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, I18nManager } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_ROW = {
      padding: 20,
      borderRadius: 5,
      height: 59,
      marginBottom: 15
    },
    _CUSTOM_DEFAULT_TEXT_STYLE = {
      fontSize: 15
    },
    _CUSTOM_DEFAULT_BACK_BUTTON_TEXT_STYLE = {
      fontSize: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_ROW.height += 18;

    _CUSTOM_DEFAULT_TEXT_STYLE.fontSize += 5;

    _CUSTOM_DEFAULT_BACK_BUTTON_TEXT_STYLE.fontSize += 15;
    _CUSTOM_DEFAULT_BACK_BUTTON_TEXT_STYLE.lineHeight = 25;
  }else{
    _CUSTOM_ROW.height += 5;

    _CUSTOM_DEFAULT_BACK_BUTTON_TEXT_STYLE.fontSize += 10;
    _CUSTOM_DEFAULT_BACK_BUTTON_TEXT_STYLE.lineHeight = 20;
  }

  _CUSTOM_DEFAULT_TEXT_STYLE.fontWeight = 'bold';
}

module.exports = StyleSheet.create({
  Container: {

  },
  RowDefaultState: {
    backgroundColor: colors.single.mercury
  },
  RowSelectedState: {
    backgroundColor: colors.single.lavenderGray
  },
  Row: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    backgroundColor: colors.single.mercury,
    ..._CUSTOM_ROW
  },
  DefaultTextStyle: {
    flexGrow: 1,
    display: 'flex',
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    textAlign: 'left',
    ..._CUSTOM_DEFAULT_TEXT_STYLE
  },
  DefaultBackButtonTextStyle: {
    ..._CUSTOM_DEFAULT_BACK_BUTTON_TEXT_STYLE
  },
  RowTextDefaultState: {
    color: colors.single.rangoonGreen
  },
  RowTextSelectedState: {
    color: colors.single.romance
  },
  DefaultTextStyleLightMode: {
    color: colors.single.rangoonGreen
  },
  DefaultTextStyleDarkMode: {
    color: colors.single.romance
  },
  EmptyContent: {
    marginBottom: 15
  },
  Center_TextAlignment: {
    textAlign: 'center'
  },
  Center_ContentAlignment: {
    alignItems: 'center'
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  }
});
