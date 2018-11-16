import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { connect } from 'react-redux';

import { Input, InputGroup } from '../../../assets/components/index';
import { CameraRollPickerModal } from '../../../assets/layouts/index';
import { Global, Views } from '../../../assets/styles/index';
const Styles = Views.Profile.Profile;

import { SubViews as SubViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = SubViewsActions.UserProfile.TechnicalTab;

import { Functions } from '../../../assets/modules/index';

import { layouts_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = layouts_constants.camera_roll_picker_modal;

const TechnicalTab = (props) => {
  return (
    <ScrollView
      contentContainerStyle={Styles.ScrollableContainer}>
        <CameraRollPickerModal
          name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.tilte.en)}
          visible={props.technicalTab.cameraRollPickerModalVisibility}
          onBlur={(status) => props.setCameraRollPickerModalVisibility(status)}
          onPress={() => {
            alert('ok 2')
          }}/>

        <Input
          type="PHOTO"
          name="brand-profile-photo"
          value="Brand Photo"
          style={Styles.SingleInput}
          onPress={() => props.setCameraRollPickerModalVisibility(true)} />
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
