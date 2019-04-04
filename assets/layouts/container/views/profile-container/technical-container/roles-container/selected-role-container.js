import React, { Component } from 'react';
import { StatusBar, View, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../../../styles/index';
import { Input } from '../../../../../../components/index';
import { Pilot, PinnedSide, Icon, RoleModal } from '../../../../../../layouts/index';
const Styles = Views.Profile.Technical.RolesSubsets.SelectedRole;

import { Functions } from '../../../../../../modules/index';

export const SelectedRoleContainer = (props) => {
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

  attitude.referenceRole = props.referenceRole || props.reference || props.role || {};

  attitude.rolesModalVisibility = props.rolesModalVisibility || props.rolesModalVisible || props.rolesModalIsVisible || false;

  if ((typeof props.onAddRolePress != 'undefined') || (typeof props.onRightPinnedPress != 'undefined') || (typeof props.onLeftPinnedPress != 'undefined')){
    attitude.onAddRolePress = props.onAddRolePress || props.onRightPinnedPress || props.onLeftPinnedPress;
  }

  if ((typeof props.onRolesAbsorb != 'undefined') || (typeof props.onRolesAppend != 'undefined') || (typeof props.onRolesMerge != 'undefined') || (typeof props.onRolesImbibe != 'undefined') || (typeof props.onAbsorbRoles != 'undefined') || (typeof props.onAppendRoles != 'undefined') || (typeof props.onMergeRoles != 'undefined') || (typeof props.onImbibeRoles != 'undefined')){
    attitude.onRolesAbsorb = props.onRolesAbsorb || props.onRolesAppend || props.onRolesMerge || props.onRolesImbibe || props.onAbsorbRoles || props.onAppendRoles || props.onMergeRoles || props.onImbibeRoles;
  }

  if ((typeof props.onBackPress != 'undefined') || (typeof props.onPressBack != 'undefined') || (typeof props.backOnPress != 'undefined')){
    attitude.onBackPress = props.onBackPress || props.onPressBack || props.backOnPress;
  }

  var _CHILDREN_CONTENT, _DEPENDED_RIGHT_PINNED_SIDE;

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

  if (Object.keys(attitude.referenceRole).length > 0){
    _DEPENDED_RIGHT_PINNED_SIDE = (
      <PinnedSide
        type="right"
        onPress={() => attitude.onAddRolePress(true)}>
          <Icon
            name="plus"
            style={Styles.AddRoleButton}
            height={Styles.__Gobal_Icons_In_Pilot.height} />
      </PinnedSide>
    );
  }

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

                navigation.goBack();
                attitude.onBackPress();
              }}>
                <Icon
                  name="arrow left"
                  width={Styles.__Gobal_Icons_In_Pilot.width} />
            </PinnedSide>

            {_DEPENDED_RIGHT_PINNED_SIDE}
        </Pilot>

        <RoleModal
          reference={attitude.referenceRole}
          visibility={attitude.rolesModalVisibility}
          onBlur={attitude.onAddRolePress}
          onProgressSuccess={attitude.onRolesAbsorb} />

        {_CHILDREN_CONTENT}
    </View>
  );
};
