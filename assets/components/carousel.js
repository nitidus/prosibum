import React, { Component } from 'react';
import Carrousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';

import { View, Text, Animated, Easing, Dimensions, Platform } from 'react-native';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Carousel;

import { Functions } from '../modules/index';

const _SCREEN = Dimensions.get('window');

export const Carousel = (props) => {
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

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
  }

  if (typeof props.data != 'undefined'){
    attitude.data = props.data;
  }

  attitude.width = props.width || props.sliderWidth || _SCREEN.width;

  if (typeof props.itemWidth != 'undefined'){
    attitude.itemWidth = props.itemWidth || _SCREEN.width;
  }

  if ((typeof props.firstItem != 'undefined') || (typeof props.firstItemIndex != 'undefined') || (typeof props.firstIndex != 'undefined')){
    attitude.firstItem = props.firstItem || props.firstItemIndex || props.firstIndex || 0;
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

  if ((typeof props.onLayout != 'undefined') || (typeof props.onLayout != 'undefined') || (typeof props.carouselOnLayout != 'undefined') || (typeof props.onCarouselItemLayout != 'undefined') || (typeof props.carouselItemOnLayout != 'undefined') || (typeof props.onItemLayout != 'undefined') || (typeof props.itemOnLayout != 'undefined')){
    attitude.onLayout = props.onLayout || props.onLayout || props.carouselOnLayout || props.onCarouselItemLayout || props.carouselItemOnLayout || props.onItemLayout || props.itemOnLayout;
  }

  if ((typeof props.onSnap != 'undefined') || (typeof props.onSnapToItem != 'undefined') || (typeof props.onSnapItem != 'undefined') || (typeof props.onItemSnap != 'undefined')){
    attitude.onSnap = props.onSnap || props.onSnapToItem || props.onSnapItem || props.onItemSnap
  }

  attitude.layout = (props.layoutType || props.layout || props.type || 'stack').toLowerCase();

  const _LAYOUT_TYPE = (attitude.layout == 'stack' || attitude.layout == 'tinder' || attitude.layout == 'default')? attitude.layout: 'stack';

  return (
    <View
      key={attitude.key}
      name={attitude.name}
      style={[
        Styles.Container,
        attitude.style
      ]}>
        <Carrousel
          layout={_LAYOUT_TYPE}
          data={attitude.data}
          renderItem={attitude.onLayout}
          sliderWidth={attitude.width}
          itemWidth={attitude.itemWidth}
          firstItem={attitude.firstItem}
          onSnapToItem={attitude.onSnap} />
    </View>
  )
}
