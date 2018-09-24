import React, { Component } from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { Functions } from '../../../modules/index';

import {
  colors, fonts
} from '../../global';

const { width, height } = Dimensions.get('window');

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
    height: 90,
    paddingHorizontal: 15,
    paddingVertical: 18
  },
  CarouselItemTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 26
  },
  CarouselItemSubtitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 14,
    marginTop: 7
  },
  changeButton: {
    marginTop: 15,
    marginHorizontal: 19
  }
});
