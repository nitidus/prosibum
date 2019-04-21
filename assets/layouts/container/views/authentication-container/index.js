import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Platform } from 'react-native';

import { Functions } from '../../../../modules/index';

export const AuthenticationContainer = (props) => {
  var attitude = {};

  attitude.title = props.title || props.name;

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
  }else{
    attitude.style = {};
  }

  const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'padding': '';

  return (
    <KeyboardAvoidingView
      style={attitude.style}
      behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}>
        <StatusBar hidden={true}/>

        {
          attitude.children.map((child, i) => {
            if (typeof child != 'undefined'){
              var childProps = {...child.props};

              const ultimateKey = Functions._generateNewUniqueObjectKey();

              childProps.key = childProps.name || ultimateKey;

              return React.cloneElement(child, childProps);
            }
          })
        }
    </KeyboardAvoidingView>
  );
};
