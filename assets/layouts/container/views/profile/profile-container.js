import React, { Component } from 'react';
import { StatusBar, View, Text, Animated, Easing } from 'react-native';

import { Global, Views } from '../../../../styles/index';
import { Input } from '../../../../components/index';
import { Navigation, PinnedSide, Icon } from '../../../../layouts/index';
const Styles = Views.Profile.Dashboard;

import { Functions } from '../../../../modules/index';

export const ProfileContainer = (props) => {
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

  return (
    <View
      style={Styles.MajorContent}>
        <StatusBar />

        <Navigation
          title={attitude.title}
          {...props}>
            <PinnedSide
              type="left"
              onPress={() => {
                const { navigation } = props;

                navigation.goBack()
              }}>
                <Icon
                  name="arrow left" />
            </PinnedSide>
            <PinnedSide
              type="right"
              onPress={() => alert('ok 2')}>
                <Icon
                  name="for-you" />
            </PinnedSide>
            <PinnedSide
              type="bottom"
              items={["Technical", "Pesonal", "Histories", "Certifications", "Postal"]}
              current="Technical" />
        </Navigation>

        {
          attitude.children.map((child, i) => {
            var childProps = {...child.props};

            const ultimateKey = Functions._generateNewUniqueObjectKey();

            childProps.key = childProps.name || ultimateKey;

            return React.cloneElement(child, childProps);
          })
        }
    </View>
  );
};
