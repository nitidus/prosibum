import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  colors, fonts
} from '../../global';

module.exports = StyleSheet.create({
  ContainerWithoutButton: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 18,
    height: 59,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 5
  },
  ContainerWithButton: {
    borderWidth: 2,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 5
  },
  TextInputConatiner: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 18,
    height: 59,
    paddingHorizontal: 16
  },
  RTL_TextInputLinkContainer: {
    position: 'absolute',
    right: 20
  },
  LTR_TextInputLinkContainer: {
    position: 'absolute',
    left: 20
  },
  TextInputLink: {
    paddingVertical: 20,
    height: 59
  },
  InnerInputContainer: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 18,
    height: 59,
    borderWidth: 0,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 0
  },
  MasterContainer: {
    borderWidth: 2,
    borderColor: colors.single.mercury,
    backgroundColor: colors.single.romance,
    borderRadius: 5,
    overflow: 'hidden'
  },
  ButtonContainer: {
    borderRadius: 5,
    height: 59,
    alignItems: 'center',
    justifyContent: 'center'
  },
  GradientTypeButtonContainer: {

  },
  RegularTypeButtonContainer: {
    backgroundColor: colors.single.chetwodeBlue
  },
  ButtonTitle: {
    color: colors.single.rangoonGreen,
    fontFamily: fonts.sanFrancisco.textBold,
    fontSize: 18
  }
});
