import React, { Component } from 'react';

import { View, Animated, Easing } from 'react-native';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Container;

import { Functions } from '../modules/index';

export const Container = (props) => {
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

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
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

  if ((typeof props.active == 'undefined') || !props.active){
    if (typeof attitude.style == 'undefined'){
      attitude.style = {};
    }

    attitude.style.display = "none";
  }

  return (
    <View
      key={attitude.key}
      name={attitude.name}
      style={[
        attitude.style
      ]}>
        {
          attitude.children.map((child, i) => {
            var childProps = {...child.props};

            const today = new Date(),
                  randomToken = Math.random();

            const ultimateKey = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());

            childProps.key = childProps.name || ultimateKey;

            return React.cloneElement(child, childProps);
          })
        }
    </View>
  )
}
