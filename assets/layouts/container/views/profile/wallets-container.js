import React, { Component } from 'react';
import { StatusBar, View, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Input } from '../../../../components/index';
import { Pilot, PinnedSide, Icon } from '../../../../layouts/index';
const Styles = Views.Profile.Wallets;

import { Functions } from '../../../../modules/index';

export const WalletsContainer = (props) => {
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
    props.onPilotTabItemPress = props.onPilotTabItemPress || props.pilotTabItemOnPress || props.onNavigationTabItemPress || props.navigationTabItemOnPress;
  }

  var _CHILDREN_CONTENT;

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

  const _TABS = attitude.pilotData.map((tabItem, i) => {
          return Functions._returnCurrencyDependOnLanguage(tabItem.type || tabItem);
        });
        _CURRENT_TAB_CONTENT = (typeof attitude.currentPilotItem != 'undefined')? ((typeof attitude.currentPilotItem.type != 'undefined')? attitude.currentPilotItem.type: ''): '',
        _CURRENT_TAB = Functions._returnCurrencyDependOnLanguage(_CURRENT_TAB_CONTENT) || '';

  return (
    <View
      style={Styles.Container}>
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
                  name="arrow left"
                  height={Styles.__Gobal_Icons_In_Pilot.height} />
            </PinnedSide>
            <PinnedSide
              type="right"
              onPress={() => alert('ok 2')}>
                <Icon
                  name="plus"
                  style={Styles.ForYouButton}
                  height={Styles.__Gobal_Icons_In_Pilot.height} />
            </PinnedSide>
            <PinnedSide
              type="bottom"
              items={_TABS}
              current={_CURRENT_TAB}
              onPress={props.onPilotTabItemPress} />
        </Pilot>

        {_CHILDREN_CONTENT}
    </View>
  );
};
