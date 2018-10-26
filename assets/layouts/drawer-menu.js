import React, { Component } from 'react';

import { View, Text, Animated, Easing } from 'react-native';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.DrawerMenu;

import { Functions } from '../modules/index';

export const DrawerMenuPinnedItem = (props) => {
  var attitude = {};

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined') || (typeof props.value != 'undefined')){
    attitude.name = props.name || props.title || props.value;
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

  if ((typeof props.onPress != 'undefined') || (typeof props.onItemPress != 'undefined') || (typeof props.itemOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onItemPress || props.itemOnPress;
  }

  return (
    <Text
      key={attitude.key}
      name={attitude.name}
      style={[
        Styles.PinnedItem,
        attitude.style
      ]}
      onPress={attitude.onPress}>
        {attitude.name}
    </Text>
  )
}

export const DrawerMenuItem = (props) => {
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

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined') || (typeof props.value != 'undefined')){
    attitude.name = props.name || props.title || props.value;
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

  if ((typeof props.onPress != 'undefined') || (typeof props.onItemPress != 'undefined') || (typeof props.itemOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onItemPress || props.itemOnPress;
  }

  return (
    <Text
      key={attitude.key}
      name={attitude.name}
      style={[
        Styles.SingleItemContent,
        attitude.style
      ]}
      onPress={attitude.onPress}>
        {attitude.name}
    </Text>
  )
}

export const DrawerMenu = (props) => {
  return (
    <View
      style={Styles.Container}>
        <View>
          <DrawerMenuItem
            name="Dashboard"
            onPress={() => alert('ok 1')} />
          <DrawerMenuItem
            name="Profile"
            onPress={() => alert('ok 2')} />
          <DrawerMenuItem
            name="Settings"
            onPress={() => alert('ok 3')} />
        </View>

        <View
          style={Styles.PinnedItemsContainer}>
            <View
              style={Styles.PinnedItemGroup}>
                <DrawerMenuPinnedItem
                  name="Privacy"
                  onPress={() => alert('ok 4')} />
                <DrawerMenuPinnedItem
                  name="Terms & Conds"
                  onPress={() => alert('ok 5')} />
            </View>
        </View>
    </View>
  )
}
