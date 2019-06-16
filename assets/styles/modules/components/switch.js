import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_BUTTON_CONTAINER = {
      minHeight: 59,
      padding: 15
    },
    _CONTENT_TITLE = {
      fontSize: 16,
      marginTop: 3,
      marginLeft: 15
    },
    _CONTENT_SUBITLE = {
      fontSize: 16,
      marginTop: 10,
      marginLeft: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_BUTTON_CONTAINER.minHeight += 20;

    _CONTENT_TITLE.fontSize += 7;
    _CONTENT_TITLE.marginTop += 7;

    _CONTENT_SUBITLE.fontSize += 7;
    _CONTENT_SUBITLE.marginTop += 7;
  }

  if (!I18nManager.isRTL){
    _CONTENT_TITLE.fontWeight = '500';
    _CONTENT_SUBITLE.fontWeight = '500';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CONTENT_TITLE.fontSize += 2;
    _CONTENT_TITLE.marginTop += 1;

    _CONTENT_SUBITLE.fontSize += 2;
    _CONTENT_SUBITLE.marginTop += 1;
  }
}

module.exports = StyleSheet.create({
  Container: {
    backgroundColor: colors.single.mercury,
    height: 'auto',
    alignItems: 'flex-start',
    flexDirection: 'column',
    ..._CUSTOM_BUTTON_CONTAINER
  },
  Content: {
    flexDirection: 'row'
  },
  ToggleContent: {
    backgroundColor: colors.single.romance,
    height: _CUSTOM_BUTTON_CONTAINER.minHeight - 25,
    width: _CUSTOM_BUTTON_CONTAINER.minHeight - 25,
    borderRadius: 100
  },
  ContentTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    ..._CONTENT_TITLE
  },
  ContentSubtitle: {
    color: colors.single.aluminium,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: (I18nManager.isRTL)? 'right': 'left',
    ..._CONTENT_SUBITLE
  }
});
