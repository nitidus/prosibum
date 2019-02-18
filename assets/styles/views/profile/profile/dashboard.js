import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../../global';

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
    justifyContent: 'center'
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  DetailContainer: {
    height: 'auto',
    marginTop: _CUSTOM_CONTENT.marginVertical
  },
  BriefDetailContainer: {
    height: 122,
    padding: 18
  },
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 26
  },
  BriefDetailSubtitle: {
    color: colors.single.romance,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 32
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  }
});
