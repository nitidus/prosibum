import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Text, TouchableWithoutFeedback, Platform, I18nManager, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Pilot, TabBarItem, PinnedSide, Icon, DrawerMenu } from '../../../../layouts/index';
const Styles = Views.Products.NewProduct;

import { Functions } from '../../../../modules/index';

export const NewProductContainer = (props) => {
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

  if (
    (typeof props.onRightIconPress != 'undefined') || (typeof props.onRightItemPress != 'undefined') || (typeof props.onRightPress != 'undefined') ||
    (typeof props.on_right_icon_press != 'undefined') || (typeof props.on_right_item_press != 'undefined') || (typeof props.on_right_press != 'undefined')
  ){
    attitude.onRightIconPress = props.onRightIconPress || props.onRightIconPress || props.onRightPress || props.on_right_icon_pres || props.on_right_item_pres || props.on_right_press;

    attitude.rightIcon = props.rightIcon || props.rightIconName || '';
  }

  var _RIGHT_PINNED_ITEMS;

  if (typeof attitude.onRightIconPress != 'undefined'){
    _RIGHT_PINNED_ITEMS = (
      <PinnedSide
        type="right"
        onPress={attitude.onRightIconPress}>
          <Icon
            name={attitude.rightIcon}
            style={Styles.PilotButton}
            height={Styles.__Gobal_Icons_In_Pilot.height} />
      </PinnedSide>
    )
  }

  const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'padding': '';

  return (
    <KeyboardAvoidingView
      style={Styles.Container}
      behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}>
        <StatusBar />

        <Pilot
          title={attitude.title}
          {...props}>
            <PinnedSide
              type="left"
              onPress={() => {
                const { navigation } = props,
                      { params } = navigation.state,
                      _IS_ROOT = (typeof params != 'undefined')? ((typeof params.isRoot != 'undefined')? params.isRoot: false): false;

                if (_IS_ROOT === true){
                  navigation.navigate('Overseer');
                }else{
                  navigation.goBack();
                }
              }}>
                <Icon
                  name={`arrow ${(I18nManager.isRTL)? 'right': 'left'}`}
                  width={Styles.__Gobal_Icons_In_Pilot.width} />
            </PinnedSide>

            {_RIGHT_PINNED_ITEMS}
        </Pilot>

        {
          attitude.children.map((child, i) => {
            var childProps = {...child.props};

            const ultimateKey = Functions._generateNewUniqueObjectKey();

            childProps.key = childProps.name || ultimateKey;

            return React.cloneElement(child, childProps);
          })
        }
    </KeyboardAvoidingView>
  );
};
