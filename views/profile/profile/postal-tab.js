import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { Input } from '../../../assets/components/index';
import { Global, Views } from '../../../assets/styles/index';
const Styles = Views.Profile.Profile;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile;

export const PostalTab = (props) => {
  return (
    <ScrollView
      contentContainerStyle={Styles.ScrollableContainer}>
        <Text>
          Profile page. (Postal)
        </Text>
    </ScrollView>
  );
}
