import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){

  }
}

module.exports = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    padding: 15
  },
  DetailContainer: {
    height: 'auto',
    padding: 18
  },
  BriefDetailContainer: {

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
