import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';

import { Link } from '../components/index';
import { Icon } from '../layouts/icon';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Navigation;

import { Functions } from '../modules/index';

const PinnedSide = (props) => {
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
      _RIGHT_SIDE_CONTENT = <View style={Styles.PinnedSide} />;

  if ((typeof attitude.children != 'undefined') && (attitude.children.length <= 2)){
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
      }
    }
  }

  return (
    <View
      style={[
        Styles.Container,
        attitude.style
      ]}>
        {_LEFT_SIDE_CONTENT}

        <Text
          style={Styles.HeaderTitle}>
            {props.title}
        </Text>

        {_RIGHT_SIDE_CONTENT}
    </View>
  )
}

export const Navigation = (props) => {
  var attitude = {};

  attitude.type = props.type || props.id || props._id || props.token || props.navigation_type || props.navType || props.NavType || props.nav_type || props.navigationType || props.NavigationType;

  if (attitude.type != 'undefined'){
    const _NAVIGATION_TYPE = attitude.type.toLowerCase().replace(/( |_)/gi, '-');

    switch (_NAVIGATION_TYPE) {
      case 'regular-dashboard':
      default:
        return (
          <TopBar
            title="Dashboard"
            {...props}>
              <PinnedSide type="left"
                style={Styles.PinnedSide}
                onPress={() => alert('ok 1')}>
                  <Icon
                    name="for-you" />
              </PinnedSide>

              <PinnedSide type="right"
                style={Styles.PinnedSide}
                onPress={() => alert('ok 2')}>
                  <Icon
                    name="bar" />
              </PinnedSide>
          </TopBar>
        );
        break;
    }
  }
}
