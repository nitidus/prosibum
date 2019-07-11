import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;
  }
}

module.exports = StyleSheet.create({
  Container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Content: {
    ..._CUSTOM_CONTENT
  }
});
