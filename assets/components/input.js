import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, View, TouchableHighlight, TextInput, Text, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

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

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    var localState = {
      type: props.type
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

    if (typeof props.name != 'undefined'){
      localState.name = props.name;
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

    if (typeof props.link != 'undefined'){
      localState.link = props.link;
    }

    switch (localState.type.toLowerCase()) {
      case 'text':
      case 'email':
      case 'numeric':
      case 'password':
        localState.placeholder = props.placeholder;
        break;
      case 'link':
      case 'text-link':
      case 'email-link':
      case 'numeric-link':
      case 'password-link':
        localState.placeholder = props.placeholder;
        localState.onPress = props.onPress || props.onLinkPress || props.linkOnPress;
        break;
      case 'button':
        localState.value = props.value;
        localState.onPress = props.onPress || props.onButtonPress || props.buttonOnPress;

        if (typeof props.gradient != 'undefined'){
          localState.gradient = props.gradient;
        }

        if (typeof props.children != 'undefined'){
          localState.children = props.children;
        }
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
            key={state.key}
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
      case 'email':
        return (
          <TextInput
            key={state.key}
            name={state.name}
            autoCapitalize="none"
            keyboardType="email-address"
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
      case 'password':
        return (
          <TextInput
            key={state.key}
            name={state.name}
            autoCapitalize="none"
            returnKeyType="go"
            secureTextEntry={true}
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
      case 'text-link':
        return (
          <View
            key={state.key}
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
      case 'email-link':
        return (
          <View
            key={state.key}
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
              autoCapitalize="none"
              keyboardType="email-address"
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
      case 'password-link':
        return (
          <View
            key={state.key}
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
              autoCapitalize="none"
              secureTextEntry={true}
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
      case 'button':
        var buttonContent;

        if (typeof state.children != 'undefined'){
          buttonContent = state.children.map((child) => {
            return React.cloneElement(child);
          });
        }else if (typeof state.value != 'undefined') {
          buttonContent = <Text
            style={Styles.ButtonTitle}>
            {state.value}
          </Text>;
        }

        if (typeof state.gradient != 'undefined'){
          const restructredRange = Object.keys(state.gradient).map((stepName) => {
            return state.gradient[stepName];
          });

          return (
            <LinearGradient
              style={[
                Styles.ButtonContainer,
                state.style
              ]}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              colors={restructredRange}>
                <TouchableHighlight
                  underlayColor={Global.colors.single.transparent}
                  onPress={state.onPress}>
                    {buttonContent}
                </TouchableHighlight>
            </LinearGradient>
          );
        }else{
          return (
            <TouchableHighlight
              style={[
                Styles.ButtonContainer,
                Styles.RegularTypeButtonContainer,
                state.style
              ]}
              underlayColor={Global.colors.single.transparent}
              onPress={state.onPress}>
                {buttonContent}
            </TouchableHighlight>
          );
        }
        break;
    }
  }
}

Input.propTypes = {
  type: PropTypes.oneOf([
    'TEXT', 'EMAIL', 'NUMERIC', 'PASSWORD',
    'LINK', 'TEXT-LINK', 'EMAIL-LINK', 'NUMERIC-LINK', 'PASSWORD-LINK',
    'BUTTON'
  ]),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  link: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ]),
  gradient: PropTypes.object
};

class InputGroup extends Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillMount() {
    const { props } = this;

    var localState = {
      children: []
    };

    if (typeof props.children != 'undefined'){
      if (Array.isArray(props.children)){
        localState.children = localState.children.concat(props.children);
      }else{
        localState.children.push(props.children);
      }

      localState.children = localState.children.filter((child, i) => {
        var childDisplayName = child.type.displayName;

        if (typeof childDisplayName != 'undefined' && childDisplayName.toLowerCase() == 'input'){
          if (typeof child.props.type != 'undefined'){
            switch (child.props.type.toLowerCase()) {
              case 'text':
              case 'email':
              case 'numeric':
              case 'password':
              case 'link':
              case 'text-link':
              case 'email-link':
              case 'numeric-link':
              case 'password-link':
                return child;
                break;
            }
          }
        }
      });
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
      var childStyle = [
        Styles.InnerInputContainer,
        child.props.style
      ];

      if (i > 0){
        childStyle = [
          Styles.InnerInputContainer,
          {
            borderTopWidth: 2
          },
          child.props.style
        ];
      }

      /*if (typeof child.props.link != 'undefined'){
        childStyle.push({
          paddingHorizontal: 0
        });
      }else{
        childStyle.push({
          paddingHorizontal: 16
        });
      }*/

      return React.cloneElement(child, {
        key: child.props.name,
        style: childStyle
      });
    });

    return (
      <View style={[
        Styles.MasterContainer,
        state.style
      ]}>
        {childrenContent}
      </View>
    )
  }
}

InputGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ])
};

module.exports = {
  Input, InputGroup
};
