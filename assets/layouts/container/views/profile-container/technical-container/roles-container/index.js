import React, { Component } from 'react';
import { StatusBar, View, Text, I18nManager, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../../../styles/index';
import { Input } from '../../../../../../components/index';
import { Pilot, PinnedSide, Icon, RoleModal } from '../../../../../../layouts/index';
const Styles = Views.Profile.Technical.Roles;

import { GLOBAL } from '../../../../../../../assets/flows/states/types/index';
import { Functions } from '../../../../../../modules/index';

export const RolesContainer = (props) => {
  var attitude = {};

  attitude.title = props.title || props.name;

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if ((typeof props.pilotData != 'undefined') || (typeof props.pilot_data != 'undefined') || (typeof props.pilotItems != 'undefined') || (typeof props.pilot_items != 'undefined')){
    attitude.pilotData = props.pilotData || props.pilot_data || props.pilotItems || props.pilot_items;
  }

  if ((typeof props.currentPilotItem != 'undefined') || (typeof props.current_pilot_item != 'undefined')){
    attitude.currentPilotItem = props.currentPilotItem || props.current_pilot_item;
  }

  if ((typeof props.onPilotTabItemPress != 'undefined') || (typeof props.pilotTabItemOnPress != 'undefined') || (typeof props.navigationTabItemOnPress != 'undefined') || (typeof props.onNavigationTabItemPress != 'undefined')){
    attitude.onPilotTabItemPress = props.onPilotTabItemPress || props.pilotTabItemOnPress || props.onNavigationTabItemPress || props.navigationTabItemOnPress;
  }

  attitude.referenceRole = props.referenceRole || props.reference || props.role || {};

  attitude.rolesModalVisibility = props.rolesModalVisibility || props.rolesModalVisible || props.rolesModalIsVisible || false;

  if ((typeof props.onAddRolePress != 'undefined') || (typeof props.onRightPinnedPress != 'undefined') || (typeof props.onLeftPinnedPress != 'undefined')){
    attitude.onAddRolePress = props.onAddRolePress || props.onRightPinnedPress || props.onLeftPinnedPress;
  }

  if ((typeof props.onRolesAbsorb != 'undefined') || (typeof props.onRolesAppend != 'undefined') || (typeof props.onRolesMerge != 'undefined') || (typeof props.onRolesImbibe != 'undefined') || (typeof props.onAbsorbRoles != 'undefined') || (typeof props.onAppendRoles != 'undefined') || (typeof props.onMergeRoles != 'undefined') || (typeof props.onImbibeRoles != 'undefined')){
    attitude.onRolesAbsorb = props.onRolesAbsorb || props.onRolesAppend || props.onRolesMerge || props.onRolesImbibe || props.onAbsorbRoles || props.onAppendRoles || props.onMergeRoles || props.onImbibeRoles;
  }

  attitude.language = (typeof props.language != 'undefined')? Functions._convertTokenToKeyword(props.language.key): 'en';

  var _CHILDREN_CONTENT, _DEPENDED_RIGHT_PINNED_SIDE, _BOTTOM_PINNED_ITEMS,
      roleModalOtherProps = {
        language: props.language
      };

  if (typeof attitude.children != 'undefined'){
    if (attitude.children.length > 0){
      _CHILDREN_CONTENT = attitude.children.map((child, i) => {
        var childProps = {...child.props};

        const ultimateKey = Functions._generateNewUniqueObjectKey();

        childProps.key = childProps.name || ultimateKey;

        return React.cloneElement(child, childProps);
      });
    }
  }

  const _TABS = (typeof attitude.pilotData != 'undefined')? attitude.pilotData.map((tabItem, i) => {
          const _ROW = tabItem,
                _ROLE = _ROW.role;

          return _ROLE;
        }): [],
        _CURRENT_ROLE = attitude.currentPilotItem.role,
        _CURRENT_TAB = (typeof _CURRENT_ROLE != 'undefined')? ((Object.keys(_CURRENT_ROLE).length > 0)? _CURRENT_ROLE: ''): '';

  if ((_TABS.length > 0) && (_CURRENT_TAB !== '')){
    _BOTTOM_PINNED_ITEMS = (
      <PinnedSide
        type="bottom"
        items={attitude.pilotData}
        current={attitude.currentPilotItem}
        shownItems={_TABS}
        shownCurrent={_CURRENT_TAB}
        onPress={attitude.onPilotTabItemPress}
        language={attitude.language} />
    );
  }

  return (
    <View
      style={Styles.Container}>
        <StatusBar
          backgroundColor={Global.colors.single.romance}
          barStyle="dark-content"/>

        <Pilot
          title={attitude.title}
          {...props}>
            <PinnedSide
              type="left"
              onPress={() => {
                const { navigation } = props;

                navigation.navigate('Overseer');
              }}>
                <Icon
                  name={`arrow ${(I18nManager.isRTL)? 'right': 'left'}`}
                  width={Styles.__Gobal_Icons_In_Pilot.width} />
            </PinnedSide>

            <PinnedSide
              type="right"
              onPress={() => attitude.onAddRolePress(true)}>
                <Icon
                  name="plus"
                  style={Styles.AddRoleButton}
                  height={Styles.__Gobal_Icons_In_Pilot.height} />
            </PinnedSide>

            {_BOTTOM_PINNED_ITEMS}
        </Pilot>

        <RoleModal
          reference={attitude.referenceRole}
          visibility={attitude.rolesModalVisibility}
          onBlur={attitude.onAddRolePress}
          onProgressSuccess={attitude.onRolesAbsorb}
          {...roleModalOtherProps} />

        {_CHILDREN_CONTENT}
    </View>
  );
};
