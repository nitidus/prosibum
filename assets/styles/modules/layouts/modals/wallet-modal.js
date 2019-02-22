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
  ModalContainer: {
    paddingHorizontal: 0
  },
  ModalMajorContent: {
    alignItems: 'center',
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal
  },
  Content: {
    ..._CUSTOM_CONTENT
  },
  WalletContainer: {
    marginBottom: 15,
    flexDirection: 'row'
  },
  WalletItemContainer: {
    height: 'auto',
    padding: 18
  },
  WalletItemTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 26,
    marginBottom: 3
  },
  WalletItemSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 14
  },
  WalletNameInput: {
    width: width - (_CUSTOM_CONTENT.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal,
    marginBottom: 15
  },
  NormalContent: {
    width: width - (_CUSTOM_CONTENT.marginHorizontal * 2),
    marginHorizontal: _CUSTOM_CONTENT.marginHorizontal
  },
  DetailContainer: {
    height: 'auto',
    marginBottom: _CUSTOM_CONTENT.marginVertical
  },
  DetailItemContainer: {
    height: 160,
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
  BriefDetailSubRowIconContainer: {
    marginRight: 15
  },
  BriefDetailTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 26,
    width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 5)) - 65),
    marginBottom: 15
  },
  BriefDetailSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 14,
    width: ((width - (_CUSTOM_CONTENT.marginHorizontal * 5)) - 65),
  },
  BriefDetailRowContainer: {

  },
  BriefDetailRowText: {
    color: colors.single.romance,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 14
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
