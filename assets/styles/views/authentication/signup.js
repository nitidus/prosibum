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
  FirstCarousel: {
    marginTop: 44,
    flexDirection: 'row'
  },
  FirstCarouselLoading: {
    marginHorizontal: 32
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
