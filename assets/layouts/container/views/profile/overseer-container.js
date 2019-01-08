import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Pilot, TabBarItem, PinnedSide, Icon, DrawerMenu } from '../../../../layouts/index';
const Styles = Views.Profile.Dashboard;

import { Functions, Utils } from '../../../../modules/index';
const { MenuCardPulling } = Utils.Animations.MenuPulling;

export const OverseerContainer = (props) => {
  var attitude = {},
      animations = {
        xPosition: new Animated.Value(0)
      };

  attitude.title = props.title || props.name;

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if ((typeof props.tabs != 'undefined') || (typeof props.pilotTabs != 'undefined') || (typeof props.pilot_tabs != 'undefined')){
    attitude.tabs = props.tabs || props.pilotTabs || props.pilot_tabs;
  }

  if ((typeof props.currentTab != 'undefined') || (typeof props.current_tab != 'undefined') || (typeof props.currentPilotTab != 'undefined') || (typeof props.current_pilot_tab != 'undefined')){
    attitude.currentTab = props.currentTab || props.current_tab || props.currentPilotTab || props.current_pilot_tab;
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onTabItemPress != 'undefined') || (typeof props.on_tab_item_press != 'undefined')){
    attitude.onPress = props.onPress || props.onTabItemPress || props.on_tab_item_press;
  }

  const { Interpolation, Events } = MenuCardPulling,
        _CONTAINER_ANIMATION = Interpolation._Container(animations.xPosition),
        _OVERLAY_ANIMATION = Interpolation._Overlay(animations.xPosition);

  var _CURRENT_TAB_INDEX = attitude.tabs.findIndex((tab) => {
        const _CURRENT_TAB_IN_KEY_FORMAT = Functions._convertTokenToKey(attitude.currentTab),
              _TAB_IN_KEY_FORMAT = Functions._convertTokenToKey(tab);

        return (_TAB_IN_KEY_FORMAT === _CURRENT_TAB_IN_KEY_FORMAT);
      });

  return (
    <View
      style={Styles.MajorContainer}>
        <DrawerMenu
          onDismiss={() => Events._Dismiss(animations.xPosition)}
          {...props} />

        <Animated.View
          style={[
            Styles.ContainerOverlay,
            _OVERLAY_ANIMATION
          ]}>
            <TouchableWithoutFeedback
              onPress={() => Events._Dismiss(animations.xPosition)}>
              <View
                style={Styles.ContainerOverlayContent}/>
            </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={[
              Styles.Container,
              _CONTAINER_ANIMATION
          ]}>
            <View
              style={Styles.MajorContent}>
                <StatusBar hidden={true} />

                <Pilot
                  title={attitude.title}
                  {...props}>
                    <PinnedSide
                      type="left"
                      onPress={() => Events._Launch(animations.xPosition)}>
                        <Icon
                          name="bar"
                          width={Styles.__Gobal_Icons_In_Pilot.height} />
                    </PinnedSide>

                    <PinnedSide
                      type="right"
                      onPress={() => alert('ok 2')}>
                        <Icon
                          name="for-you"
                          style={Styles.ForYouButton}
                          height={Styles.__Gobal_Icons_In_Pilot.height} />
                    </PinnedSide>
                </Pilot>

                {
                  attitude.children.map((child, i) => {
                    var childProps = {...child.props};

                    const ultimateKey = Functions._generateNewUniqueObjectKey();

                    childProps.key = childProps.name || ultimateKey;

                    return React.cloneElement(child, childProps);
                  })
                }

                <Pilot
                  layout="tabs">
                    {
                      attitude.tabs.map((tab, i) => {
                        const _GENNERATED_KEY = Functions._generateNewUniqueObjectKey(`${tab}-${i}`),
                              _TAB_TOKEN_NAME = Functions._convertKeywordToToken(tab);

                        if (i === _CURRENT_TAB_INDEX){
                          return (
                            <TabBarItem
                              key={_GENNERATED_KEY}
                              activated={true}
                              name={_TAB_TOKEN_NAME}
                              onPress={() => attitude.onPress(tab)} />
                          );
                        }else{
                          return (
                            <TabBarItem
                              key={_GENNERATED_KEY}
                              name={_TAB_TOKEN_NAME}
                              onPress={() => attitude.onPress(tab)} />
                          );
                        }
                      })
                    }
                </Pilot>
            </View>
        </Animated.View>
    </View>
  );
};
