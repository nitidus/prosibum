import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _INNER_CONTENT = {};

if (width >= 1000 || height >= 1000){
  _INNER_CONTENT = {
    width: (Platform.OS === 'ios')? width - (162 * 2): width - (202 * 2),
    marginHorizontal: (Platform.OS === 'ios')? 162: 202
  };
}else{
  _INNER_CONTENT = {
    width: width - (32 * 2),
    marginHorizontal: 32
  };
}

module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze,
    alignItems: 'center'
  },
  Content: {
    position: 'absolute',
    bottom: 0
  },
  InnerContent: {
    ..._INNER_CONTENT
  },
  Headline: {
    marginTop: 47
  },
  FirstCarousel: {
    marginTop: 44,
    flexDirection: 'row'
  },
  FirstCarouselLoading: {
    marginHorizontal: _INNER_CONTENT.marginHorizontal
  },
  FirstInputGroup: {
    marginTop: 15
  },
  SecondInputGroup: {
    marginTop: 15
  },
  SubmitButton: {
    marginTop: 15
  },
  QuickLink: {
    marginVertical: 38,
    alignItems: 'center'
  }
});
