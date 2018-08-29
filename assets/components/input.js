import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, View, TouchableHighlight, TextInput, Text, Animated, Easing } from 'react-native';

import {
  Global,
  Modules
} from '../../assets/styles/index';

const Styles = Modules.Components.Input;

class Input extends Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillMount() {
    const { props } = this;

    var localState = {
      type: props.type
    };

    if (typeof props.name != 'undefined'){
      localState.name = props.name;
    }

    if (typeof props.style != 'undefined'){
      localState.style = props.style;

      if (typeof localState.style == 'object' && Array.isArray(localState.style)){
        localState.style = localState.style.reduce((total, item) => {
          total.concat(itam);
        })
      }
    }else{
      localState.style = {};
    }

    if (typeof props.link != 'undefined'){
      localState.link = props.link;
      localState.type = (localState.type.toLowerCase() != 'text-with-link' || localState.type.toLowerCase() != 'link')? 'link': localState.type;
    }

    switch (localState.type.toLowerCase()) {
      case 'text':
        localState.placeholder = props.placeholder;
        break;
      case 'link':
      case 'text-with-link':
        localState.placeholder = props.placeholder;
        localState.onPress = props.onPress || props.onLinkPress || props.linkOnPress;
        break;
    }

    this.setState(localState);
  }

  render() {
    const { state } = this;

    switch (state.type.toLowerCase()) {
      case 'text':
        return (
          <TextInput
            name={state.name}
            style={[
              Styles.ContainerWithoutButton,
              state.style
            ]}
            placeholder={state.placeholder}
            placeholderTextColor={Global.colors.single.mercury}
            selectionColor={Global.colors.single.mercury}
            underlineColorAndroid={Global.colors.single.transparent} />
        )
        break;
      case 'link':
      case 'text-with-link':
        return (
          <View
            name={state.name}
            style={[
              Styles.ContainerWithButton,
              state.style
            ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '72%' }
              ]}
              placeholder={state.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent} />
            <TouchableHighlight
              style={Styles.RTL_TextInputLinkContainer}
              underlayColor={Global.colors.single.transparent}
              onPress={state.onPress}>
                <Text
                  style={Styles.TextInputLink}>
                    {state.link}
                </Text>
            </TouchableHighlight>
          </View>
        )
        break;
      default:
        return (
          <Text>ok</Text>
        )
    }
  }
}

Input.propTypes = {
  type: PropTypes.oneOf([ 'TEXT', 'LINK', 'TEXT-WITH-LINK' ]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  link: PropTypes.string,
  onPress: PropTypes.func
};

export default Input;
