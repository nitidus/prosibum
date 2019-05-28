import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions, I18nManager } from 'react-native';

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
    _CUSTOM_BRIEF_DETAIL_TITLE = {
      fontSize: 26,
      marginBottom: 15
    },
    _CUSTOM_BRIEF_DETAIL_SUBTITLE = {
      fontSize: 14
    },
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT = {
      fontSize: 14
    };

_CUSTOM_BRIEF_DETAIL_ROW_TEXT[((I18nManager.isRTL)? 'marginRight': 'marginLeft')] = 15;

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 202;

    _CUSTOM_WALLET_ITEM_TITLE.fontSize += 5;
    _CUSTOM_WALLET_ITEM_SUBTITLE.fontSize += 5;

    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 6;
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontSize += 3;
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontSize += 3;
  }else{
    _CUSTOM_WALLET_ITEM_TITLE.fontSize += 2;
    _CUSTOM_WALLET_ITEM_SUBTITLE.fontSize += 2;

    _CUSTOM_BRIEF_DETAIL_TITLE.fontSize += 1;
  }

  if (!I18nManager.isRTL){
    _CUSTOM_WALLET_ITEM_TITLE.fontWeight = '500';
    _CUSTOM_WALLET_ITEM_SUBTITLE.fontWeight = '500';

    _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = '500';
    _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = '500';
    _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontWeight = '500';
  }
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CONTENT.marginHorizontal = 162;
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
    height: 118,
    padding: 18
  },
  WarningContainer: {
    height: 'auto',
    width: width - (_CUSTOM_CONTENT.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    marginBottom: _CUSTOM_CONTENT.marginBottom,
    backgroundColor: colors.pair.ongerine.orangeYellow,
    padding: 18
  },
  WarningContent: {
    textAlign: 'center'
  },
  DetailItemContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  DetailItemMasterInfoContent: {
    width: '100%',
    justifyContent: 'center'
  },
  DetailItemMasterSubInfoContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  BriefDetailTitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2.5)) - 65),
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailSubtitle: {
    direction: (I18nManager.isRTL)? 'rtl': 'ltr',
    textAlign: 'left',
    color: colors.single.rangoonGreen,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2.5)) - 65),
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BriefDetailRowContainer: {

  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: (I18nManager.isRTL)? fonts.vazir.bold: fonts.sanFrancisco.textBold,
    marginLeft: _CUSTOM_CONTENT.marginVertical,
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
