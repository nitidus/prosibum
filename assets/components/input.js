import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, TextInput, Keyboard, Text, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Link } from './link';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Input;

import { Functions } from '../modules/index';

export const Input = (props) => {
  var attitude = {};

  if (typeof props.type != 'undefined'){
    attitude.type = props.type.toLowerCase();

    switch (attitude.type) {
      case 'text':
      case 'email':
      case 'numeric':
      case 'password':
        if (typeof props.placeholder != 'undefined'){
          attitude.placeholder = props.placeholder;
        }

        if (typeof props.value != 'undefined'){
          attitude.value = props.value || '';
        }

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        attitude.onBlur = props.onBlur || function (){};
        attitude.onFocus = props.onFocus || function (){};
        break;
      case 'link':
      case 'text-link':
      case 'email-link':
      case 'numeric-link':
      case 'phone-link':
      case 'phone-number-link':
      case 'password-link':
        if (typeof props.placeholder != 'undefined'){
          attitude.placeholder = props.placeholder;
        }

        if (typeof props.value != 'undefined'){
          attitude.value = props.value || '';
        }

        if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.linkOnPress != 'undefined')){
          attitude.onPress = props.onPress || props.onLinkPress || props.linkOnPress;
        }

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

          attitude.onBlur = props.onBlur || function (){};
          attitude.onFocus = props.onFocus || function (){};
        break;
      case 'button':
        if (typeof props.value != 'undefined'){
          attitude.value = props.value;
        }

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        if ((typeof props.forcedDisable != 'undefined' && props.forcedDisable === true) || (typeof props.forcedDisableAppearence != 'undefined' && props.forcedDisableAppearence === true)){
          if (attitude.disable === true){
            attitude.forcedDisable = props.forcedDisable || props.forcedDisableAppearence;
          }
        }

        if ((typeof props.onPress != 'undefined') || (typeof props.onLinkPress != 'undefined') || (typeof props.linkOnPress != 'undefined')){
          attitude.onPress = props.onPress || props.onLinkPress || props.linkOnPress;
        }

        if (typeof props.gradient != 'undefined'){
          attitude.gradient = props.gradient;
        }

        if (typeof props.children != 'undefined'){
          attitude.children = [];

          if (Array.isArray(props.children)){
            attitude.children = attitude.children.concat(props.children);
          }else{
            attitude.children.push(props.children);
          }
        }
        break;
    }
  }

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      attitude.key = Functions._generateNewUniqueObjectKey();
    }
  }

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
  }

  if (typeof props.style != 'undefined'){
    attitude.style = props.style;

    if (typeof attitude.style == 'object' && Array.isArray(attitude.style)){
      attitude.style = attitude.style.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  if (typeof props.link != 'undefined'){
    attitude.link = props.link;
  }

  switch (attitude.type) {
    case 'text':
      return (
        <TextInput
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithoutButton,
            attitude.style
          ]}
          value={attitude.value}
          placeholder={attitude.placeholder}
          placeholderTextColor={Global.colors.single.mercury}
          selectionColor={Global.colors.single.mercury}
          underlineColorAndroid={Global.colors.single.transparent}
          onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
          onBlur={attitude.onBlur}
          onFocus={attitude.onFocus}
          onSubmitEditing={Keyboard.dismiss} />
      )
      break;
    case 'numeric':
      return (
        <TextInput
          key={attitude.key}
          name={attitude.name}
          keyboardType="numeric"
          style={[
            Styles.ContainerWithoutButton,
            attitude.style
          ]}
          value={attitude.value}
          placeholder={attitude.placeholder}
          placeholderTextColor={Global.colors.single.mercury}
          selectionColor={Global.colors.single.mercury}
          underlineColorAndroid={Global.colors.single.transparent}
          onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
          onBlur={attitude.onBlur}
          onFocus={attitude.onFocus}
          onSubmitEditing={Keyboard.dismiss} />
      )
      break;
    case 'email':
      return (
        <TextInput
          key={attitude.key}
          name={attitude.name}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          style={[
            Styles.ContainerWithoutButton,
            attitude.style
          ]}
          value={attitude.value}
          placeholder={attitude.placeholder}
          placeholderTextColor={Global.colors.single.mercury}
          selectionColor={Global.colors.single.mercury}
          underlineColorAndroid={Global.colors.single.transparent}
          onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
          onBlur={attitude.onBlur}
          onFocus={attitude.onFocus}
          onSubmitEditing={Keyboard.dismiss} />
      )
      break;
    case 'password':
      return (
        <TextInput
          key={attitude.key}
          name={attitude.name}
          autoCapitalize="none"
          returnKeyType="go"
          secureTextEntry={true}
          style={[
            Styles.ContainerWithoutButton,
            attitude.style
          ]}
          value={attitude.value}
          placeholder={attitude.placeholder}
          placeholderTextColor={Global.colors.single.mercury}
          selectionColor={Global.colors.single.mercury}
          underlineColorAndroid={Global.colors.single.transparent}
          onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
          onBlur={attitude.onBlur}
          onFocus={attitude.onFocus}
          onSubmitEditing={Keyboard.dismiss} />
      )
      break;
    case 'link':
    case 'text-link':
      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '72%' }
              ]}
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              onSubmitEditing={Keyboard.dismiss} />
            <Link
              containerStyle={Styles.RTL_TextInputLinkContainer}
              style={Styles.TextInputLink}
              value={attitude.link}
              onPress={attitude.onPress} />
        </View>
      )
      break;
    case 'email-link':
      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '72%' }
              ]}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              onSubmitEditing={Keyboard.dismiss} />
            <Link
              containerStyle={Styles.RTL_TextInputLinkContainer}
              style={Styles.TextInputLink}
              value={attitude.link}
              onPress={attitude.onPress} />
        </View>
      )
      break;

    case 'numeric-link':
      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '72%' }
              ]}
              keyboardType="numeric"
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              onSubmitEditing={Keyboard.dismiss} />
            <Link
              containerStyle={Styles.RTL_TextInputLinkContainer}
              style={Styles.TextInputLink}
              value={attitude.link}
              onPress={attitude.onPress} />
        </View>
      )
      break;
    case 'phone-link':
    case 'phone-number-link':
      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            Styles.RTL_Direction,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '72%' }
              ]}
              keyboardType="phone-pad"
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              onSubmitEditing={Keyboard.dismiss} />
            <Link
              containerStyle={Styles.RTL_TextInputLinkContainer}
              style={Styles.TextInputLink}
              value={attitude.link}
              onPress={attitude.onPress} />
        </View>
      )
      break;

    case 'password-link':
      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '72%' }
              ]}
              autoCapitalize="none"
              secureTextEntry={true}
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              onSubmitEditing={Keyboard.dismiss} />
            <Link
              containerStyle={Styles.RTL_TextInputLinkContainer}
              style={Styles.TextInputLink}
              value={attitude.link}
              onPress={attitude.onPress} />
        </View>
      )
      break;
    case 'button':
      var touchablePortion, buttonContent;

      if (typeof attitude.children != 'undefined' && attitude.children.length > 0){
        buttonContent = attitude.children.map((child) => {
          var childProps = {...child.props};

          const ultimateKey = Functions._generateNewUniqueObjectKey();

          childProps.key = childProps.name || ultimateKey;

          return React.cloneElement(child, childProps);
        });
      }else if (typeof attitude.value != 'undefined') {
        buttonContent = <Text
          style={Styles.ButtonTitle}>
          {attitude.value}
        </Text>;
      }

      var _ACTIVE_OPACITY = 0.7;

      if (typeof attitude.gradient != 'undefined'){
        const restructredRange = Object.keys(attitude.gradient).map((stepName) => {
          return attitude.gradient[stepName];
        });

        var _GRADIENT_INPUT_BUTTON_CONTENT = <TouchableOpacity
          activeOpacity={_ACTIVE_OPACITY}
          onPress={attitude.onPress}>
            <LinearGradient
              key={attitude.key}
              name={attitude.name}
              style={[
                Styles.ButtonContainer,
                attitude.style
              ]}
              start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
              colors={restructredRange}>
                {buttonContent}
            </LinearGradient>
        </TouchableOpacity>;

        if (attitude.disable){
          if ((typeof attitude.forcedDisable != 'undefined') && (attitude.forcedDisable === true)) {
            _ACTIVE_OPACITY = 1;

            return (
              <TouchableOpacity
                  activeOpacity={_ACTIVE_OPACITY}
                  style={[
                    Styles.ButtonContainer,
                    attitude.style,
                    Styles.DisableTypeButtonContainer
                  ]}>
                    {buttonContent}
              </TouchableOpacity>
            );
          }else{
            return _GRADIENT_INPUT_BUTTON_CONTENT;
          }
        }else{
          return _GRADIENT_INPUT_BUTTON_CONTENT;
        }
      }else{
        if (attitude.disable){
          _ACTIVE_OPACITY = 1;

          var _DISABLE_BUTTON_STYLE = [
            Styles.ButtonContainer,
            Styles.RegularTypeButtonContainer,
            attitude.style
          ];

          if ((typeof attitude.forcedDisable != 'undefined') && (attitude.forcedDisable === true)) {
            _DISABLE_BUTTON_STYLE = [
              Styles.ButtonContainer,
              attitude.style,
              Styles.DisableTypeButtonContainer
            ];
          }

          return (
            <TouchableOpacity
                activeOpacity={_ACTIVE_OPACITY}
                style={_DISABLE_BUTTON_STYLE}>
                  {buttonContent}
            </TouchableOpacity>
          );
        }else{
          return (
            <TouchableOpacity
                key={attitude.key}
                name={attitude.name}
                style={[
                  Styles.ButtonContainer,
                  Styles.RegularTypeButtonContainer,
                  attitude.style
                ]}
                activeOpacity={_ACTIVE_OPACITY}
                onPress={attitude.onPress}>
                  {buttonContent}
              </TouchableOpacity>
          );
        }
      }
      break;
  }
}

