import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_SCROLLABLE_CONTAINER = {
      marginHorizontal: 32
    },
    _CUSTOM_BUTTON_TITLE = {
      fontSize: 18
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
  _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal = 202;

  _CUSTOM_BUTTON_TITLE.fontSize += 7;
  }

  _CUSTOM_BUTTON_TITLE.fontWeight = '500';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal = 162;
  }
}

module.exports = StyleSheet.create({
  ScrollableContainer: {
    marginTop: 15,
    justifyContent: 'space-between'
  },
  GlobalMeasurements: {
    ..._CUSTOM_SCROLLABLE_CONTAINER
  },
  SingleInput: {
    marginBottom: 15,
    marginHorizontal: _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal
  },
  BrandRoleCarouselContainer: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  BrandRoleCarouselErrorContainer: {
    width: width - (_CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_SCROLLABLE_CONTAINER.marginHorizontal,
    backgroundColor: colors.single.carminePink
  },
  BrandRoleCarouselErrorContent: {
    color: colors.single.romance,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BUTTON_TITLE
  }
});
