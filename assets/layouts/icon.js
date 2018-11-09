import React, { Component } from 'react';

import { View, Dimensions, Platform, Animated, Easing } from 'react-native';
import Svg, { G, Path, Rect, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { Global } from '../styles/index';

import { Functions } from '../modules/index';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

const _getIconWithName = (name, color = Global.colors.single.rangoonGreen) => {
  const _ICONS = {
    _SIDE_GUIDE: {
      width: 48,
      height: 32,
      view_box: "0 0 48 32",
      content: <G
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd">
          <Rect
            fillOpacity="0.3"
            fill={Global.colors.single.carminePink}
            x="0"
            y="0"
            width="48"
            height="32">
          </Rect>
          <Rect
            fill={Global.colors.single.carminePink}
            opacity="0.3"
            x="10"
            y="2"
            width="28"
            height="28">
          </Rect>
          <Path
            d="M10,2 L38,2 L38,30 L10,30 L10,2 Z M11.5,3.5 L11.5,28.5 L36.5,28.5 L36.5,3.5 L11.5,3.5 Z"
            fill={Global.colors.single.carminePink}
            opacity="0.3">
          </Path>
      </G>
    },
    INDICATOR: {
      width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 46.2: 33): 33,
      height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 7: 5): 5,
      view_box: "0 0 33 5",
      content: <Path
        fill={color}
        d="M30.5,0h-28C1.1,0,0,1.1,0,2.5S1.1,5,2.5,5h28C31.9,5,33,3.9,33,2.5S31.9,0,30.5,0z"/>
    },
    FOR_YOU: {
      width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 24): 24,
      height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 24): 24,
      view_box: "0 0 24 24",
      content: <Path
        fill={color}
        d="M1.7,0h20.7C23.3,0,24,0.7,24,1.7v20.7c0,0.9-0.7,1.7-1.7,1.7H1.7C0.7,24,0,23.3,0,22.3V1.7C0,0.7,0.7,0,1.7,0zM3,13v1h8v-1H3z M13,13v1h8v-1H13z M13,10v1h8v-1H13z M13,7v1h8V7H13z M13,4v1h8V4H13z M3,16v1h8v-1H3z M13,16v1h8v-1H13z M3,19v1h8v-1H3z M13,19v1h8v-1H13z M7,5.3c-0.4-0.6-1.1-1-1.8-1c-1,0-1.9,0.9-1.9,2C3.2,7.7,4.4,9.3,7,11c2.6-1.7,3.8-3.3,3.7-4.7h0c0-1.1-0.9-2-1.9-2C8.1,4.3,7.4,4.7,7,5.3z"/>
    },
    BAR: {
      width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 24): 24,
      height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 17.333): 13,
      view_box: "0 0 24 13",
      content: <Path
        fill={color}
        d="M2,0h20c1.1,0,2,0.9,2,2s-0.9,2-2,2H2C0.9,4,0,3.1,0,2S0.9,0,2,0z M2,9h20c1.1,0,2,0.9,2,2s-0.9,2-2,2H2c-1.1,0-2-0.9-2-2S0.9,9,2,9z"/>
    },
    PERSON: {
      width: 23,
      height: 23,
      view_box: "0 0 23 23",
      content: <Path
        fill={color}
        d="M20.3,17.9c-1.5-0.9-3.1-0.7-4.5-1.3c-0.3-0.1-0.5-0.3-0.8-0.5c-0.6-0.5-0.8-1-0.9-1.6c1.3-1.1,1.6-3,2-4.6c0.3-0.2,0.5-0.6,0.5-1v-1c0-0.3-0.1-0.7-0.4-0.9c0.1-0.9,0.1-1.8,0.1-2.2c0-2.7-2.1-4.9-4.8-4.9c-1.3,0-3.2,1.2-3.2,2C7.3,2,6.8,3.5,6.8,4.9c0,0.4,0,1.3,0.1,2.2C6.6,7.3,6.5,7.6,6.5,7.9v1c0,0.4,0.2,0.8,0.5,1c1,1.6,0.9,3.5,2,4.6c-0.1,0.6-0.4,1.1-0.9,1.6c0,0,0,0,0,0h0c-0.2,0.2-0.5,0.3-0.8,0.5c-1.4,0.6-3.1,0.4-4.5,1.3C1,18.9,0.5,20,0,23h23C22.5,20,22,18.9,20.3,17.9z"/>
    },
    ARROW_LEFT: {
      width: 15.1,
      height: 25,
      view_box: "0 0 15.1 25",
      content: <Path
        fill={color}
        d="M4.5,12.5l10-9.5c0.7-0.7,0.7-1.8,0-2.5s-1.9-0.7-2.7,0L0.5,11.2c-0.7,0.7-0.7,1.8,0,2.5l11.2,10.7c0.7,0.7,1.9,0.7,2.7,0s0.7-1.8,0-2.5L4.5,12.5z"/>
    },
    GALLERY: {
      width: 36.5,
      height: 32,
      view_box: "0 0 36.5 32",
      content: <G>
      	<Path
          fill={color}
          d="M18.5,11.3c-2.1,0-3.7,1.7-3.7,3.7c0,2.1,1.7,3.7,3.7,3.7c2.1,0,3.7-1.7,3.7-3.7C22.2,13,20.5,11.3,18.5,11.3z"/>
      	<Path
          fill={color}
          d="M33.3,2.8L9.1,0C8.2-0.1,7.2,0.2,6.5,0.8C5.8,1.3,5.3,2.2,5.2,3.1L4.8,6.7H3.4c-2,0-3.4,1.7-3.4,3.7v18.1c0,1.9,1.4,3.4,3.3,3.5c0,0,0.1,0,0.1,0h24.3c2,0,3.7-1.5,3.7-3.5v-0.7c0.6-0.1,1.2-0.4,1.7-0.7c0.7-0.6,1.2-1.5,1.3-2.4l2-18C36.7,4.8,35.3,3,33.3,2.8z M29.7,17.9L20,23.5c-0.8,0.5-1.9,0.4-2.6-0.2L12.5,19c-1.4-1.2-3.4-1.3-4.9-0.2L1.8,23V10.4c0-1,0.7-1.9,1.6-1.9h24.3c1,0,1.9,0.9,2,1.9V17.9z M34.7,6.5l-2.1,18c0,0.5-0.2,0.9-0.6,1.2c-0.2,0.2-0.6,0.3-0.6,0.4V10.4c-0.1-2-1.7-3.6-3.7-3.7H6.6L7,3.3C7,2.8,7.3,2.4,7.6,2.1C8,1.8,8.5,1.7,9,1.8l24.2,2.8C34.1,4.6,34.8,5.5,34.7,6.5C34.7,6.5,34.7,6.5,34.7,6.5z"/>
      </G>
    },
    PLUS: {
      width: 24,
      height: 24,
      view_box: "0 0 24 24",
      content: <Path
        fill={color}
        d="M22,10h-8V2c0-1.1-0.9-2-2-2s-2,0.9-2,2v8H2c-1.1,0-2,0.9-2,2s0.9,2,2,2h8v8c0,1.1,0.9,2,2,2s2-0.9,2-2v-8h8c1.1,0,2-0.9,2-2S23.1,10,22,10z"/>
    }
  };

  return _ICONS[name];
};

