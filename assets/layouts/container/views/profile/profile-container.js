import React, { Component } from 'react';
import { StatusBar, View, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Input } from '../../../../components/index';
import { Pilot, PinnedSide, Icon } from '../../../../layouts/index';
const Styles = Views.Profile.Dashboard;

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
    props.onPilotTabItemPress = props.onPilotTabItemPress || props.pilotTabItemOnPress || props.onNavigationTabItemPress || props.navigationTabItemOnPress;
  }

  return (
    <View
      style={Styles.MajorContent}>
        <StatusBar />

        <Pilot
          title={attitude.title}
          {...props}>
            <PinnedSide
              type="left"
              onPress={() => {
                const { navigation } = props;

                navigation.goBack()
              }}>
                <Icon
                  name="arrow left" />
            </PinnedSide>
            <PinnedSide
              type="right"
              onPress={() => alert('ok 2')}>
                <Icon
                  name="for-you" />
            </PinnedSide>
            <PinnedSide
              type="bottom"
              items={attitude.pilotData}
              current={attitude.currentPilotItem}
              onPress={props.onPilotTabItemPress} />
        </Pilot>

        {
          attitude.children.map((child, i) => {
            var childProps = {...child.props};

            const ultimateKey = Functions._generateNewUniqueObjectKey();

            childProps.key = childProps.name || ultimateKey;

            return React.cloneElement(child, childProps);
          })
        }
    </View>
  );
};
