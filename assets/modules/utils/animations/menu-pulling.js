import React, { Component } from 'react';
import { Dimensions, Platform, Animated, Easing, I18nManager } from 'react-native';

const _Screen = Dimensions.get('window'),
      _LAUNCHED_MENU_SCREEN_X_POSITION_IN_PERCENTAGE_FORMAT = (Platform.OS === 'ios')? ((_Screen.width >= 1000 || _Screen.height >= 1000)? 35: 72): ((_Screen.width >= 1000 || _Screen.height >= 1000)? 37.3: 72),
      _LAUNCHED_MENU_SCREEN_X_POSITION_PREREQUISITE = (_Screen.width * _LAUNCHED_MENU_SCREEN_X_POSITION_IN_PERCENTAGE_FORMAT) / 100,
      _LAUNCHED_MENU_SCREEN_X_POSITION = ((I18nManager.isRTL)? (-1 * _LAUNCHED_MENU_SCREEN_X_POSITION_PREREQUISITE): _LAUNCHED_MENU_SCREEN_X_POSITION_PREREQUISITE),
      _X_POSITION_ANIMATION_RANGE = ((I18nManager.isRTL)? [_LAUNCHED_MENU_SCREEN_X_POSITION, 0]: [0, _LAUNCHED_MENU_SCREEN_X_POSITION]);

const _SHARED = {
  _MENU_CARD_PULLING: {
    _TRANSLATION_AND_SCALE_COMBINATION: (animatedValue) => {
      return {
        transform: [
          { translateX: animatedValue },
          {
            scaleX: animatedValue.interpolate({
              inputRange: _X_POSITION_ANIMATION_RANGE,
              outputRange: ((I18nManager.isRTL)? [0.85, 1]: [1, 0.85]),
              extrapolate: 'clamp'
            })
          },
            {
              scaleY: animatedValue.interpolate({
              inputRange: _X_POSITION_ANIMATION_RANGE,
              outputRange: ((I18nManager.isRTL)? [0.85, 1]: [1, 0.85]),
              extrapolate: 'clamp'
            })
          }
        ]
      };
    }
  }
};

export const MenuCardPulling = {
  Interpolation: {
    _Container: (animatedValue) => {
      const _SHARED_ANIMATIONS = _SHARED._MENU_CARD_PULLING._TRANSLATION_AND_SCALE_COMBINATION(animatedValue);

      return {
        ..._SHARED_ANIMATIONS,
        shadowOpacity: animatedValue.interpolate({
          inputRange: _X_POSITION_ANIMATION_RANGE,
          outputRange: ((I18nManager.isRTL)? [0.15, 0]: [0, 0.15]),
          extrapolate: 'clamp'
        }),
        shadowRadius: animatedValue.interpolate({
          inputRange: _X_POSITION_ANIMATION_RANGE,
          outputRange: ((I18nManager.isRTL)? [30, 0]: [0, 30]),
          extrapolate: 'clamp'
        }),
        shadowOffset: {
          width: 0,
          height: animatedValue.interpolate({
            inputRange: _X_POSITION_ANIMATION_RANGE,
            outputRange: ((I18nManager.isRTL)? [30, 0]: [0, 30]),
            extrapolate: 'clamp'
          })
        }
      };
    },
    _Overlay: (animatedValue) => {
      const _SHARED_ANIMATIONS = _SHARED._MENU_CARD_PULLING._TRANSLATION_AND_SCALE_COMBINATION(animatedValue);

      return {
        ..._SHARED_ANIMATIONS,
        zIndex: animatedValue.interpolate({
          inputRange: _X_POSITION_ANIMATION_RANGE,
          outputRange: ((I18nManager.isRTL)? [1000000, -1]: [-1, 1000000]),
          extrapolate: 'clamp'
        })
      }
    }
  },
  Events: {
    _Launch: (animatedValue) => {
      Animated.spring(animatedValue, {
        toValue: _LAUNCHED_MENU_SCREEN_X_POSITION,
        friction: 10,
        tension: 25,
        easing: Easing.quad
      }).start();
    },
    _Dismiss: (animatedValue) => {
      var _TARGET_X_POSITION_VALUE = 0;

      if (animatedValue._value !== animatedValue._startingValue){
        Animated.spring(animatedValue, {
          toValue: _TARGET_X_POSITION_VALUE,
          friction: 10,
          tension: 25,
          easing: Easing.quad
        }).start();
      }
    }
  }
};

export default {
  MenuCardPulling
};
