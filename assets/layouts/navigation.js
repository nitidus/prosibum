import React, { Component } from 'react';

import { View, ScrollView, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import { Link, Input } from '../components/index';
import { Icon } from '../layouts/icon';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Navigation;

import { Functions } from '../modules/index';

export const TabItem = (props) => {
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

  const _TAB_NAME = attitude.name.toLowerCase().replace(/ +/ig, '-');

  return (
    <Input
      type="BUTTON"
      name={_TAB_NAME}
      value={attitude.name}
      style={[
        Styles.SingleTabItemContainer,
        attitude.style
      ]}
      onPress={() => {
        alert('ok')
      }}/>
  );
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

                    return (
                      <TabItem
                        key={w}
                        title={tabItemName}
                        style={_ITEM_STYLE} />
                    );
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

export const Navigation = (props) => {
  var attitude = {};

  attitude.type = props.type || props.title || props.name || props.id || props._id || props.token || props.navigation_type || props.navType || props.NavType || props.nav_type || props.navigationType || props.NavigationType || 'Title';

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if (attitude.type != 'undefined'){
    return (
      <TopBar
        title={attitude.type}
        {...props}>
          {
            attitude.children.map((child, i) => {
              var childProps = {...child.props},
                  childStyle = [
                    Styles.PinnedSide,
                    childProps.style
                  ];

              const ultimateKey = Functions._generateNewUniqueObjectKey();

              childProps.key = childProps.name || ultimateKey;
              childProps.style = childStyle;

              return React.cloneElement(child, childProps);
            })
          }
      </TopBar>
    );
  }
}
