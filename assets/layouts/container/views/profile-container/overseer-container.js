import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Pilot, TabBarItem, PinnedSide, Icon, DrawerMenu } from '../../../../layouts/index';
const Styles = Views.Profile.Overseer;

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

  if ((typeof props.bottomBarTabs != 'undefined') || (typeof props.bottom_bar_tabs != 'undefined') || (typeof props.bottomTabs != 'undefined') || (typeof props.bottom_tabs != 'undefined')){
    attitude.bottomBarTabs = props.bottomBarTabs || props.bottom_bar_tabs || props.bottomTabs || props.bottom_tabs;
  }

  if ((typeof props.currentBottomTab != 'undefined') || (typeof props.current_bottom_tab != 'undefined') || (typeof props.currentBottomBarTab != 'undefined') || (typeof props.current_bottom_bar_tab != 'undefined')){
    attitude.currentBottomTab = props.currentBottomTab || props.current_bottom_tab || props.currentBottomBarTab || props.current_bottom_bar_tab;
  }

  if ((typeof props.onBottomBarPress != 'undefined') || (typeof props.on_bottom_press != 'undefined') || (typeof props.onBottomBarTabItemPress != 'undefined') || (typeof props.on_bottom_bar_tab_item_press != 'undefined')){
    attitude.onBottomBarPress = props.onBottomBarPress || props.on_bottom_bar_press || props.onBottomBarTabItemPress || props.on_bottom_bar_tab_item_press;
  }

  if ((typeof props.topBarTabs != 'undefined') || (typeof props.top_bar_tabs != 'undefined') || (typeof props.topTabs != 'undefined') || (typeof props.top_tabs != 'undefined')){
    attitude.topBarTabs = props.topBarTabs || props.top_bar_tabs || props.topTabs || props.top_tabs;
  }

  if ((typeof props.currentTopTab != 'undefined') || (typeof props.current_top_tab != 'undefined') || (typeof props.currentTopBarTab != 'undefined') || (typeof props.current_top_bar_tab != 'undefined')){
    attitude.currentTopTab = props.currentTopTab || props.current_top_tab || props.currentTopBarTab || props.current_top_bar_tab;
  }

  if ((typeof props.onTopBarPress != 'undefined') || (typeof props.on_top_press != 'undefined') || (typeof props.onTopBarTabItemPress != 'undefined') || (typeof props.on_top_bar_tab_item_press != 'undefined')){
    attitude.onTopBarPress = props.onTopBarPress || props.on_top_bar_press || props.onTopBarTabItemPress || props.on_top_bar_tab_item_press;
  }

  if (
    (typeof props.onRightIconPress != 'undefined') || (typeof props.onRightItemPress != 'undefined') || (typeof props.onRightPress != 'undefined') ||
    (typeof props.on_right_icon_press != 'undefined') || (typeof props.on_right_item_press != 'undefined') || (typeof props.on_right_press != 'undefined')
  ){
    attitude.onRightIconPress = props.onRightIconPress || props.onRightIconPress || props.onRightPress || props.on_right_icon_pres || props.on_right_item_pres || props.on_right_press;

    attitude.rightIcon = props.rightIcon || props.rightIconName || '';
  }

  if (
    (typeof props.tailPilotChildren != 'undefined') || (typeof props.tailPilotContent != 'undefined') || (typeof props.lastPilotChildren != 'undefined') || (typeof props.lastPilotContent != 'undefined') || (typeof props.tailPilot != 'undefined') || (typeof props.lastPilot != 'undefined') ||
    (typeof props.tail_pilot_children != 'undefined') || (typeof props.tail_pilot_content != 'undefined') || (typeof props.last_pilot_children != 'undefined') || (typeof props.last_pilot_content != 'undefined') || (typeof props.tail_pilot != 'undefined') || (typeof props.last_pilot != 'undefined')
  ){
    const _TAIL_PILOT_CONTENT = props.tailPilotChildren || props.tailPilotContent || props.lastPilotChildren || props.lastPilotContent || props.tailPilot || props.lastPilot || props.tail_pilot_children || props.tail_pilot_content || props.last_pilot_children || props.last_pilot_content || props.tail_pilot || props.last_pilot;

    attitude.tailPilotChildren = [];

    if (Array.isArray(_TAIL_PILOT_CONTENT)){
      attitude.tailPilotChildren = attitude.tailPilotChildren.concat(_TAIL_PILOT_CONTENT);
    }else{
      attitude.tailPilotChildren.push(_TAIL_PILOT_CONTENT);
    }
  }

  const { Interpolation, Events } = MenuCardPulling,
        _CONTAINER_ANIMATION = Interpolation._Container(animations.xPosition),
        _OVERLAY_ANIMATION = Interpolation._Overlay(animations.xPosition);

  var _CURRENT_TAB_INDEX = attitude.bottomBarTabs.findIndex((tab) => {
        const _CURRENT_TAB_IN_KEY_FORMAT = Functions._convertTokenToKey(attitude.currentBottomTab),
              _TAB_IN_KEY_FORMAT = Functions._convertTokenToKey(tab);

        return (_TAB_IN_KEY_FORMAT === _CURRENT_TAB_IN_KEY_FORMAT);
      }),
      _RIGHT_PINNED_ITEMS, _BOTTOM_PINNED_ITEMS, _TAIL_PINNED_CONTENT,
      _TOP_BAR_ITEMS = (typeof attitude.topBarTabs != 'undefined')? attitude.topBarTabs: [],
      _CURRENT_TOP_BAR_ITEM = (typeof attitude.currentTopTab != 'undefined')? attitude.currentTopTab: '';

  if ((_TOP_BAR_ITEMS.length > 0) && (_CURRENT_TOP_BAR_ITEM !== '')){
    _BOTTOM_PINNED_ITEMS = (
      <PinnedSide
        type="bottom"
        items={_TOP_BAR_ITEMS}
        current={_CURRENT_TOP_BAR_ITEM}
        onPress={attitude.onTopBarPress} />
    );
  }

  if (typeof attitude.onRightIconPress != 'undefined'){
    _RIGHT_PINNED_ITEMS = (
      <PinnedSide
        type="right"
        onPress={attitude.onRightIconPress}>
          <Icon
            name={attitude.rightIcon}
            style={Styles.ForYouButton}
            height={Styles.__Gobal_Icons_In_Pilot.height} />
      </PinnedSide>
    )
  }

  if (typeof attitude.tailPilotChildren != 'undefined'){
    if (attitude.tailPilotChildren.length > 0){
      _TAIL_PINNED_CONTENT = (
        <PinnedSide
          type="tail">
            {
              attitude.tailPilotChildren.map((child, i) => {
                var childProps = {...child.props};

                const ultimateKey = Functions._generateNewUniqueObjectKey();

                childProps.key = childProps.name || ultimateKey;

                return React.cloneElement(child, childProps);
              })
            }
        </PinnedSide>
      )
    }
  }

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

                    {_RIGHT_PINNED_ITEMS}

                    {_BOTTOM_PINNED_ITEMS}

                    {_TAIL_PINNED_CONTENT}
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
                      attitude.bottomBarTabs.map((tab, i) => {
                        const _GENNERATED_KEY = Functions._generateNewUniqueObjectKey(`${tab}-${i}`),
                              _TAB_TOKEN_NAME = Functions._convertKeywordToToken(tab);

                        if (i === _CURRENT_TAB_INDEX){
                          return (
                            <TabBarItem
                              key={_GENNERATED_KEY}
                              activated={true}
                              name={_TAB_TOKEN_NAME}
                              onPress={() => attitude.onBottomBarPress(tab)} />
                          );
                        }else{
                          return (
                            <TabBarItem
                              key={_GENNERATED_KEY}
                              name={_TAB_TOKEN_NAME}
                              onPress={() => attitude.onBottomBarPress(tab)} />
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
