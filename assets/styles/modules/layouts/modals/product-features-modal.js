import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

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

  _CUSTOM_WALLET_ITEM_TITLE.fontWeight = '500';
  _CUSTOM_WALLET_ITEM_SUBTITLE.fontWeight = '500';

  _CUSTOM_BRIEF_DETAIL_TITLE.fontWeight = '500';
  _CUSTOM_BRIEF_DETAIL_SUBTITLE.fontWeight = '500';
  _CUSTOM_BRIEF_DETAIL_ROW_TEXT.fontWeight = '500';
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
    height: 'auto',
    marginBottom: _CUSTOM_CONTENT.marginVertical
  },
  DetailItemContainer: {
    height: 118,
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
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2.5)) - 65),
    ..._CUSTOM_BRIEF_DETAIL_TITLE
  },
  BriefDetailSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 2.5)) - 65),
    ..._CUSTOM_BRIEF_DETAIL_SUBTITLE
  },
  BriefDetailRowContainer: {

  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: fonts.sanFrancisco.textBold,
    marginLeft: 15,
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