export const InputGroup = (props) => {
  var attitude = {};

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }

    attitude.children = attitude.children.filter((child, i) => {
      var childName = child.type.name;

      if (typeof childName != 'undefined' && childName.toLowerCase() == 'input'){
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
            case 'phone-link':
            case 'phone-number-link':
            case 'password-link':
              return child;
              break;
          }
        }
      }
    });
  }

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      const today = new Date(),
            randomToken = Math.random();

      attitude.key = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());
    }
  }

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
  }

  if (typeof props.style != 'undefined'){
    attitude.style = props.style;

    if (typeof attitude.style == 'object' && Array.isArray(attitude.style)){
      attitude.style = attitude.style.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  return (
    <View style={[
      Styles.MasterContainer,
      attitude.style
    ]}>
      {
        attitude.children.map((child, i) => {
          var childProps = {...child.props};

          var childStyle = [
            Styles.InnerInputContainer,
            childProps.style
          ];

          if (i > 0){
            childStyle = [
              Styles.InnerInputContainer,
              {
                borderTopWidth: 2
              },
              childProps.style
            ];
          }

          /*if (typeof childProps.link != 'undefined'){
            childStyle.push({
              paddingHorizontal: 0
            });
          }else{
            childStyle.push({
              paddingHorizontal: 16
            });
          }*/

          const today = new Date(),
                randomToken = Math.random();

          const ultimateKey = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());

          childProps.key = childProps.name || ultimateKey;
          childProps.style = childStyle;

          return React.cloneElement(child, childProps);
        })
      }
    </View>
  )
}
