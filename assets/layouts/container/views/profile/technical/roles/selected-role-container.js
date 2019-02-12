import React, { Component } from 'react';
import { StatusBar, View, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../../../styles/index';
import { Input } from '../../../../../../components/index';
import { Pilot, PinnedSide, Icon } from '../../../../../../layouts/index';
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
        </Pilot>

        {_CHILDREN_CONTENT}
    </View>
  );
};
