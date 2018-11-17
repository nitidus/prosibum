import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../../modules/index';

import {
  colors, fonts
} from '../../../global';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

var _CUSTOM_CAROUSEL_ITEM_CONTAINER = {
      height: 90,
      paddingHorizontal: 15
    },
    _CUSTOM_CAROUSEL_ITEM_TITLE = {
      fontSize: 26
    },
    _CUSTOM_CAROUSEL_ITEM_SUBTITLE = {
      fontSize: 14
    };

if (Platform.OS !== 'ios'){
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CAROUSEL_ITEM_CONTAINER.height += 25;
    _CUSTOM_CAROUSEL_ITEM_CONTAINER.paddingHorizontal += 7;

    _CUSTOM_CAROUSEL_ITEM_TITLE.fontSize += 6;
    _CUSTOM_CAROUSEL_ITEM_SUBTITLE.fontSize += 6;
  }else{
    _CUSTOM_CAROUSEL_ITEM_CONTAINER.height += 10;
    _CUSTOM_CAROUSEL_ITEM_CONTAINER.paddingHorizontal += 3;

    _CUSTOM_CAROUSEL_ITEM_SUBTITLE.fontSize += 1;
  }

  _CUSTOM_CAROUSEL_ITEM_TITLE.fontWeight = '500';
  _CUSTOM_CAROUSEL_ITEM_SUBTITLE.fontWeight = '500';
}else{
  if (width >= 1000 || height >= 1000){
    _CUSTOM_CAROUSEL_ITEM_CONTAINER.height += 5;
    _CUSTOM_CAROUSEL_ITEM_CONTAINER.paddingHorizontal += 3;

    _CUSTOM_CAROUSEL_ITEM_SUBTITLE.fontSize += 2;
  }
}

module.exports = StyleSheet.create({
  ModalContainer: {
    paddingHorizontal: 0
  },
  Container: {

  },
  CarouselContainer: {
    flexDirection: 'row'
  },
  CarouselItemContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 18,
    ..._CUSTOM_CAROUSEL_ITEM_CONTAINER
  },
  CarouselItemTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    ..._CUSTOM_CAROUSEL_ITEM_TITLE
  },
  CarouselItemSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    marginTop: 7,
    ..._CUSTOM_CAROUSEL_ITEM_SUBTITLE
  },
  changeButton: {
    marginTop: 15,
    marginHorizontal: 19
  }
});
