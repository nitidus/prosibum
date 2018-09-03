import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import {
  colors, fonts
} from '../../global';

module.exports = StyleSheet.create({
  RTL: {
    direction: 'rtl',
    textAlign: 'right'
  },
  LTR: {
    direction: 'ltr',
    textAlign: 'left'
  }
});
