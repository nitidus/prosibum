import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions, Keyboard } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../../assets/flows/states/types/index';

import { Input, InputGroup, Carousel, Link } from '../../../assets/components/index';
import { CameraRollPickerModal, ActivityIndicator } from '../../../assets/layouts/index';
import { Global, Views } from '../../../assets/styles/index';
const Styles = Views.Profile.Self;

import { SubViews as SubViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = SubViewsActions.UserProfile.TechnicalTab;

import { Functions } from '../../../assets/modules/index';
const { Preparation } = Functions,
      _SCREEN = Dimensions.get('window');

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile_sub_views.technical_tab;

class TechnicalTab extends Component<{}> {
  async componentDidMount() {
    await Preparation._prepareTechnicalTabInProfile(this);
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.technicalTab,
          _CONNECTED_STATUS = _PROPS.connected.status;

    var _FORM_FIELDS_VALIDITY = false;

    if (_PROPS.brandRole != null){
      const _PRIORITY_TOKEN = Preparation._prepareBrandRolePriority(props);

      if (_PRIORITY_TOKEN.current === _PRIORITY_TOKEN.range.min){
        _FORM_FIELDS_VALIDITY = true;
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

    const _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en',
          _CURRENT_BRAND_ROLE = props.technicalTab.brandRoles.findIndex((brandRole) => {
            const _BRAND_ROLE = brandRole.role,
                  _LOCAL_CURRENT_BRAND_ROLE = props.technicalTab.brandRole.role;

            return (_LOCAL_CURRENT_BRAND_ROLE === _BRAND_ROLE)
          }),
          _CAMERA_ROLL_OTHER_PROPS = {
            language: this._language
          };

    if (props.technicalTab.loadingBrandRole){
      _BRAND_ROLE_CAROUSEL_CONTENT = <Input
        type={__CONSTANTS.firstCarouselContainer.content.self.type}
        name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.content.self.state.loading.title.en)}
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
                {`${__CONSTANTS.firstCarouselContainer.content.self.state.error.content[_LANGUAGE]} ${__CONSTANTS.firstCarouselContainer.title[_LANGUAGE]}`}
            </Text>
        </Input>;
      }else{
        if (typeof props.technicalTab.brandRole.role != 'undefined'){
          var _BRAND_ROLE = '',
              _DID_FETCH_APPROPRIATE_ROLE = Functions._getAppropriateRoleBaseOnLocale(props.technicalTab.brandRole.role, _LANGUAGE);

          if (_DID_FETCH_APPROPRIATE_ROLE !== false){
            _BRAND_ROLE = _DID_FETCH_APPROPRIATE_ROLE;
          }

          _BRAND_ROLE_CAROUSEL_CONTENT = <Input
            type={__CONSTANTS.firstCarouselContainer.content.self.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.firstCarouselContainer.content.self.state.loading.title.en)}
            gradient={Global.colors.pair.aqrulean}
            value={_BRAND_ROLE}
            style={[
              Styles.BrandRoleCarouselContainer,
              {
                width: _SCREEN.width - (Styles.GlobalMeasurements.marginHorizontal * 2),
                marginHorizontal: Styles.GlobalMeasurements.marginHorizontal
              }
            ]}
            disable={true} />;

          if (typeof props.technicalTab.brandRoles[_CURRENT_BRAND_ROLE] != 'undefined'){
            const _PRIORITY_TOKEN = Preparation._prepareBrandRolePriority(props);

            if (_PRIORITY_TOKEN.current === _PRIORITY_TOKEN.range.min){
              _BRAND_NAME_DEPENDED_HANDLER_CONTENT = <Input
                type={__CONSTANTS.secondInput.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.secondInput.title.en)}
                placeholder={__CONSTANTS.secondInput.title[_LANGUAGE]}
                value={props.technicalTab.brandName}
                style={Styles.SingleInput}
                onChangeText={(currentValue) => props.setBrandName(currentValue)}
                disable={true} />;
            }

            if (_PRIORITY_TOKEN.current !== _PRIORITY_TOKEN.range.max){
              _BRAND_ROLE_SUBSETS_DEPENDED_HANDLER_CONTENT = <Link
                containerStyle={Styles.QuickLink}
                value={__CONSTANTS.quickLink.title[_LANGUAGE]}
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
    }

    const _VALIDATED = this._componentWillCheckValidation(props);

    var _PHOTO_URI;

    if (typeof props.technicalTab.brandProfilePhoto == 'object'){
      if ((Object.keys(props.technicalTab.brandProfilePhoto).length > 0) && (typeof props.technicalTab.brandProfilePhoto.image != 'undefined')){
        _PHOTO_URI = props.technicalTab.brandProfilePhoto.image.uri;
      }
    }else if (typeof props.technicalTab.brandProfilePhoto == 'string'){
      _PHOTO_URI = props.technicalTab.brandProfilePhoto;
    }

    return (
      <ScrollView
        contentContainerStyle={Styles.ScrollableContainer}>
          <CameraRollPickerModal
            name={Functions._convertTokenToKeyword(__CONSTANTS.modalContainer.title.en)}
            modalTitle={__CONSTANTS.firstInput.title[_LANGUAGE]}
            visible={props.technicalTab.cameraRollPickerModalVisibility}
            onBlur={(status) => props.setCameraRollPickerModalVisibility(status)}
            onPress={(photo) => props.setBrandProfilePhoto(photo)}
            {..._CAMERA_ROLL_OTHER_PROPS} />

          <Input
            type={__CONSTANTS.firstInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.firstInput.title.en)}
            value={__CONSTANTS.firstInput.title[_LANGUAGE]}
            style={Styles.SingleInput}
            photoURI={_PHOTO_URI}
            onPress={() => {
              Keyboard.dismiss();
              props.setCameraRollPickerModalVisibility(true);
            }}
            {..._CAMERA_ROLL_OTHER_PROPS} />

          {_BRAND_NAME_DEPENDED_HANDLER_CONTENT}

          {_BRAND_ROLE_CAROUSEL_CONTENT}

          <Input
            style={Styles.SubmitInput}
            type={__CONSTANTS.submitInput.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.submitInput.state.normal.title.en)}
            value={__CONSTANTS.submitInput.state.normal.title[_LANGUAGE]}
            gradient={Global.colors.pair.ongerine}
            onPress={async () => {
              const _PROPS = props.technicalTab,
                    _PRIORITY_TOKEN = Preparation._prepareBrandRolePriority(props),
                    _AUTH = await Preparation._prepareAuthDetails();

              if (_AUTH !== null){
                var _SEED = {
                  _id: _AUTH._id
                };

                if (_AUTH.brand_role._id !== _PROPS.brandRole._id){
                  _SEED.user_group_id = _PROPS.brandRole._id;
                }

                if (_PRIORITY_TOKEN.current === _PRIORITY_TOKEN.range.min){
                  if ((_AUTH.brand_name !== _PROPS.brandName) && (_PROPS.brandName != '')){
                    if (typeof _SEED.brand != 'undefined'){
                      _SEED.brand.name = _PROPS.brandName;
                    }else{
                      _SEED.brand = {
                        name: _PROPS.brandName
                      };
                    }
                  }
                }

                // if (_PRIORITY_TOKEN.current !== _PRIORITY_TOKEN.range.max){
                //
                // }

                if (Object.keys(props.technicalTab.brandProfilePhoto).length > 0){
                  const _PHOTO_URI = await Functions._fetchBase64BlobFromPhoto(props.technicalTab.brandProfilePhoto);

                  if (_AUTH.brand_profile_photo !== _PHOTO_URI){
                    if (typeof _SEED.brand != 'undefined'){
                      _SEED.brand.photo = _PHOTO_URI;
                    }else{
                      _SEED.brand = {
                        photo: _PHOTO_URI
                      };
                    }
                  }

                  await props.editUserTechnicalData(_SEED);
                }else{
                  await props.editUserTechnicalData(_SEED);
                }
              }
            }}
            forcedDisable={_VALIDATED} />

          {_BRAND_ROLE_SUBSETS_DEPENDED_HANDLER_CONTENT}
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TechnicalTab);
