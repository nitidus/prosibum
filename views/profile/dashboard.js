import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableWithoutFeedback, Dimensions, Animated, Easing } from 'react-native';

import { Global, Views } from '../../assets/styles/index';
import { Navigation, PinnedSide, Icon } from '../../assets/layouts/index';
const Styles = Views.Profile.Dashboard,
      _Screen = Dimensions.get('window');

export default class Dashboard extends Component<{}> {
  static navigationOptions = {

  };

  componentWillMount() {
    this.animations = {
      xPosition: new Animated.Value(0)
    };
  }

  render() {
    const { props } = this,
          _LAUNCHED_MENU_SCREEN_X_POSITION = (_Screen.width * 72) / 100,
          _X_POSITION_ANIMATION_RANGE = [0, _LAUNCHED_MENU_SCREEN_X_POSITION];

    return (
      <View
        style={Styles.MajorContainer}>

          <Animated.View style={[
              Styles.Container,
              {
                transform: [
                  { translateX: this.animations.xPosition },
                  {
                    scaleX: this.animations.xPosition.interpolate({
                      inputRange: _X_POSITION_ANIMATION_RANGE,
                      outputRange: [1, 0.85]
                    })
                  },
                    {
                      scaleY: this.animations.xPosition.interpolate({
                      inputRange: _X_POSITION_ANIMATION_RANGE,
                      outputRange: [1, 0.85]
                    })
                  }
                ],
                shadowOpacity: this.animations.xPosition.interpolate({
                  inputRange: _X_POSITION_ANIMATION_RANGE,
                  outputRange: [0, 0.15]
                }),
                shadowRadius: this.animations.xPosition.interpolate({
                  inputRange: _X_POSITION_ANIMATION_RANGE,
                  outputRange: [0, 30]
                }),
                shadowOffset: {
                  width: 0,
                  height: this.animations.xPosition.interpolate({
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
                        var { _IS_MENU_LAUNCHED, animations } = this,
                            _TARGET_X_POSITION_VALUE = 0;

                        if (animations.xPosition._value === animations.xPosition._startingValue){
                          _TARGET_X_POSITION_VALUE = _LAUNCHED_MENU_SCREEN_X_POSITION;
                        }

                        Animated.spring(animations.xPosition, {
                          toValue: _TARGET_X_POSITION_VALUE,
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

                <Text>Dashboard page.</Text>
            </View>
          </Animated.View>
      </View>
    )
  }
}
