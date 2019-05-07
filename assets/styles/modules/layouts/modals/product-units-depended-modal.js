import React, { Component } from 'react';
import { StyleSheet, Platform, I18nManager, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CONTENT = {
      marginVertical: 15,
      marginHorizontal: 32
    },
    _CUSTOM_WALLET_ITEM_TITLE = {
      fontSize: 26,
      marginBottom: 3
    },
    _CUSTOM_WALLET_ITEM_SUBTITLE = {
      fontSize: 14
    },
    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER = {
      width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2)) - 42),
      marginBottom: 5
    },
    _CUSTOM_BRIEF_DETAIL_TITLE = {
      fontSize: 26
    },
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX = {
      fontSize: 14,
      marginLeft: 5,
      marginBottom: 3
    },
    _CUSTOM_BRIEF_DETAIL_SUBTITLE = {
      fontSize: 14,
      width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2)) - 42),
      marginBottom: 10
    },
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT = {
      fontSize: 14
    };

_CUSTOM_BRIEF_DETAIL_ROW_TEXT.marginLeft = 15;

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER.width -= 380;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 6;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 6;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 380;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 4;
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontSize += 3;
  }else{
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 3;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 3;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 1;
  }

  if (!I18nManager.isRTL){
    _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = 'bold';
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontWeight = 'bold';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;

    _CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER.width -= 300;
    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 1;
    _CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX.fontSize += 1;

    _CUSTOM_BRIEF_DETAIL_SUBTITLE.width -= 300;
  }
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  DetailContainer: {
    direction: 'ltr',
    height: 'auto',
    marginBottom: _CUSTOM_CONTENT.marginVertical
  },
  DetailItemContainer: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    height: 178,
    padding: 18
  },
  DetailItemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  DetailItemMasterInfoContent: {
    justifyContent: 'center'
  },
  DetailItemMasterSubInfoContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  BriefDetailTitleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    ..._CUSTOM_BRIEF_DETAIL_TITLE_CONTAINER
  },
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailTitleSuffix: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_TITLE_SUFFIX
  },
  BriefDetailSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BriefDetailRowContainer: {

  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    ..._CUSTOM_BRIEF_DETAIL_ROW_TEXT
  },
  BriefDetailRowIcon: {

  },
  Center_TextAlignment: {
    textAlign: 'center'
  },
  Center_ContentAlignment: {
    alignItems: 'center'
  },
  LTR_ContentAlignment: {
    alignItems: 'flex-start'
  },
  RTL_ContentAlignment: {
    alignItems: 'flex-end'
  }
});
