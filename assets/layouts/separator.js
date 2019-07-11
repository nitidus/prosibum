import React, { Component } from 'react';

import { View, Animated, Easing } from 'react-native';

import Svg, { Line } from 'react-native-svg';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Separator;

import { Functions } from '../modules/index';

export const Separator = (props) => {
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

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
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

  attitude.width = props.width || 50;
  attitude.height = props.height || 2;
  attitude.strokeMiterLimit = props.strokeMiteLlimit || 10;
  attitude.strokeDashArray = props.strokeDashArray || "7,5.7";
  attitude.color = props.color || Global.colors.single.lavenderGray;

  var _SEPARATOR_CONTENT = (
    <Svg
      width={attitude.width}
      height={attitude.height}
      viewBox={`0 0 ${attitude.width} ${attitude.height}`}>
        <Line
          fill="none"
          stroke={attitude.color}
          strokeMiterlimit={attitude.strokeMiterLimit}
          strokeDasharray={attitude.strokeDashArray}
          x1={attitude.width}
          y1={attitude.height / 2}
          x2="0"
          y2={attitude.height / 2}/>
    </Svg>
  );

  if (typeof attitude.children != 'undefined'){
    return (
      <View
        key={attitude.key}
        name={attitude.name}
        style={[
          Styles.Container,
          attitude.style
        ]}>
          {_SEPARATOR_CONTENT}

          {
            attitude.children.map((child, i) => {
              var childProps = {...child.props};

              const ultimateKey = Functions._generateNewUniqueObjectKey();

              childProps.key = childProps.name || ultimateKey;
              childProps.style = (Array.isArray(childProps.style)? [
                ...childProps.style,
                {
                  marginHorizontal: Styles.Content.marginHorizontal
                }
              ]: {
                ...childProps.style,
                marginHorizontal: Styles.Content.marginHorizontal
              });

              return React.cloneElement(child, childProps);
            })
          }

          {_SEPARATOR_CONTENT}
      </View>
    );
  }else{
    return (
      <View
        key={attitude.key}
        name={attitude.name}
        style={[
          Styles.Container,
          attitude.style
        ]}>
          {_SEPARATOR_CONTENT}
      </View>
    );
  }
}
