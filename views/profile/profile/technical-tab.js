import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { connect } from 'react-redux';

import { Input } from '../../../assets/components/index';
import { Global, Views } from '../../../assets/styles/index';
const Styles = Views.Profile.Profile;

import { SubViews as SubViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = SubViewsActions.UserProfile.TechnicalTab;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile;

const TechnicalTab = (props) => {
  return (
    <ScrollView
      contentContainerStyle={Styles.ScrollableContainer}>
        <Input
          type="TEXT"
          name="brand-name"
          placeholder="Brand Name"
          value={props.technicalTab.brandName}
          onChangeText={(currentValue) => props.setBrandName(currentValue)} />
    </ScrollView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicalTab);
