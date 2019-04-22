import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, I18nManager } from 'react-native';

import { Functions } from '../../../modules/index';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTAINER = {
      width: width,
      height: 70,
      borderRadius: 5,
      bottom: 0
    },
    _CUSTOM_PIN_DEFAULT_BUTTON_NAVIGATOR_CONTAINNER = {
      width: 50,
      height: 50
    },
    _CUSTOM_PIN_TITLE = {
      fontSize: 22,
      marginBottom: 3
    },
    _CUSTOM_PIN_SUBTITLE = {
      fontSize: 13
    };

if (Platform.OS === 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER.height += 5;

    _CUSTOM_PIN_DEFAULT_BUTTON_NAVIGATOR_CONTAINNER.width += 4;
    _CUSTOM_PIN_DEFAULT_BUTTON_NAVIGATOR_CONTAINNER.height += 4;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTAINER.height += 18;

    _CUSTOM_PIN_DEFAULT_BUTTON_NAVIGATOR_CONTAINNER.width += 12;
    _CUSTOM_PIN_DEFAULT_BUTTON_NAVIGATOR_CONTAINNER.height += 12;

    _CUSTOM_PIN_TITLE.fontSize += 6;

    _CUSTOM_PIN_SUBTITLE.fontSize += 3;
  }else{
    _CUSTOM_PIN_TITLE.fontSize += 2;

    _CUSTOM_PIN_SUBTITLE.fontSize += 1;
  }

  _CUSTOM_PIN_TITLE.fontWeight = 'bold';
  _CUSTOM_PIN_SUBTITLE.fontWeight = 'bold';
}

module.exports = StyleSheet.create({
  Container: {
    overflow: 'hidden',
    position: 'absolute',
    backgroundColor: Functions._convertHexColorToRGBA(colors.single.mercury, 0.85),
    ..._CUSTOM_CONTAINER
  },
  GradientContainer: {
    flex: 1
  },
  BluredContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  ContainerDefaultStyle: {
    padding: 12,
    justifyContent: 'center'
  },
  PinContent: {
    flexDirection: 'row',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr'
  },
  PinDefaultContentItemContainer: {
    flexGrow: 1
  },
  PinDefaultButtonNavigatorContainer: {
    backgroundColor: colors.single.romance,
    ..._CUSTOM_PIN_DEFAULT_BUTTON_NAVIGATOR_CONTAINNER
  },
  PinTitle: {
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    textAlign: 'left',
    ..._CUSTOM_PIN_TITLE
  },
  PinSubtitle: {
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    textAlign: 'left',
    ..._CUSTOM_PIN_SUBTITLE
  }
});
