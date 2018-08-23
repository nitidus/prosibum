import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../global';
console.log(fonts.sanFrancisco.textHeavy)
module.exports = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.single.blackSqueeze
  },
  helloWorld: {
    fontFamily: fonts.sanFrancisco.textHeavy,
    fontSize: 24,
    color: colors.single.rangoonGreen
  }
});
