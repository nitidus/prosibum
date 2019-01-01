import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../../assets/flows/states/types/index';

import { Input, InputGroup, Carousel, Link } from '../../../assets/components/index';
import { CameraRollPickerModal, ActivityIndicator } from '../../../assets/layouts/index';
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

  _componentWillCheckValidation(props) {
    const _PROPS = props.technicalTab,
          _CONNECTED_STATUS = _PROPS.connected.status;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.brandRole != null){
      const _PRIORITY_TOKEN = Preparation._prepareBrandRolePriority(props);

      if (_PRIORITY_TOKEN.current === _PRIORITY_TOKEN.range.min){
        if (_PROPS.brandName != ''){
          _FORM_FIELDS_VALIDITY = true;
        }
      }else{
        _FORM_FIELDS_VALIDITY = true;
      }

      // if (_PRIORITY_TOKEN.current !== _PRIORITY_TOKEN.range.max){
      //
      // }
    }

    return !(_CONNECTED_STATUS && _FORM_FIELDS_VALIDITY);
  }

  render() {
    const { props } = this;
    var _BRAND_ROLE_CAROUSEL_CONTENT, _BRAND_ROLE_SUBSETS_DEPENDED_HANDLER_CONTENT, _BRAND_NAME_DEPENDED_HANDLER_CONTENT;

    const _CURRENT_BRAND_ROLE = props.technicalTab.brandRoles.findIndex((brandRole) => {
      const _BRAND_ROLE = brandRole.role,
            _LOCAL_CURRENT_BRAND_ROLE = props.technicalTab.brandRole.role;

      return (_LOCAL_CURRENT_BRAND_ROLE === _BRAND_ROLE)
    });

    if (props.technicalTab.loadingBrandRole){
      _BRAND_ROLE_CAROUSEL_CONTENT = <Input
        type={__CONSTANTS.firstCarouselContainer.content.self.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.content.self.state.loading.title.en)}
        gradient={Global.colors.pair.aqrulean}
        style={[
          Styles.BrandRoleCarouselContainer,
          { marginHorizontal: Styles.GlobalMeasurements.marginHorizontal }
        ]}
        disable={true}>
          <ActivityIndicator />
        </Input>;
    }else{
      if (!props.technicalTab.connected.status){
        _BRAND_ROLE_CAROUSEL_CONTENT = <Input
          type={__CONSTANTS.firstCarouselContainer.content.self.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.content.self.state.error.title.en)}
          style={[
            Styles.BrandRoleCarouselContainer,
            {
              width: _SCREEN.width - (Styles.GlobalMeasurements.marginHorizontal * 2),
              marginHorizontal: Styles.GlobalMeasurements.marginHorizontal,
              backgroundColor: Global.colors.single.carminePink,
              color: Global.colors.single.romance
            }
          ]}
          onPress={() => props.fetchAvailableBrandRoles(GLOBAL.TARGET)}>
            <Text
              style={Styles.BrandRoleCarouselErrorContent}>
                {`${__CONSTANTS.firstCarouselContainer.content.self.state.error.content.en} ${__CONSTANTS.firstCarouselContainer.title.en}`}
            </Text>
        </Input>;
      }else{
        _BRAND_ROLE_CAROUSEL_CONTENT = <Carousel
          name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.title.en)}
          data={props.technicalTab.brandRoles}
          style={Styles.BrandRoleCarouselContainer}
          itemWidth={_SCREEN.width - (Styles.GlobalMeasurements.marginHorizontal * 2)}
          firstItem={_CURRENT_BRAND_ROLE}
          onLayout={({ item, i }) => {
            var __LOCAL_CURRENT_RAND_ROLE = props.technicalTab.brandRole,
                _INACTIVE_STYLE = {
                  backgroundColor: Global.colors.single.wildSand
                },
                _ITEM_NAME = item.role.toLowerCase(),
                _ITEM_VALUE = Functions._convertKeywordToToken(_ITEM_NAME);

            if (__LOCAL_CURRENT_RAND_ROLE.role === item.role){
              return (
                <Input
                  type={__CONSTANTS.firstCarouselContainer.content.self.type}
                  name={_ITEM_NAME}
                  value={_ITEM_VALUE}
                  gradient={Global.colors.pair.aqrulean}
                  disable={true}/>
              );
            }else{
              return (
                <Input
                  type={__CONSTANTS.firstCarouselContainer.content.self.type}
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

        if (typeof props.technicalTab.brandRoles[_CURRENT_BRAND_ROLE] != 'undefined'){
          const _PRIORITY_TOKEN = Preparation._prepareBrandRolePriority(props);

          if (_PRIORITY_TOKEN.current === _PRIORITY_TOKEN.range.min){
            _BRAND_NAME_DEPENDED_HANDLER_CONTENT = <Input
              type={__CONSTANTS.secondInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.secondInput.title.en)}
              placeholder={__CONSTANTS.secondInput.title.en}
              value={props.technicalTab.brandName}
              style={Styles.SingleInput}
              onChangeText={(currentValue) => props.setBrandName(currentValue)} />;
          }

          if (_PRIORITY_TOKEN.current !== _PRIORITY_TOKEN.range.max){
            _BRAND_ROLE_SUBSETS_DEPENDED_HANDLER_CONTENT = <Link
              containerStyle={Styles.QuickLink}
              value={__CONSTANTS.quickLink.title.en}
              onPress={() => {
                const { navigation } = this.props;

                navigation.navigate('Roles', {
                  currentRole: props.technicalTab.brandRole
                });
              }} />;
          }
        }
      }
    }

    const _VALIDATED = this._componentWillCheckValidation(props);

    var _PHOTO_URI;

    if ((props.technicalTab.brandProfilePhoto != null) && (typeof props.technicalTab.brandProfilePhoto.image != 'undefined')){
      _PHOTO_URI = props.technicalTab.brandProfilePhoto.image.uri;
    }

    return (
      <ScrollView
        contentContainerStyle={Styles.ScrollableContainer}>
          <CameraRollPickerModal
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.tilte.en)}
            visible={props.technicalTab.cameraRollPickerModalVisibility}
            onBlur={(status) => props.setCameraRollPickerModalVisibility(status)}
            onPress={(photo) => props.setBrandProfilePhoto(photo)}/>

          <Input
            type={__CONSTANTS.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.firstInput.title.en)}
            value={__CONSTANTS.firstInput.title.en}
            style={Styles.SingleInput}
            photoURI={_PHOTO_URI}
            onPress={() => props.setCameraRollPickerModalVisibility(true)} />

          {_BRAND_NAME_DEPENDED_HANDLER_CONTENT}

          {_BRAND_ROLE_CAROUSEL_CONTENT}

          <Input
            style={Styles.SubmitInput}
            type={__CONSTANTS.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
            value={__CONSTANTS.submitInput.state.normal.title.en}
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              if (props.technicalTab.brandProfilePhoto != ''){
                Functions._fetchBase64BlobFromPhoto(props.technicalTab.brandProfilePhoto, (photoURI) => {
                  // use photoURI
                  console.log(photoURI)
                });
              }else{

              }
            }}
            forcedDisable={_VALIDATED} />

          {_BRAND_ROLE_SUBSETS_DEPENDED_HANDLER_CONTENT}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicalTab);
