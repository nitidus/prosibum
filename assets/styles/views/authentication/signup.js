import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../global';

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
    width: 311,
    marginHorizontal: 32
  },
  Headline: {
    marginTop: 47
  },
  CarouselItemContainer: {
    borderRadius: 5,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center'
  },
  GradientTypeCarouselItemContainer: {

  },
  RegularTypeCarouselItemContainer: {
    backgroundColor: colors.single.chetwodeBlue
  },
  CarouselItemTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 18
  },
  FirstCarousel: {
    marginTop: 44,
    flexDirection: 'row'
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
