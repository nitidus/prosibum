import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image, ImageBackground, TextInput, WebView, KeyboardAvoidingView, Keyboard, I18nManager, Text, Dimensions, Platform, Animated, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import CreditCardType from 'rn-credit-card-type';
import RichTextEditorTemplate from './assets/html/rich-text-editor.html';

import { Link } from './link';
import { Icon } from '../layouts/icon';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Input;

import { Functions } from '../modules/index';

import { components_constants } from '../flows/knowledge/index';
const __CONSTANTS = components_constants.input;

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

        if (typeof props.reference != 'undefined'){
          otherProps.ref = attitude.ref = props.reference;
        }

        attitude.onBlur = props.onBlur || function (){};
        attitude.onFocus = props.onFocus || function (){};
        break;
      case 'richtext':
      case 'rich-text':
      case 'richtexteditor':
      case 'rich-text-editor':
      case 'wysiwyg':
      case 'wysiwyg-editor':
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

        if (typeof props.reference != 'undefined'){
          otherProps.ref = attitude.ref = props.reference;
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

        if (typeof props.reference != 'undefined'){
          otherProps.ref = attitude.ref = props.reference;
        }

        attitude.onBlur = props.onBlur || function (){};
        attitude.onFocus = props.onFocus || function (){};
        break;
      case 'tags':
      case 'tag':
      case 'chips':
      case 'chip':
      case 'badges':
      case 'badge':
        if (typeof props.placeholder != 'undefined'){
          attitude.placeholder = props.placeholder;
        }

        if (typeof props.value != 'undefined'){
          attitude.value = props.value || '';
        }

        attitude.tags = props.tags || props.chips || props.badges || props.data || props.source || [];
        otherProps.multiline = attitude.multiline = false;
        otherProps.blurOnSubmit = attitude.blurOnSubmit = false;

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        attitude.disable = props.disable || (props.forcedDisable || props.forcedDisableAppearence) || false;

        if ((typeof props.onChangeText != 'undefined') || (typeof props.onChange != 'undefined')){
          attitude.onChangeText = props.onChangeText || props.onChange;
        }

        if ((typeof props.onSubmitEditing != 'undefined') || (typeof props.onSubmit != 'undefined')){
          attitude.onSubmitEditing = props.onSubmitEditing || props.onSubmit;
        }

        if ((typeof props.onRemove != 'undefined') || (typeof props.onRemoveTag != 'undefined')){
          attitude.onRemove = props.onRemove || props.onRemoveTag;
        }

        if (attitude.type === 'text'){
          attitude.autoCapitalize = props.autoCapitalize || 'words';
        }

        if (typeof props.gradient != 'undefined'){
          attitude.gradient = props.gradient;
        }

        if (typeof props.reference != 'undefined'){
          otherProps.ref = attitude.ref = props.reference;
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

        if (typeof props.reference != 'undefined'){
          otherProps.ref = attitude.ref = props.reference;
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

        if (typeof props.reference != 'undefined'){
          otherProps.ref = attitude.ref = props.reference;
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

        if ((typeof props.onLongPress != 'undefined') || (typeof props.onLinkLongPress != 'undefined') || (typeof props.linkOnLongPress != 'undefined')){
          attitude.onLongPress = props.onLongPress || props.onLinkLongPress || props.linkOnLongPress;
        }

        if (typeof props.gradient != 'undefined'){
          attitude.gradient = props.gradient;
        }

        attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

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

    case 'richtext':
    case 'rich-text':
    case 'richtexteditor':
    case 'rich-text-editor':
    case 'wysiwyg':
    case 'wysiwyg-editor':
      return (
        <View
          style={[
            Styles.NonNativeContainer,
            attitude.style
          ]}>
          <WebView
            ref={( webView ) => this[attitude.name] = webView}
            name={attitude.name}
            style={Styles.NonNativeContent}
            source={RichTextEditorTemplate}
            onMessage={(event) => {
              let _RESPONSE = JSON.parse(event.nativeEvent.data);

              switch (_RESPONSE.type) {
                case 'event':
                  switch (_RESPONSE.content.eventType) {
                    case 'changeText':
                      attitude.onChangeText(_RESPONSE.content.context);
                      break;
                  }
                  break;
              }
            }}
            onLoadStart={() => {
              let _REQUEST = {
                    type: 'stylesheet',
                    content: {
                      ...Styles.RichTextEditorContaienr,
                      minHeight: Styles.NonNativeContainer.minHeight
                    }
                  },
                  _SERIALIZED_REQUEST = JSON.stringify(_REQUEST);

              this[attitude.name].postMessage(_SERIALIZED_REQUEST);

              _REQUEST = {
                type: 'attributes',
                content: {}
              };

              if (typeof attitude.placeholder != 'undefined'){
                _REQUEST.content.placeholder = attitude.placeholder;
              }

              _SERIALIZED_REQUEST = JSON.stringify(_REQUEST);

              this[attitude.name].postMessage(_SERIALIZED_REQUEST);
            }}
            {...otherProps} />
        </View>
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
          onChangeText={(currentValue) => {
            if (I18nManager.isRTL){
              const _FINILIZED_DIGITS = Functions._convertDigitsToEnglish(currentValue);

              return attitude.onChangeText(_FINILIZED_DIGITS);
            }else{
              return attitude.onChangeText(currentValue);
            }
          }}
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

    case 'tags':
    case 'tag':
    case 'chips':
    case 'chip':
    case 'badges':
    case 'badge':
      var _TAGS_CONTAINER_STYLES = [
            Styles.ContainerWithTags
          ],
          _TAGS_INPUT_STYLES= [
            Styles.ContainerWithTagsInput
          ],
          _TAGS_CONTENT;

      _TAGS_CONTAINER_STYLES.push(attitude.style)

      if (attitude.tags.length > 0){
        let otherGlobalTagProps = {};

        if (typeof attitude.gradient != 'undefined'){
          otherGlobalTagProps.gradient = attitude.gradient;
        }

        _TAGS_INPUT_STYLES.push({
          marginBottom: Styles.ContainerWithTags.paddingTop
        });

        _TAGS_CONTENT = (
          <View
            style={Styles.ContainerWithTagsContent}>
              {
                attitude.tags.map((tag, i) => {
                  return (
                    <Input
                      type={__CONSTANTS.tags.tag.type}
                      name={`${Functions._convertTokenToKeyword(__CONSTANTS.tags.tag.title.en)}-${i}`}
                      style={Styles.TagItemContainer}
                      disable={true}
                      {...otherGlobalTagProps}>
                        <Link
                          name={`${Functions._convertTokenToKeyword(__CONSTANTS.tags.tag.content.firstLink.title.en)}-${i}`}
                          onPress={() => attitude.onRemove(tag)}>
                            <Icon
                              name={__CONSTANTS.tags.tag.content.firstLink.context.icon}
                              style={Styles.TagItemContentIcon}/>
                        </Link>

                        <Text
                          style={Styles.TagItemContentText}>
                            {tag}
                        </Text>
                    </Input>
                  );
                })
              }
          </View>
        );
      }

      return (
        <View
          style={_TAGS_CONTAINER_STYLES}>
            {_TAGS_CONTENT}

            <TextInput
              key={attitude.key}
              name={attitude.name}
              style={_TAGS_INPUT_STYLES}
              autoCapitalize={attitude.autoCapitalize}
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => attitude.onChangeText(currentValue)}
              onSubmitEditing={({nativeEvent: { text, eventCount, target }}) => {
                if (text != ''){
                  attitude.onSubmitEditing(text);
                }

                Keyboard.dismiss();
              }}
              onBlur={() => {
                attitude.onBlur();

                if (attitude.value != ''){
                  attitude.onSubmitEditing(attitude.value);
                }
              }}
              onFocus={attitude.onFocus}
              editable={!attitude.disable}
              {...otherProps}
              {...__CONSTANTS.tags.input.options} />
        </View>
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
                Styles.TextInputContainer,
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
      );
      break;

    case 'link':
    case 'text-link':
      var _EXTRA_STYLE_FOR_LINK = {};

      if (attitude.disable === true){
        _EXTRA_STYLE_FOR_LINK = Styles.FilledContainer;
      }

      var _LINK_CONTENT = (
        <Link
          containerStyle={[
            Styles.TextInputLinkContainer,
            _EXTRA_STYLE_FOR_LINK
          ]}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={Styles.TextInputContainer}
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
      var _EXTRA_STYLE_FOR_LINK = {};

      if (attitude.disable === true){
        _EXTRA_STYLE_FOR_LINK = Styles.FilledContainer;
      }

      var _LINK_CONTENT = (
        <Link
          containerStyle={[
            Styles.TextInputLinkContainer,
            _EXTRA_STYLE_FOR_LINK
          ]}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={Styles.TextInputContainer}
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
      var _EXTRA_STYLE_FOR_LINK = {};

      if (attitude.disable === true){
        _EXTRA_STYLE_FOR_LINK = Styles.FilledContainer;
      }

      var _LINK_CONTENT = (
        <Link
          containerStyle={[
            Styles.TextInputLinkContainer,
            _EXTRA_STYLE_FOR_LINK
          ]}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={Styles.TextInputContainer}
              keyboardType="numeric"
              value={attitude.value}
              placeholder={attitude.placeholder}
              placeholderTextColor={Global.colors.single.mercury}
              selectionColor={Global.colors.single.mercury}
              underlineColorAndroid={Global.colors.single.transparent}
              onChangeText={(currentValue) => {
                if (I18nManager.isRTL){
                  const _FINILIZED_DIGITS = Functions._convertDigitsToEnglish(currentValue);

                  return attitude.onChangeText(_FINILIZED_DIGITS);
                }else{
                  return attitude.onChangeText(currentValue);
                }
              }}
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
      var _EXTRA_STYLE_FOR_LINK = {};

      if (attitude.disable === true){
        _EXTRA_STYLE_FOR_LINK = Styles.FilledContainer;
      }

      var _LINK_CONTAINER_STYLES = [
            Styles.ContainerWithButton
          ],
          _LINK_CONTENT = (
            <Link
              containerStyle={[
                Styles.TextInputLinkContainer,
                _EXTRA_STYLE_FOR_LINK
              ]}
              style={Styles.TextInputLink}
              value={attitude.link}
              onPress={attitude.onPress} />
          );

      if (!I18nManager.isRTL){
        _LINK_CONTAINER_STYLES.push({
          direction: 'rtl'
        });
      }

      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            _LINK_CONTAINER_STYLES,
            attitude.style
          ]}>
            <TextInput
              style={[
                Styles.TextInputContainer,
                {
                  textAlign: 'left'
                }
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
      var _EXTRA_STYLE_FOR_LINK = {};

      if (attitude.disable === true){
        _EXTRA_STYLE_FOR_LINK = Styles.FilledContainer;
      }

      var _LINK_CONTENT = (
        <Link
          containerStyle={[
            Styles.TextInputLinkContainer,
            _EXTRA_STYLE_FOR_LINK
          ]}
          style={Styles.TextInputLink}
          value={attitude.link}
          onPress={attitude.onPress} />
      );

      return (
        <View
          key={attitude.key}
          name={attitude.name}
          style={[
            Styles.ContainerWithButton,
            attitude.style
          ]}>
            <TextInput
              style={Styles.TextInputContainer}
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
          _OTHER_OPTIONS = {},
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

        _CAMERAROLL_CONTENT_VERB_MODE = __CONSTANTS.cameraRollPicker.state.filled.verb[attitude.language];
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

        _CAMERAROLL_CONTENT_VERB_MODE = __CONSTANTS.cameraRollPicker.state.empty.verb[attitude.language];
      }

      if (typeof attitude.onLongPress != 'undefined'){
        _OTHER_OPTIONS.onLongPress = attitude.onLongPress;
      }

      if (typeof attitude.gradient != 'undefined'){
        const restructredRange = Object.keys(attitude.gradient).map((stepName) => {
          return attitude.gradient[stepName];
        });

        _CAMERAROLL_CONTAINER_CONTENT = (
          <LinearGradient
            style={Styles.PhotoInputContainer}
            start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
            colors={restructredRange}>
              {_CAMERAROLL_CONTENT}

              <View style={Styles.PhotoInputLabelContainer}>
                <Text
                  style={{
                    ...Styles.PhotoInputLabelContent,
                    color: Global.colors.single.rangoonGreen
                  }}>
                    {_CAMERAROLL_CONTENT_VERB_MODE} {Functions._convertKeywordToToken(attitude.value)}
                </Text>
              </View>
          </LinearGradient>
        );
      }else{
        _CAMERAROLL_CONTAINER_CONTENT = (
          <View
            style={Styles.PhotoInputContainer}>
              {_CAMERAROLL_CONTENT}

              <View style={Styles.PhotoInputLabelContainer}>
                <Text
                  style={Styles.PhotoInputLabelContent}>
                    {_CAMERAROLL_CONTENT_VERB_MODE} {Functions._convertKeywordToToken(attitude.value)}
                </Text>
              </View>
          </View>
        );
      }

      if (attitude.disable){
        return (
          <TouchableOpacity
            key={attitude.key}
            name={attitude.name}
            activeOpacity={_ACTIVE_OPACITY}
            style={[
              Styles.ContainerWithPhoto,
              attitude.style
            ]}
            {..._OTHER_OPTIONS}>
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
            onPress={attitude.onPress}
            {..._OTHER_OPTIONS}>
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
            case 'tags':
            case 'tag':
            case 'chips':
            case 'chip':
            case 'badges':
            case 'badge':
            case 'credit-card':
            case 'debit-card':
            case 'creditcard':
            case 'debitcard':
            case 'link':
            case 'text-link':
            case 'email-link':
            case 'numeric-link':
            case 'phone-link':
            case 'phone-number-link':
            case 'password-link':
            case 'photo':
            case 'photo-picker':
            case 'cameraroll':
            case 'cameraroll-picker':
            case 'camera-roll':
            case 'camera-roll-picker':
            case 'button':
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

  const _KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR = (Platform.OS === 'ios')? 'height': '';

  return (
    <KeyboardAvoidingView
      behavior={_KEYBOARD_AVOIDINNG_VIEW_BEHAVIOR}
      style={[
        Styles.MasterContainer,
        attitude.style
      ]}>
        {
          props.children.map((child, i) => {
            var childProps = {...child.props},
                childStyle = [
                  Styles.InnerInputContainer,
                  childProps.style
                ];

            switch (child.props.type.toLowerCase()) {
              case 'tags':
              case 'tag':
              case 'chips':
              case 'chip':
              case 'badges':
              case 'badge':
                childStyle = [
                  Styles.InnerInputContainerForTags,
                  childProps.style
                ];
                break;
            }

            if (i > 0){
              var _BORDER_TOP_WIDTH = 2;

              if ((Platform.OS !== 'ios') && (_SCREEN.width >= 1000 || _SCREEN.height >= 1000)){
                _BORDER_TOP_WIDTH += 1;
              }

              switch (child.props.type.toLowerCase()) {
                case 'tags':
                case 'tag':
                case 'chips':
                case 'chip':
                case 'badges':
                case 'badge':
                  childStyle = [
                    Styles.InnerInputContainerForTags,
                    {
                      borderTopWidth: _BORDER_TOP_WIDTH
                    },
                    childProps.style
                  ];
                  break;

                default:
                  childStyle = [
                    Styles.InnerInputContainer,
                    {
                      borderTopWidth: _BORDER_TOP_WIDTH
                    },
                    childProps.style
                  ];
                  break;
              }
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
    </KeyboardAvoidingView>
  )
}
