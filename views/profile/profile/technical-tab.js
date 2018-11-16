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

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile_sub_views.technical_tab;

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
          type={__CONSTANTS.firstInput.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.firstInput.title.en)}
          value={__CONSTANTS.firstInput.title.en}
          style={Styles.SingleInput}
          onPress={() => props.setCameraRollPickerModalVisibility(true)} />
        <Input
          type={__CONSTANTS.secondInput.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.secondInput.title.en)}
          placeholder={__CONSTANTS.secondInput.title.en}
          value={props.technicalTab.brandName}
          onChangeText={(currentValue) => props.setBrandName(currentValue)} />
    </ScrollView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicalTab);
