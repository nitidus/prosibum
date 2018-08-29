import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  colors, fonts
} from '../../global';

module.exports = StyleSheet.create({
  Container: {

  },
  Title: {
    fontFamily: fonts.sanFrancisco.textBold,
    color: colors.single.rangoonGreen,
    fontSize: 34,
    textAlign: 'center'
  },
  Subtitle: {
    fontFamily: fonts.sanFrancisco.textMedium,
    color: colors.single.rangoonGreen,
    fontSize: 20,
    textAlign: 'center'
  }
});
