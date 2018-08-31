import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Text, Animated, Easing } from 'react-native';

import {
  Global,
  Modules
} from '../../assets/styles/index';

const Styles = Modules.Components.Headline;

class Headline extends Component<{}> {
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
      title: props.title,
      subtitle: props.subtitle
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

    this.setState(localState);
  }

  render() {
    const { state } = this;

    return (
      <View style={[
        Styles.Container,
        state.style
      ]}>
        <Text style={Styles.Title}>{state.title}</Text>
        <Text style={Styles.Subtitle}>{state.subtitle}</Text>
      </View>
    )
  }
}

Headline.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ])
};

export default Headline;
