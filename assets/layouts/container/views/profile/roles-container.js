import React, { Component } from 'react';
import { StatusBar, View, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Input } from '../../../../components/index';
import { Pilot, PinnedSide, Icon, RolesModal } from '../../../../layouts/index';
const Styles = Views.Profile.Roles;

import { Functions } from '../../../../modules/index';

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
    attitude.pilotData = props.pilotData || props.pilot_data || props.pilotItems || props.pilot_items
  }

  if ((typeof props.currentPilotItem != 'undefined') || (typeof props.current_pilot_item != 'undefined')){
    attitude.currentPilotItem = props.currentPilotItem || props.current_pilot_item;
  }

  if ((typeof props.onPilotTabItemPress != 'undefined') || (typeof props.pilotTabItemOnPress != 'undefined') || (typeof props.navigationTabItemOnPress != 'undefined') || (typeof props.onNavigationTabItemPress != 'undefined')){
    attitude.onPilotTabItemPress = props.onPilotTabItemPress || props.pilotTabItemOnPress || props.onNavigationTabItemPress || props.navigationTabItemOnPress;
  }

  if ((typeof props.onAddRolePress != 'undefined') || (typeof props.onRightPinnedPress != 'undefined') || (typeof props.onLeftPinnedPress != 'undefined')){
    attitude.onAddRolePress = props.onAddRolePress || props.onRightPinnedPress || props.onLeftPinnedPress;
  }

  if ((typeof props.onRolesAbsorb != 'undefined') || (typeof props.onRolesAppend != 'undefined') || (typeof props.onRolesMerge != 'undefined') || (typeof props.onRolesimbibe != 'undefined') || (typeof props.onAbsorbRoles != 'undefined') || (typeof props.onAppendRoles != 'undefined') || (typeof props.onMergeRoles != 'undefined') || (typeof props.onimbibeRoles != 'undefined')){
    attitude.onRolesAbsorb = props.onRolesAbsorb || props.onRolesAppend || props.onRolesMerge || props.onRolesimbibe || props.onAbsorbRoles || props.onAppendRoles || props.onMergeRoles || props.onimbibeRoles;
  }

  attitude.rolesModalvisibility = props.rolesModalvisibility || props.rolesModalVisible || props.rolesModalIsVisible || false;

  var _CHILDREN_CONTENT;

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

  const _TABS = attitude.pilotData.map((tabItem, i) => {
          const _ROW = tabItem,
                _ROLE = _ROW.role;

          return Functions._convertKeywordToToken(_ROLE || _ROLE.en);
        }),
        _CURRENT_TAB_CONTENT = (typeof attitude.currentPilotItem != 'undefined')? ((typeof attitude.currentPilotItem.role != 'undefined')? attitude.currentPilotItem.role: ''): '',
        _CURRENT_TAB = Functions._convertKeywordToToken(_CURRENT_TAB_CONTENT);

  return (
    <View
      style={Styles.Container}>
        <StatusBar />

        <Pilot
          title={attitude.title}
          {...props}>
            <PinnedSide
              type="left"
              onPress={() => {
                const { navigation } = props;

                navigation.goBack()
              }}>
                <Icon
                  name="arrow left"
                  height={Styles.__Gobal_Icons_In_Pilot.height} />
            </PinnedSide>
            <PinnedSide
              type="right"
              onPress={() => props.onAddRolePress(true)}>
                <Icon
                  name="roles"
                  style={Styles.AddRoleButton}
                  height={Styles.__Gobal_Icons_In_Pilot.height} />
            </PinnedSide>
            <PinnedSide
              type="bottom"
              items={_TABS}
              current={_CURRENT_TAB}
              onPress={attitude.onPilotTabItemPress} />
        </Pilot>

        <RolesModal
          visibility={attitude.rolesModalvisibility}
          data={attitude.pilotData}
          currentRolesItem={attitude.currentPilotItem}
          onBlur={attitude.onAddRolePress}
          onProgressSuccess={attitude.onRolesAbsorb} />

        {_CHILDREN_CONTENT}
    </View>
  );
};
