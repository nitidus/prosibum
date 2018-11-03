import React, { Component } from 'react';

import { View, ScrollView, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import { Link, Input } from '../../../../components/index';
import { Icon } from '../../../../layouts/icon';
import { Global, Modules } from '../../../../styles/index';
const Styles = Modules.Layouts.Pilot;

import { Functions } from '../../../../modules/index';

export const TabItem = (props) => {
  const { navigation } = props;

  var attitude = {};

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

  attitude.disable = props.disable || false;

  if (typeof props.gradient != 'undefined'){
    attitude.gradient = props.gradient;
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.linkOnPress != 'undefined') || (typeof props.iconOnPress != 'undefined') || (typeof props.onIconPress != 'undefined')){
    attitude.onPress = props.onPress || props.onLinkPress || props.linkOnPress || props.onIconPress || props.iconOnPress;
  }

  const _TAB_NAME = attitude.name.toLowerCase().replace(/ +/ig, '-');

  var _ITEM_TEXT_STYLE = [
    Styles.SingleTabItemContent
  ];

  if ((typeof attitude.disable != 'undefined' && attitude.disable) || (typeof attitude.gradient != 'undefined')){
    _ITEM_TEXT_STYLE.push(Styles.DisabledSingleTabItemContent);
  }

  var _MAIN_TEXT_COTNENT = (
    <Text
      style={_ITEM_TEXT_STYLE}>
        {attitude.name}
    </Text>
  );

  if (typeof attitude.gradient != 'undefined'){
    return (
      <Input
        type="BUTTON"
        name={_TAB_NAME}
        style={[
          Styles.SingleTabItemContainer,
          attitude.style
        ]}
        gradient={attitude.gradient}>
          {_MAIN_TEXT_COTNENT}
      </Input>
    );
  }else{
    return (
      <Input
        type="BUTTON"
        name={_TAB_NAME}
        style={[
          Styles.SingleTabItemContainer,
          attitude.style
        ]}
        onPress={() => {
          attitude.onPress(attitude.name);
        }}>
          {_MAIN_TEXT_COTNENT}
      </Input>
    );
  }
}

export const PinnedSide = (props) => {
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

  return (
    <View
      style={attitude.style}>
        <Link
          onPress={attitude.onPress}>
            {
              attitude.children.map((child, i) => {
                var childProps = {...child.props};

                const ultimateKey = Functions._generateNewUniqueObjectKey();

                childProps.key = childProps.name || ultimateKey;

                return React.cloneElement(child, childProps);
              })
            }
        </Link>
    </View>
  );
};

