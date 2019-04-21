import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, I18nManager } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CONTENT = {
      width: width - (32 * 2)
    },
    _CUSTOM_LANGUAGE_HANDLER_BUTTON = {
      padding: 10,
      marginLeft: 15
    },
    _CUSTOM_LANGUAGE_HANDLER_BUTTON_ICON = {
      height: 20
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CONTENT.width = width - (202 * 2);

    _CUSTOM_LANGUAGE_HANDLER_BUTTON.padding += 3;
    _CUSTOM_LANGUAGE_HANDLER_BUTTON_ICON.height += 7;
  }else{
    _CUSTOM_LANGUAGE_HANDLER_BUTTON_ICON.height += 1;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CONTENT.width = width - (162 * 2);

    _CUSTOM_LANGUAGE_HANDLER_BUTTON_ICON.height += 2;
  }
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    alignItems: 'center'
  },
  TailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr'
  },
  LanguageHandlerButton: {
    height: 'auto',
    ..._CUSTOM_LANGUAGE_HANDLER_BUTTON
  },
  LanguageHandlerButtonIcon: {
    ..._CUSTOM_LANGUAGE_HANDLER_BUTTON_ICON
  },
  Content: {
    position: 'absolute',
    bottom: 0,
    ..._CONTENT
  },
  InputGroup: {
    marginTop: 44
  },
  SubmitButton: {
    marginTop: 15
  },
  QuickLink: {
    marginVertical: 38,
    alignItems: 'center'
  }
});
