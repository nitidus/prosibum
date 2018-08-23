import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  colors, fonts
} from '../../global';

module.exports = StyleSheet.create({
  TextInputContainer: {
    marginVertical: 25
  },
  TextInputLabel: {
    fontFamily: fonts.sanFrancisco.displayMedium,
    fontSize: 20
  },
  TextInput: {
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: colors.solitude,
    fontFamily: fonts.sanFrancisco.displayMedium,
    fontSize: 18,
    color: colors.valentino,
    paddingHorizontal: 14
  },
  ButtonContainer: {
    backgroundColor: colors.solitude,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    borderRadius: 3
  },
  ButtonLabel: {
    fontFamily: fonts.sanFrancisco.displaySemibold,
    fontSize: 18,
    color: colors.valentino
  }
});