export const TopBar = (props) => {
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

    attitude.children = attitude.children.filter((child, i, children) => {
      var childName = child.type.name;

      if (typeof childName != 'undefined'){
        switch (childName) {
          case 'PinnedSide':
            if (typeof child.props.type != 'undefined'){
              switch (child.props.type.toLowerCase()) {
                case 'left':
                case 'right':
                case 'bottom':
                  return child;
                  break;
              }
            }
            break;
        }
      }
    });
  }

  var _LEFT_SIDE_CONTENT = <View style={Styles.PinnedSide} />,
      _RIGHT_SIDE_CONTENT = <View style={Styles.PinnedSide} />,
      _BOTTOM_WIDE_CONTENT;

  if ((typeof attitude.children != 'undefined') && ((attitude.children.length <= 2) || (attitude.children.length <= 3))){
    for (var i = 0; i < attitude.children.length; i++) {
      var _CHILD = attitude.children[i],
          _CHILD_PROPS = {..._CHILD.props, navigation},
          _CHILD_TYPE = _CHILD.props.type.toLowerCase();

      const ultimateKey = Functions._generateNewUniqueObjectKey();

      _CHILD_PROPS.key = _CHILD_PROPS.name || ultimateKey;

      switch (_CHILD_TYPE) {
        case 'left':
          _LEFT_SIDE_CONTENT = React.cloneElement(_CHILD, _CHILD_PROPS);
          break;
        case 'right':
          _RIGHT_SIDE_CONTENT = React.cloneElement(_CHILD, _CHILD_PROPS);
          break;
        case 'bottom':
          var _TAB_ATTITUDE = {};

          if (typeof _CHILD_PROPS.children != 'undefined'){
            _BOTTOM_WIDE_CONTENT = <View
              style={[
                Styles.SecondRowContainer,
                Styles.LTR_Items
              ]}>
                {React.cloneElement(_CHILD, _CHILD_PROPS)}
            </View>;
          }else{
            if ((typeof _CHILD_PROPS.data != 'undefined') || typeof _CHILD_PROPS.items != 'undefined'){
              _TAB_ATTITUDE.data = _CHILD_PROPS.data || _CHILD_PROPS.items;
            }

            if ((typeof _CHILD_PROPS.current != 'undefined') || typeof _CHILD_PROPS.currentItem != 'undefined' || typeof _CHILD_PROPS.current_item != 'undefined'){
              _TAB_ATTITUDE.current = _CHILD_PROPS.current || _CHILD_PROPS.currentItem || _CHILD_PROPS.current_item;
            }

            if ((typeof _CHILD_PROPS.onPress != 'undefined') || (typeof _CHILD_PROPS.onTabPress != 'undefined') || (typeof _CHILD_PROPS.tabOnPress != 'undefined') || (typeof _CHILD_PROPS.onTabItemPress != 'undefined') || (typeof _CHILD_PROPS.tabItemOnPress != 'undefined')){
              _TAB_ATTITUDE.onPress = _CHILD_PROPS.onPress || _CHILD_PROPS.onTabPress || _CHILD_PROPS.tabOnPress || _CHILD_PROPS.onTabItemPress || _CHILD_PROPS.tabItemOnPress;
            }

            _BOTTOM_WIDE_CONTENT = <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={Styles.SecondRowContainer}>
                {
                  _TAB_ATTITUDE.data.map((tabItemName, w, tabItems) => {
                    var _ITEM_STYLE;

                    if (w < tabItems.length - 1){
                      _ITEM_STYLE = Styles.TabItemContainer;
                    }

                    const _ITEM_KEY = Functions._generateNewUniqueObjectKey(w),
                          _ITEM_NAME = tabItemName,
                          _SCAPED_ITEM_NAME = _ITEM_NAME.toLowerCase().replace(/( |_)+/ig, '-'),
                          _SCAPED_CURRENT_ITEM = _TAB_ATTITUDE.current.toLowerCase().replace(/( |_)+/ig, '-');

                    if (_SCAPED_ITEM_NAME === _SCAPED_CURRENT_ITEM){
                      return (
                        <TabItem
                          key={_ITEM_KEY}
                          name={tabItemName}
                          style={_ITEM_STYLE}
                          gradient={Global.colors.pair.ongerine}
                          onPress={_TAB_ATTITUDE.onPress} />
                      );
                    }else{
                      return (
                        <TabItem
                          key={_ITEM_KEY}
                          name={tabItemName}
                          style={[
                            _ITEM_STYLE,
                            Styles.DisabledSingleTabItemContainer
                          ]}
                          disable={true}
                          onPress={_TAB_ATTITUDE.onPress} />
                      );
                    }
                  })
                }
            </ScrollView>;
          }
          break;
      }
    }
  }

  return (
    <View
      style={[
        Styles.MainContainer,
        attitude.style
      ]}>
        <View
          style={Styles.FirstRowContainer}>
            {_LEFT_SIDE_CONTENT}

            <Text
              style={Styles.HeaderTitle}>
                {props.title}
            </Text>

            {_RIGHT_SIDE_CONTENT}
        </View>

        {_BOTTOM_WIDE_CONTENT}
    </View>
  )
}
