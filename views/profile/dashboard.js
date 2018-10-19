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
    const { props } = this;

    return (
      <View
        style={Styles.MajorContainer}>

          <Animated.View style={[
              Styles.Container,
              {
                transform: [
                  { translateX: this.animations.xPosition },
                  // { scaleX: 0.85 },
                  // { scaleY: 0.85 }
                ]
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
                          _TARGET_X_POSITION_VALUE = (_Screen.width * 72) / 100;
                        }

                        Animated.spring(animations.xPosition, {
                          toValue: _TARGET_X_POSITION_VALUE,
                          duration: 1200,
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
