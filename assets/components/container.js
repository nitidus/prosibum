import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Animated, Easing } from 'react-native';

import { Global, Modules } from '../styles/index';

const Styles = Modules.Components.Container;

class Container extends Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    const { state } = this;

    var localState = state;

    if (typeof props.active != 'undefined'){
      localState.active = props.active;
    }

    this.setState(localState);
  }

  componentWillMount() {
    const { props } = this;

    var localState = {
      type: props.type,
      children: []
    };

    if (typeof props.key != 'undefined'){
      localState.key = props.key;
    }else{
      if (typeof props.name != 'undefined'){
        localState.key = props.name;
      }else{
        const today = new Date(),
              randomToken = Math.random();

        localState.key = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());
      }
    }

    if (typeof props.children != 'undefined'){
      if (Array.isArray(props.children)){
        localState.children = localState.children.concat(props.children);
      }else{
        localState.children.push(props.children);
      }
    }

    if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
      localState.name = props.name || props.title;
    }

    if (typeof props.active != 'undefined'){
      localState.active = props.active;
    }

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

    var childrenContent;

    childrenContent = state.children.map((child, i, children) => {
      return React.cloneElement(child, {
        key: child.props.key || child.props.name
      });
    });

    var visibilityStyle = {};

    if ((typeof state.active == 'undefined') || !state.active){
      visibilityStyle.display = "none";
    }

    return (
      <View
        key={state.key}
        name={state.name}
        style={[
          state.style,
          visibilityStyle
        ]}>
          {childrenContent}
      </View>
    )
  }
}

Container.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

export default Container;
