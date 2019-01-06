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

  const { Interpolation, Events } = MenuCardPulling,
        _CONTAINER_ANIMATION = Interpolation._Container(animations.xPosition),
        _OVERLAY_ANIMATION = Interpolation._Overlay(animations.xPosition);

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
                    <TabBarItem
                      activated={true}
                      name="Dashboard"
                      onPress={() => alert('ok')} />
                    <TabBarItem
                      name="Products"
                      onPress={() => alert('ok')} />
                    <TabBarItem
                      name="Messages"
                      onPress={() => alert('ok')} />
                </Pilot>
            </View>
        </Animated.View>
    </View>
  );
};
