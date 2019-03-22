import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
  }
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
    padding: 20,
    flexDirection: 'row',
    borderRadius: 5,
    height: 59,
    marginBottom: 15,
    backgroundColor: colors.single.mercury
  },
  DefaultTextStyle: {
    flexGrow: 1,
    display: 'flex',
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 15,
    color: colors.single.rangoonGreen
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
  }
});
