import React, { Component } from 'react';

import { View, Animated, Easing } from 'react-native';
import Svg, { G, Path, Rect, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Container;

import { Functions } from '../modules/index';

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
      width: 33,
      height: 5,
      view_box: "0 0 33 5",
      content: <Path
        fill={color}
        d="M30.5,0h-28C1.1,0,0,1.1,0,2.5S1.1,5,2.5,5h28C31.9,5,33,3.9,33,2.5S31.9,0,30.5,0z"/>
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

  attitude.name = (props.name || props.title || '_SIDE_GUIDE').toUpperCase();

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
