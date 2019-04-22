import React, { Component } from 'react';

import { View, Text, Image, Animated, Easing } from 'react-native';

import { Global, Modules } from '../styles/index';
import { Link } from '../components/index';
import { Icon } from '../layouts/icon';
const Styles = Modules.Layouts.DrawerMenu;

import { Functions } from '../modules/index';
const { Preparation } = Functions;

import { layouts_constants } from '../flows/knowledge/index';
const __CONSTANTS = layouts_constants.drawer_menu;

export const DrawerMenuPinnedProfile = (props) => {
  var attitude = {};

  if ((typeof props.src != 'undefined') || (typeof props.source != 'undefined') || (typeof props.url != 'undefined') || (typeof props.uri != 'undefined')){
    attitude.src = props.src || props.source || props.url || props.uri;
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

  if ((typeof props.onPress != 'undefined') || (typeof props.onProfilePress != 'undefined') || (typeof props.profileOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onProfilePress || props.profileOnPress;
  }

  var _CONTENT;

  if (typeof attitude.src != 'undefined' && attitude.src != ''){
    _CONTENT = <Image
      style={Styles.PinnedProfileContainer}
      source={{
        uri: attitude.src
      }} />;
  }else{
    _CONTENT = <View
      style={[
        Styles.PinnedProfileContainer,
        Styles.NoImagePinnedProfileContainer
      ]}>
        <Icon
          name={__CONSTANTS.profile.state.empty.icon.name}
          color={Global.colors.single.mercury}
          width={Styles.PinnedProfileContainer.width - 15}
          height={Styles.PinnedProfileContainer.height - 15} />
    </View>;
  }

  return (
    <Link
      style={[
        Styles.PinnedProfileMajorContainer,
        attitude.style
      ]}
      onPress={attitude.onPress}>
        {_CONTENT}
    </Link>
  )
}

export const DrawerMenuPinnedItem = (props) => {
  var attitude = {};

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined') || (typeof props.value != 'undefined')){
    attitude.name = props.name || props.title || props.value;
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

  if ((typeof props.onPress != 'undefined') || (typeof props.onItemPress != 'undefined') || (typeof props.itemOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onItemPress || props.itemOnPress;
  }

  return (
    <Link
      style={[
        Styles.PinnedItem,
        attitude.style
      ]}
      value={attitude.name}
      onPress={attitude.onPress} />
  )
}

export const DrawerMenuItem = (props) => {
  var attitude = {};

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined') || (typeof props.value != 'undefined')){
    attitude.name = props.name || props.title || props.value;
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

  if ((typeof props.onPress != 'undefined') || (typeof props.onItemPress != 'undefined') || (typeof props.itemOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onItemPress || props.itemOnPress;
  }

  return (
    <Link
      style={[
        Styles.SingleItemContent,
        attitude.style
      ]}
      value={attitude.name}
      onPress={attitude.onPress} />
  )
}

export const DrawerMenu = (props) => {
  var attitude = {};

  if ((typeof props.onDismiss != 'undefined') || (typeof props.onDrawerMenuDismiss != 'undefined') || (typeof props.drawerMenuOnDismiss != 'undefined') || (typeof props.onMenuDismiss != 'undefined') || (typeof props.menuOnDismiss != 'undefined')){
    attitude.onDismiss = props.onDismiss || props.onDrawerMenuDismiss || props.drawerMenuOnDismiss || props.onMenuDismiss || props.menuOnDismiss;
  }

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  return (
    <View
      style={Styles.Container}>
        <DrawerMenuPinnedProfile
          src="https://bit.ly/2LJj1V2"
          onPress={() => {
            const { navigation } = props;

            navigation.navigate('Profile');
          }}
          {...props} />

        <View style={Styles.MenuItemsContainer}>
          <DrawerMenuItem
            name={__CONSTANTS.topPinnedContent.firstRow.title[attitude.language]}
            onPress={() => alert('ok 1')}
            {...props} />
          <DrawerMenuItem
            name={__CONSTANTS.topPinnedContent.secondRow.title[attitude.language]}
            onPress={() => {
              const { navigation } = props;

              setTimeout(() => {
                attitude.onDismiss();
              }, 1000);

              navigation.navigate('Profile');
            }}
            {...props} />
          <DrawerMenuItem
            name={__CONSTANTS.topPinnedContent.thirdRow.title[attitude.language]}
            onPress={() => alert('ok 3')}
            {...props} />
          <DrawerMenuItem
            name={__CONSTANTS.topPinnedContent.fourthRow.title[attitude.language]}
            onPress={() => Preparation._prepareLogout(props)}
            {...props} />
        </View>

        <View
          style={Styles.PinnedItemsContainer}>
            <View
              style={Styles.PinnedItemGroup}>
                <DrawerMenuPinnedItem
                  name={__CONSTANTS.bottomPinnedContent.firstColumn.title[attitude.language]}
                  onPress={() => alert('ok 4')}
                  {...props} />
                <DrawerMenuPinnedItem
                  name={__CONSTANTS.bottomPinnedContent.secondColumn.title[attitude.language]}
                  onPress={() => alert('ok 5')}
                  {...props} />
            </View>
        </View>
    </View>
  )
}
