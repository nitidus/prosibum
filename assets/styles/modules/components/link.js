import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  colors, fonts
} from '../../global';

module.exports = StyleSheet.create({
  LinkContainer: {
    marginVertical: 30
  },
  LinkLabel: {
    fontFamily: fonts.sanFrancisco.displaySemibold,
    fontSize: 14,
    color: colors.lightningYellow
  }
});
