import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image, ImageBackground, TextInput, Keyboard, Text, Dimensions, Platform, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CreditCardType from 'rn-credit-card-type';

import { Link } from './link';
import { Icon } from '../layouts/icon';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Input;

import { Functions } from '../modules/index';

const _SCREEN = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((_SCREEN.height === 812 || _SCREEN.width === 812));

export const Input = (props) => {
  var attitude = {},
      otherProps = {};

  if (typeof props.type != 'undefined'){
    attitude.type = props.type.toLowerCase();

    switch (attitude.type) {
      case 'text':
        if (typeof props.placeholder != 'undefined'){
          attitude.placeholder = props.placeholder;
        }

        if (typeof props.value != 'undefined'){
          attitude.value = props.value || '';
        }

        if (typeof props.multiline != 'undefined'){
          otherProps.multiline = attitude.multiline = props.multiline || false;
          otherProps.blurOnSubmit = attitude.blurOnSubmit = props.blurOnSubmit || false;
        }else{
          otherProps.onSubmitEditing = attitude.onSubmitEditing = Keyboard.dismiss;
        }

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        if (attitude.type === 'text'){
          attitude.autoCapitalize = props.autoCapitalize || 'words';
        }

        if (typeof props.maxLength != 'undefined'){
          otherProps.maxLength = attitude.maxLength = props.maxLength;
        }

        attitude.onBlur = props.onBlur || function (){};
        attitude.onFocus = props.onFocus || function (){};
        break;
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

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        if (attitude.type === 'text'){
          attitude.autoCapitalize = props.autoCapitalize || 'words';
        }

        if (typeof props.maxLength != 'undefined'){
          otherProps.maxLength = attitude.maxLength = props.maxLength;
        }

        attitude.onBlur = props.onBlur || function (){};
        attitude.onFocus = props.onFocus || function (){};
        break;
      case 'credit-card':
      case 'debit-card':
      case 'creditcard':
      case 'debitcard':
        if (typeof props.placeholder != 'undefined'){
          attitude.placeholder = props.placeholder;
        }

        if (typeof props.value != 'undefined'){
          attitude.value = props.value || '';
        }

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        if (typeof props.maxLength != 'undefined'){
          otherProps.maxLength = attitude.maxLength = props.maxLength;
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

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        if (attitude.type === 'text-link'){
          attitude.autoCapitalize = props.autoCapitalize || 'words';
        }

        if (typeof props.maxLength != 'undefined'){
          otherProps.maxLength = attitude.maxLength = props.maxLength;
        }

        attitude.onBlur = props.onBlur || function (){};
        attitude.onFocus = props.onFocus || function (){};
        break;
      case 'photo':
      case 'photo-picker':
      case 'cameraroll':
      case 'cameraroll-picker':
      case 'camera-roll':
      case 'camera-roll-picker':
        if (typeof props.value != 'undefined'){
          attitude.value = props.value || '';
        }

        if (typeof props.onPress != 'undefined'){
          attitude.onPress = props.onPress;
        }

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        attitude.icon = props.icon || props.icon_name || props.icon_title|| props.iconName || props.iconTitle || 'GALLERY';

        attitude.photo = props.photo || props.photoURL || props.photo_url || props.photoUrl || props.photoURI || props.photo_uri || props.photoUri || '';

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

        if ((typeof props.onLongPress != 'undefined') || (typeof props.onLinkLongPress != 'undefined') || (typeof props.linkOnLongPress != 'undefined')){
          attitude.onLongPress = props.onLongPress || props.onLinkLongPress || props.linkOnLongPress;
        }

        if (typeof props.gradient != 'undefined'){
          attitude.gradient = props.gradient;
        }

        attitude.activeOpacity = props.activeOpacity || 0.7;

        if (typeof props.children != 'undefined'){
          attitude.children = [];

          if (Array.isArray(props.children)){
            attitude.children = attitude.children.concat(props.children);
          }else{
            attitude.children.push(props.children);
          }
        }

        if (typeof props.textStyle != 'undefined'){
          attitude.textStyle = props.textStyle;

          if (typeof attitude.textStyle == 'object' && Array.isArray(attitude.textStyle)){
            attitude.textStyle = attitude.textStyle.reduce((total, item) => {
              return {
                ...total,
                ...item
              };
            })
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
      var _TEXT_INPUT_STYLES = [
        Styles.ContainerWithoutButton
      ];

      if ((typeof otherProps.multiline != 'undefined') && (otherProps.multiline === true)){
        _TEXT_INPUT_STYLES.push({
          textAlignVertical: 'top',
          paddingTop: Styles.ContainerWithoutButton.height / 3.5,
          height: Styles.ContainerWithoutButton.height * 2
        });
      }

      _TEXT_INPUT_STYLES.push(attitude.style);

      return (
        <TextInput
          key={attitude.key}
          name={attitude.name}
          style={_TEXT_INPUT_STYLES}
          autoCapitalize={attitude.autoCapitalize}
          value={attitude.value}
          placeholder={attitude.placeholder}
          placeholderTextColor={Global.colors.single.mercury}
          selectionColor={Global.colors.single.mercury}
          underlineColorAndroid={Global.colors.single.transparent}
          onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
          onBlur={attitude.onBlur}
          onFocus={attitude.onFocus}
          editable={!attitude.disable}
          {...otherProps} />
      );
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
          editable={!attitude.disable}
          {...otherProps} />
      );
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
          editable={!attitude.disable}
          {...otherProps} />
      );
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
          editable={!attitude.disable}
          {...otherProps} />
      );
      break;
    case 'credit-card':
    case 'debit-card':
    case 'creditcard':
    case 'debitcard':
      var _DETECTED_CREDIT_CARD_TYPE = {},
          _DETECTED_CREDIT_CARD_TYPE_CONTENT;

      if (attitude.value != ''){
        const _DETECTED_CREDIT_CARD_TYPES = CreditCardType.detectCreditCard(attitude.value);

        if (_DETECTED_CREDIT_CARD_TYPES.length > 0){
          const _IS_A_VALID_CREDIT_CARD = (Object.keys(Styles).findIndex((item) => {
            return (Functions._convertTokenToKey(item) === Functions._convertTokenToKey(_DETECTED_CREDIT_CARD_TYPES[0].type));
          }) !== -1)? true: false;

          if (_IS_A_VALID_CREDIT_CARD){
            _DETECTED_CREDIT_CARD_TYPE = _DETECTED_CREDIT_CARD_TYPES[0];
          }
        }

        if (Object.keys(_DETECTED_CREDIT_CARD_TYPE).length > 0){
          const _CREDIT_CARD_TYPE_KEY = Functions._convertTokenToKey(_DETECTED_CREDIT_CARD_TYPE.type);

          _DETECTED_CREDIT_CARD_TYPE_CONTENT = (
            <View
              style={[
                Styles.CreditCardContainer,
                Styles[_CREDIT_CARD_TYPE_KEY]
              ]}>
                <Icon
                  name={_CREDIT_CARD_TYPE_KEY}
                  width={20} />
            </View>
          );
        }else{
          if (attitude.value.length >= 4){
            _DETECTED_CREDIT_CARD_TYPE_CONTENT = (
              <View
                style={Styles.CreditCardContainer}>
                  <Text>?</Text>
              </View>
            );
          }
        }
      }

      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithIcon,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputConatiner,
                { width: '76%', flexGrow: 1 }
              ]}
              autoCapitalize={attitude.autoCapitalize}
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => {
                const APPLIED_MASK_VALUE = Functions._convertTokenToCreditCard(currentValue);

                attitude.onChangeText(APPLIED_MASK_VALUE);
              }}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              editable={!attitude.disable}
              {...otherProps} />

              {_DETECTED_CREDIT_CARD_TYPE_CONTENT}
        </View>
      )
      break;
    case 'link':
    case 'text-link':
      var _LINK_CONTENT = (
        <Link
          containerStyle={Styles.RTL_TextInputLinkContainer}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      // if (attitude.disable){
      //   _LINK_CONTENT = (
      //     <Link
      //       containerStyle={Styles.RTL_TextInputLinkContainer}
      //       style={Styles.TextInputLink}
      //       value={attitude.link} />
      //   );
      // }

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
              autoCapitalize={attitude.autoCapitalize}
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onBlur={attitude.onBlur}
              onFocus={attitude.onFocus}
              editable={!attitude.disable}
              {...otherProps} />

            {_LINK_CONTENT}
        </View>
      )
      break;
    case 'email-link':
      var _LINK_CONTENT = (
        <Link
          containerStyle={Styles.RTL_TextInputLinkContainer}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      // if (attitude.disable){
      //   _LINK_CONTENT = (
      //     <Link
      //       containerStyle={Styles.RTL_TextInputLinkContainer}
      //       style={Styles.TextInputLink}
      //       value={attitude.link} />
      //   );
      // }

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
              editable={!attitude.disable}
              {...otherProps} />

            {_LINK_CONTENT}
        </View>
      )
      break;

    case 'numeric-link':
      var _LINK_CONTENT = (
        <Link
          containerStyle={Styles.RTL_TextInputLinkContainer}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      // if (attitude.disable){
      //   _LINK_CONTENT = (
      //     <Link
      //       containerStyle={Styles.RTL_TextInputLinkContainer}
      //       style={Styles.TextInputLink}
      //       value={attitude.link} />
      //   );
      // }

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
              editable={!attitude.disable}
              {...otherProps} />

            {_LINK_CONTENT}
        </View>
      )
      break;
    case 'phone-link':
    case 'phone-number-link':
      var _LINK_CONTENT = (
        <Link
          containerStyle={Styles.LTR_TextInputLinkContainer}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      // if (attitude.disable){
      //   _LINK_CONTENT = (
      //     <Link
      //       containerStyle={Styles.LTR_TextInputLinkContainer}
      //       style={Styles.TextInputLink}
      //       value={attitude.link} />
      //   );
      // }

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
                Styles.RTL_Pinned
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
              editable={!attitude.disable}
              {...otherProps} />

            {_LINK_CONTENT}
        </View>
      )
      break;

    case 'password-link':
      var _LINK_CONTENT = (
        <Link
          containerStyle={Styles.RTL_TextInputLinkContainer}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      // if (attitude.disable){
      //   _LINK_CONTENT = (
      //     <Link
      //       containerStyle={Styles.RTL_TextInputLinkContainer}
      //       style={Styles.TextInputLink}
      //       value={attitude.link} />
      //   );
      // }

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
              editable={!attitude.disable}
              {...otherProps} />

            {_LINK_CONTENT}
        </View>
      )
      break;

    case 'photo':
    case 'photo-picker':
    case 'cameraroll':
    case 'cameraroll-picker':
    case 'camera-roll':
    case 'camera-roll-picker':
      var _ACTIVE_OPACITY = 0.7,
          _CAMERAROLL_CONTAINER_CONTENT, _CAMERAROLL_CONTENT,
          _CAMERAROLL_CONTENT_VERB_MODE = 'Choose';

      if (typeof attitude.photo != 'undefined' && attitude.photo != ''){
        const _PHOTO_OVERLAY_RANGE = [Global.colors.single.transparent, Functions._convertHexColorToRGBA(Global.colors.single.rangoonGreen, 0.35)];

        _CAMERAROLL_CONTENT = (
          <ImageBackground
          source={{
            uri: attitude.photo
          }}
          style={[
            Styles.PhotoContainer,
            Styles.PhotoContainerWithoutPhoto
          ]}>
            <LinearGradient
              style={Styles.PhotoContainerOverlay}
              colors={_PHOTO_OVERLAY_RANGE}/>
          </ImageBackground>
        );

        _CAMERAROLL_CONTENT_VERB_MODE = 'Edit';
      }else{
        _CAMERAROLL_CONTENT = (
          <View
            style={[
              Styles.PhotoContainer,
              Styles.PhotoContainerWithoutPhoto
            ]}>
            <Icon
              name={attitude.icon} />
          </View>
        );

        _CAMERAROLL_CONTENT_VERB_MODE = 'Choose';
      }

      _CAMERAROLL_CONTAINER_CONTENT = (
        <View
          style={Styles.PhotoInputContainer}>
            {_CAMERAROLL_CONTENT}

            <View style={Styles.PhotoInputLabelContainer}>
              <Text
                style={Styles.PhotoInputLabelContent}>
                  {_CAMERAROLL_CONTENT_VERB_MODE} The {Functions._convertKeywordToToken(attitude.value)}
              </Text>
            </View>
        </View>
      );

      if (attitude.disable){
        return (
          <TouchableOpacity
            key={attitude.key}
            name={attitude.name}
            activeOpacity={_ACTIVE_OPACITY}
            style={[
              Styles.ContainerWithPhoto,
              attitude.style
            ]}>
              {_CAMERAROLL_CONTAINER_CONTENT}
          </TouchableOpacity>
        );
      }else{
        return (
          <TouchableOpacity
            key={attitude.key}
            name={attitude.name}
            activeOpacity={_ACTIVE_OPACITY}
            style={[
              Styles.ContainerWithPhoto,
              attitude.style
            ]}
            onPress={attitude.onPress}>
              {_CAMERAROLL_CONTAINER_CONTENT}
          </TouchableOpacity>
        );
      }
      break;

    case 'button':
      var touchablePortion, buttonContent;

      if (typeof attitude.children != 'undefined' && attitude.children.length > 0){
        buttonContent = attitude.children.map((child) => {
          if (typeof child != 'undefined'){
            var childProps = {...child.props};

            const ultimateKey = Functions._generateNewUniqueObjectKey();

            childProps.key = childProps.name || ultimateKey;

            return React.cloneElement(child, childProps);
          }
        });
      }else if (typeof attitude.value != 'undefined') {
        var _DEFAULT_BUTTON_STYLE = [
          Styles.ButtonTitle
        ];

        if (typeof attitude.textStyle != 'undefined'){
          _DEFAULT_BUTTON_STYLE.push(attitude.textStyle);
        }

        buttonContent = <Text
          style={_DEFAULT_BUTTON_STYLE}>
          {attitude.value}
        </Text>;
      }

      var _ACTIVE_OPACITY = attitude.activeOpacity || 0.7,
          _OTHER_OPTIONS = {};

      if (typeof _ACTIVE_OPACITY != 'undefined'){
        _OTHER_OPTIONS.activeOpacity = _ACTIVE_OPACITY;
      }

      if (typeof attitude.onLongPress != 'undefined'){
        _OTHER_OPTIONS.onLongPress = attitude.onLongPress;
      }

      if (typeof attitude.gradient != 'undefined'){
        const restructredRange = Object.keys(attitude.gradient).map((stepName) => {
          return attitude.gradient[stepName];
        });

        var _GRADIENT_INPUT_BUTTON_CONTENT = <TouchableOpacity
          onPress={attitude.onPress}
          {..._OTHER_OPTIONS}>
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
            _OTHER_OPTIONS.activeOpacity = 1;

            return (
              <TouchableOpacity
                  style={[
                    Styles.ButtonContainer,
                    attitude.style,
                    Styles.DisableTypeButtonContainer
                  ]}
                  {..._OTHER_OPTIONS}>
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
                style={_DISABLE_BUTTON_STYLE}
                {..._OTHER_OPTIONS}>
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
                onPress={attitude.onPress}
                {..._OTHER_OPTIONS}>
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
          var childProps = {...child.props},
              childStyle = [
                Styles.InnerInputContainer,
                childProps.style
              ];

          if (i > 0){
            var _BORDER_TOP_WIDTH = 2;

            if ((Platform.OS !== 'ios') && (_SCREEN.width >= 1000 || _SCREEN.height >= 1000)){
              _BORDER_TOP_WIDTH += 1;
            }

            childStyle = [
              Styles.InnerInputContainer,
              {
                borderTopWidth: _BORDER_TOP_WIDTH
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
