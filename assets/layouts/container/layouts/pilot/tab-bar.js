import React, { Component } from 'react';

import { View, ScrollView, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import { Link, Input } from '../../../../components/index';
import { Icon } from '../../../../layouts/icon';
import { Global, Modules } from '../../../../styles/index';
const Styles = Modules.Layouts.Pilot;

import { Functions } from '../../../../modules/index';

export const TabBarItem = (props) => {
  const { navigation } = props;

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

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.linkOnPress != 'undefined') || (typeof props.iconOnPress != 'undefined') || (typeof props.onIconPress != 'undefined')){
    attitude.onPress = props.onPress || props.onLinkPress || props.linkOnPress || props.onIconPress || props.iconOnPress;
  }

  attitude.activated = props.activated || props.is_activated || props.isActivated || false;

  const _TAB_NAME = Functions._convertTokenToKeyword(attitude.name),
        _TAB_TITLE = Functions._convertKeywordToToken(attitude.name);

  var _TAB_ITEM_ICON_COLOR = Global.colors.single.lavenderGray,
      _TAB_ITEM_TEXT_STYLES = [
        Styles.TabItemsText
      ],
      _TAB_ITEM_CONTENT;

  if (attitude.activated === true){
    _TAB_ITEM_ICON_COLOR = Global.colors.single.rangoonGreen;
    _TAB_ITEM_TEXT_STYLES.push(Styles.ActivatedTabItemsText);
  }

  _TAB_ITEM_CONTENT = (
    <View
      style={Styles.SingleTabItemsContent}>
        <Icon
          name={_TAB_TITLE}
          color={_TAB_ITEM_ICON_COLOR}
          style={Styles.TabItemsIcon} />

        <Text
          style={_TAB_ITEM_TEXT_STYLES}>
            {_TAB_TITLE}
        </Text>
    </View>
  );

  if (attitude.activated === true){
    return (
      <Input
        type="BUTTON"
        name={_TAB_NAME}
        style={[
          Styles.TabItemsContainer,
          attitude.style
        ]}
        disable={true}>
          {_TAB_ITEM_CONTENT}
      </Input>
    );
  }else{
    return (
      <Input
        type="BUTTON"
        name={_TAB_NAME}
        style={[
          Styles.TabItemsContainer,
          attitude.style
        ]}
        onPress={() => attitude.onPress(attitude.name)}>
          {_TAB_ITEM_CONTENT}
      </Input>
    );
  }
}

export const TabBar = (props) => {
  const { navigation } = props;

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

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  var _TAB_BAR_CONTENT;

  if (typeof attitude.children != 'undefined'){
    if (attitude.children.length > 0){
      _TAB_BAR_CONTENT = attitude.children.map((item, i) => {
        const _PROPS = item.props,
              _ITEM_KEY = Functions._generateNewUniqueObjectKey(i);

        var _CUSTOM_STYLE = {};

        if (i < (attitude.children.length - 1)){
          _CUSTOM_STYLE = {
            ..._CUSTOM_STYLE,
            ...Styles.LTR_TabItems
          };
        }

        return (
          <TabBarItem
            {..._PROPS}
            style={_CUSTOM_STYLE} />
        );
      });
    }
  }

  return (
    <View
      style={[
        Styles.TabBarContainer,
        attitude.style
      ]}>
        <View
          style={[
            Styles.FirstRowContainer,
            Styles.TabItemsContent
          ]}>
            {_TAB_BAR_CONTENT}
        </View>
    </View>
  )
}
