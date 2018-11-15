import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { connect } from 'react-redux';

import { Input, InputGroup } from '../../../assets/components/index';
import { Modal } from '../../../assets/layouts/index';
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
        <Modal
          name="camera-roll-picker"
          visible={true}
          backdropBlurType="dark"
          onBlur={() => {
            alert('ok 1')
          }}
          onPress={() => {
            alert('ok 2')
          }}>
          <Text>hello</Text>
        </Modal>

        <Input
          type="PHOTO"
          name="brand-profile-photo"
          value="Brand Photo"
          style={Styles.SingleInput}
          onPress={() => alert('ok')} />
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
