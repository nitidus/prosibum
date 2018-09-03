import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity, Text, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Global, Modules } from '../styles/index';

const Styles = Modules.Components.Link;

class Link extends Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    var localState = {
      value: props.value,
      onPress: props.onPress || props.onLinkPress || props.linkOnPress
    };

    if (typeof props.style != 'undefined'){
      localState.style = props.style;

      if (typeof localState.style == 'object' && Array.isArray(localState.style)){
        localState.style = localState.style.reduce((total, item) => {
          return {
            ...total,
            ...item
          };
        })
      }
    }else{
      localState.style = {};
    }

    if (typeof props.containerStyle != 'undefined'){
      localState.containerStyle = props.containerStyle;

      if (typeof localState.containerStyle == 'object' && Array.isArray(localState.containerStyle)){
        localState.containerStyle = localState.containerStyle.reduce((total, item) => {
          return {
            ...total,
            ...item
          };
        })
      }
    }else{
      localState.containerStyle = {};
    }

    this.setState(localState);
  }

  render() {
    const { state } = this;

    return (
      <TouchableOpacity
        style={state.containerStyle}
        onPress={state.onPress}>
          <Text
            style={[
              Styles.TextInputLink,
              state.style
            ]}>
              {state.value}
          </Text>
      </TouchableOpacity>
    );
  }
}

Link.propTypes = {
  value: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  containerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ])
};

export default Link;
