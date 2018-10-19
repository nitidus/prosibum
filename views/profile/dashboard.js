import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableWithoutFeedback, Dimensions, Animated, Easing } from 'react-native';

import { Global, Views } from '../../assets/styles/index';
import { Navigation, PinnedSide, Icon } from '../../assets/layouts/index';
const Styles = Views.Profile.Dashboard,
      _Screen = Dimensions.get('window');

import { Functions } from '../../assets/modules/index';

const DashboardContainer = (props) => {
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

  const _LAUNCHED_MENU_SCREEN_X_POSITION = (_Screen.width * 72) / 100,
        _X_POSITION_ANIMATION_RANGE = [0, _LAUNCHED_MENU_SCREEN_X_POSITION];

  let _MENU_TRANSFORMATION = {
    transform: [
      { translateX: animations.xPosition },
      {
        scaleX: animations.xPosition.interpolate({
          inputRange: _X_POSITION_ANIMATION_RANGE,
          outputRange: [1, 0.85]
        })
      },
        {
          scaleY: animations.xPosition.interpolate({
          inputRange: _X_POSITION_ANIMATION_RANGE,
          outputRange: [1, 0.85]
        })
      }
    ]
  };

  return (
    <View
      style={Styles.MajorContainer}>
        <Animated.View
          style={[
            Styles.ContainerOverlay,
            {
              ..._MENU_TRANSFORMATION,
              zIndex: animations.xPosition.interpolate({
                inputRange: _X_POSITION_ANIMATION_RANGE,
                outputRange: [-1, 1000000]
              })
            }
          ]}>
            <TouchableWithoutFeedback
              onPress={() => {
                var _TARGET_X_POSITION_VALUE = 0;

                if (animations.xPosition._value !== animations.xPosition._startingValue){
                  Animated.spring(animations.xPosition, {
                    toValue: _TARGET_X_POSITION_VALUE,
                    friction: 10,
                    tension: 25,
                    easing: Easing.quad
                  }).start();
                }
              }}>
              <View
                style={Styles.ContainerOverlayContent}/>
            </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View
          style={[
              Styles.Container,
              {
                ..._MENU_TRANSFORMATION,
                shadowOpacity: animations.xPosition.interpolate({
                  inputRange: _X_POSITION_ANIMATION_RANGE,
                  outputRange: [0, 0.15]
                }),
                shadowRadius: animations.xPosition.interpolate({
                  inputRange: _X_POSITION_ANIMATION_RANGE,
                  outputRange: [0, 30]
                }),
                shadowOffset: {
                  width: 0,
                  height: animations.xPosition.interpolate({
                    inputRange: _X_POSITION_ANIMATION_RANGE,
                    outputRange: [0, 30]
                  })
                }
              }
          ]}>
            <View
              style={Styles.MajorContent}>
                <StatusBar hidden={true} />

                <Navigation
                  title="Dashoard"
                  {...props}>
                    <PinnedSide
                      type="left"
                      onPress={() => {
                        Animated.spring(animations.xPosition, {
                          toValue: _LAUNCHED_MENU_SCREEN_X_POSITION,
                          friction: 10,
                          tension: 25,
                          easing: Easing.quad
                        }).start();
                      }}>
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

export default class Dashboard extends Component<{}> {
  static navigationOptions = {

  };

  render() {
    const { props } = this;

    return (
      <DashboardContainer>
        <Text>Dashboard page.</Text>
      </DashboardContainer>
    )
  }
}
