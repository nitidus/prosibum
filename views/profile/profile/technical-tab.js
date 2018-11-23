import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import { Input, InputGroup, Carousel } from '../../../assets/components/index';
import { CameraRollPickerModal, ActivityIndicator, Toast } from '../../../assets/layouts/index';
import { Global, Views } from '../../../assets/styles/index';
const Styles = Views.Profile.Profile;

import { SubViews as SubViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = SubViewsActions.UserProfile.TechnicalTab;

import { Functions } from '../../../assets/modules/index';
const { Preparation } = Functions;
const _SCREEN = Dimensions.get('window');

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile_sub_views.technical_tab;

class TechnicalTab extends Component<{}> {
  componentDidMount() {
    Preparation._prepareTechnicalTabInProfile(this);
  }

  render() {
    const { props } = this;
    var _CAROUSEL_CONTENT, _TOP_PINNED_TOAST;

    const _CURRENT_BRAND_ROLE = props.technicalTab.brandRoles.findIndex((brandRole) => {
      const _BRAND_ROLE = brandRole.role,
            _CURRENT_BRAND_ROLE = props.technicalTab.brandRole.role;

      return (_CURRENT_BRAND_ROLE === _BRAND_ROLE)
    });

    if (props.technicalTab.loadingBrandRole){
      _CAROUSEL_CONTENT = <Input
        type="BUTTON"
        name="somthing-loading"
        gradient={Global.colors.pair.ongerine}
        style={[
          Styles.BrandRoleCarouselContainer,
          { marginHorizontal: Styles.GlobalMeasurements.marginHorizontal }
        ]}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (!props.technicalTab.connected.status){
        _TOP_PINNED_TOAST = <Toast
          message={props.technicalTab.connected.content}
          launched={!props.technicalTab.connected.status}
          color={Global.colors.single.carminePink}
          onPress={() => props.fetchAvailableBrandRoles('Wholesaler')} />;
      }

      _CAROUSEL_CONTENT = <Carousel
        name="hello"
        data={props.technicalTab.brandRoles}
        style={Styles.BrandRoleCarouselContainer}
        itemWidth={_SCREEN.width - (Styles.GlobalMeasurements.marginHorizontal * 2)}
        firstItem={_CURRENT_BRAND_ROLE}
        onLayout={({ item, i }) => {
          var _CURRENT_USER_GROUP = props.technicalTab.brandRole,
              _INACTIVE_STYLE = {
                backgroundColor: Global.colors.single.wildSand
              },
              _ITEM_NAME = item.role.toLowerCase(),
              _ITEM_VALUE = Functions._convertKeywordToToken(_ITEM_NAME);

          if (_CURRENT_USER_GROUP.role === item.role){
            return (
              <Input
                type="BUTTON"
                name={_ITEM_NAME}
                value={_ITEM_VALUE}
                gradient={Global.colors.pair.ongerine}
                disable={true}/>
            );
          }else{
            return (
              <Input
                type="BUTTON"
                name={_ITEM_NAME}
                value={_ITEM_VALUE}
                style={_INACTIVE_STYLE}
                disable={true}/>
            );
          }
        }}
        onSnap={(selectedItemIndex) => {
          props.setBrandRole(props.technicalTab.brandRoles[selectedItemIndex]);
        }}/>;
    }

    return (
      <ScrollView
        contentContainerStyle={Styles.ScrollableContainer}>
          <CameraRollPickerModal
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.tilte.en)}
            visible={props.technicalTab.cameraRollPickerModalVisibility}
            onBlur={(status) => props.setCameraRollPickerModalVisibility(status)}
            onPress={(photoURI) => props.setBrandProfilePhoto(photoURI)}/>

          <Input
            type={__CONSTANTS.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.firstInput.title.en)}
            value={__CONSTANTS.firstInput.title.en}
            style={Styles.SingleInput}
            photoURI={props.technicalTab.brandProfilePhoto}
            onPress={() => props.setCameraRollPickerModalVisibility(true)} />
          <Input
            type={__CONSTANTS.secondInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.secondInput.title.en)}
            placeholder={__CONSTANTS.secondInput.title.en}
            value={props.technicalTab.brandName}
            style={Styles.SingleInput}
            onChangeText={(currentValue) => props.setBrandName(currentValue)} />

          {_CAROUSEL_CONTENT}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicalTab);
