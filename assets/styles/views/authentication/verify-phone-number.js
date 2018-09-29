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
    width: 311,
    bottom: 0
  },
  FirstInput: {
    marginTop: 44
  },
  Headline: {
    marginTop: 47
  },
  SubmitButton: {
    marginTop: 15
  },
  QuickLink: {
    marginVertical: 38,
    alignItems: 'center'
  }
});