export const Icon = (props) => {
  var attitude = {};

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      attitude.key = Functions._generateNewUniqueObjectKey()
    }
  }

  if (typeof props.style != 'undefined'){
    attitude.style = props.style;

    if (typeof attitude.style == 'object' && Array.isArray(attitude.style)){
      attitude.style = attitude.style.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  if (typeof props.gradient != 'undefined'){
    attitude.gradient = props.gradient;
  }

  const _ICON_SELECTED_NAME = (props.name || props.title || '_SIDE_GUIDE');

  attitude.name = Functions._convertTokenToIconName(_ICON_SELECTED_NAME);

  var _SELECTED_ICON, _ICON_DEFS_CONTENT;

  if (typeof attitude.gradient != 'undefined'){
    const restructredRange = Object.keys(attitude.gradient).map((stepName) => {
      return attitude.gradient[stepName];
    });

    _SELECTED_ICON = _getIconWithName(attitude.name, 'url(#gradient)');

    _ICON_DEFS_CONTENT = <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="100%" y2="100%">
          {
            restructredRange.map((range, i) => {
              const _INDEX = i.toString();

              return (
                <Stop offset={_INDEX} stopColor={range} stopOpacity={_INDEX} />
              );
            })
          }
        </LinearGradient>
    </Defs>;
  }else{
    if (typeof props.color != 'undefined'){
      attitude.color = props.color;

      _SELECTED_ICON = _getIconWithName(attitude.name, attitude.color);
    }else{
      _SELECTED_ICON = _getIconWithName(attitude.name);
    }
  }

  attitude.viewBox = _SELECTED_ICON.view_box;
  attitude.content = _SELECTED_ICON.content;

  attitude.width = props.width || _SELECTED_ICON.width;
  attitude.height = props.height || _SELECTED_ICON.height;

  return (
    <Svg
      key={attitude.key}
      width={attitude.width}
      height={attitude.height}
      viewBox={attitude.viewBox}
      style={[
        attitude.style
      ]}>
        {_ICON_DEFS_CONTENT}
        {attitude.content}
    </Svg>
  )
}
