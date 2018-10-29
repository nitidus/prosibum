import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableWithoutFeedback, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Navigation, PinnedSide, Icon, DrawerMenu } from '../../../../layouts/index';
const Styles = Views.Profile.Dashboard;

import { Functions, Utils } from '../../../../modules/index';
const { MenuCardPulling } = Utils.Animations.MenuPulling;

export const DashboardContainer = (props) => {
  var attitude = {},
      animations = {
        xPosition: new Animated.Value(0)
      };

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
        <DrawerMenu />

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

                <Navigation
                  title="Dashoard"
                  {...props}>
                    <PinnedSide
                      type="left"
                      onPress={() => Events._Launch(animations.xPosition)}>
                        <Icon
                          name="bar" />
                    </PinnedSide>

                    <PinnedSide
                      type="right"
                      onPress={() => alert('ok 2')}>
                        <Icon
                          name="for-you" />
                    </PinnedSide>
                </Navigation>

                {
                  attitude.children.map((child, i) => {
                    var childProps = {...child.props};

                    const ultimateKey = Functions._generateNewUniqueObjectKey();

                    childProps.key = childProps.name || ultimateKey;

                    return React.cloneElement(child, childProps);
                  })
                }
            </View>
        </Animated.View>
    </View>
  );
};
