import React, { Component } from 'react';
import { StatusBar, View, KeyboardAvoidingView, Text, Platform, I18nManager, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Input } from '../../../../components/index';
import { Pilot, PinnedSide, Icon } from '../../../../layouts/index';
const Styles = Views.Profile.Self;

import { Functions } from '../../../../modules/index';

export const ProfileContainer = (props) => {
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

  if ((typeof props.pilotData != 'undefined') || (typeof props.pilot_data != 'undefined') || (typeof props.pilotItems != 'undefined') || (typeof props.pilot_items != 'undefined')){
    attitude.pilotData = props.pilotData || props.pilot_data || props.pilotItems || props.pilot_items
  }

  if ((typeof props.currentPilotItem != 'undefined') || (typeof props.current_pilot_item != 'undefined')){
    attitude.currentPilotItem = props.currentPilotItem || props.current_pilot_item;
  }

  if ((typeof props.onPilotTabItemPress != 'undefined') || (typeof props.pilotTabItemOnPress != 'undefined') || (typeof props.navigationTabItemOnPress != 'undefined') || (typeof props.onNavigationTabItemPress != 'undefined')){
    attitude.onPilotTabItemPress = props.onPilotTabItemPress || props.pilotTabItemOnPress || props.onNavigationTabItemPress || props.navigationTabItemOnPress;
  }

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  var _CHILDREN_CONTENT, _BOTTOM_PINNED_ITEMS;

  if (typeof attitude.children != 'undefined'){
    if (attitude.children.length > 0){
      _CHILDREN_CONTENT = attitude.children.map((child, i) => {
        var childProps = {...child.props};

        const ultimateKey = Functions._generateNewUniqueObjectKey();

        childProps.key = childProps.name || ultimateKey;

        return React.cloneElement(child, childProps);
      });
    }
  }

  const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'padding': '';

  var _BOTTOM_PINNED_DATA = (typeof attitude.pilotData != 'undefined')? attitude.pilotData: [],
      _BOTTOM_PINNED_CURRENT_ITEM = (typeof attitude.currentPilotItem != 'undefined')? ((Object.keys(attitude.currentPilotItem).length > 0)? attitude.currentPilotItem: ''): '';

  if ((_BOTTOM_PINNED_DATA.length > 0) && (_BOTTOM_PINNED_CURRENT_ITEM !== '')){
    _BOTTOM_PINNED_ITEMS = (
      <PinnedSide
        type="bottom"
        items={_BOTTOM_PINNED_DATA}
        current={_BOTTOM_PINNED_CURRENT_ITEM}
        onPress={props.onPilotTabItemPress}
        language={attitude.language} />
    );
  }

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
                const { navigation } = props;

                navigation.navigate('Overseer');
              }}>
                <Icon
                  name={`arrow ${(I18nManager.isRTL)? 'right': 'left'}`}
                  left={Styles.__Gobal_Icons_In_Pilot.left} />
            </PinnedSide>
            <PinnedSide
              type="right"
              onPress={() => alert('ok 2')}>
                <Icon
                  name="for-you"
                  style={Styles.ForYouButton}
                  height={Styles.__Gobal_Icons_In_Pilot.height} />
            </PinnedSide>

            {_BOTTOM_PINNED_ITEMS}
        </Pilot>

        {_CHILDREN_CONTENT}
    </KeyboardAvoidingView>
  );
};
