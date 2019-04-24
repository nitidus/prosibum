import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, I18nManager } from 'react-native';

import { colors, fonts } from '../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 15
    },
    _CUSTOM_BRIEF_DETAIL_TITLE = {
      fontSize: 26
    },
    _CUSTOM_BRIEF_DETAIL_SUBTITLE = {
      fontSize: 32
    },
    _CUSTOM_BRIEF_DETAIL_CONTAINER = {
      height: 122,
      padding: 18
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 8;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 9;

    _CUSTOM_BRIEF_DETAIL_CONTAINER.height += 30;
    _CUSTOM_BRIEF_DETAIL_CONTAINER.padding += 6;
  }else{
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 3;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 4;

    _CUSTOM_BRIEF_DETAIL_CONTAINER.height += 5;
    _CUSTOM_BRIEF_DETAIL_CONTAINER.padding += 3;
  }

  _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = '500';
  _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = '500';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;
  }
}

module.exports = StyleSheet.create({
  Container: {
    justifyContent: 'center'
  },
  CarouselContainer: {
    direction: 'ltr'
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  DetailContainer: {
    height: 'auto',
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    marginTop: _CUSTOM_CONTENT.marginVertical
  },
  BriefDetailContainer: {
    ..._CUSTOM_BRIEF_DETAIL_CONTAINER
  },
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailSubtitle: {
    color: colors.single.romance,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  }
});
