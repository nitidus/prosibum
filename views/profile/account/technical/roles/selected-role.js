import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../../../../assets/layouts/index';
import { Input, Carousel, Link } from '../../../../../assets/components/index';
import { Views as ViewsContainer } from '../../../../../assets/layouts/container/index';
const Styles = Views.Profile.Technical.RolesSubsets.SelectedRole,
      Container = ViewsContainer.Profile.Technical.Roles.SelectedRoleContainer,
      _SCREEN = Dimensions.get('window');

import { Views as ViewsActions } from '../../../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.SelectedRole;

import { views_constants } from '../../../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.selected_role;

import { Functions } from '../../../../../assets/modules/index';
const { Preparation } = Functions;

class SelectedRole extends Component<{}> {
  static navigationOptions = {

  };

  _initializeTheSelectedRole(props) {
    var attitude = {};

    if ((typeof props.data != 'undefined') || (typeof props.roleData != 'undefined') || (typeof props.role_data != 'undefined')){
      attitude.data = props.data || props.roleData || props.role_data;
    }else{
      const { navigation } = props,
            _ROUTE_PARAMS = navigation.state.params;

      if (typeof _ROUTE_PARAMS != 'undefined'){
        attitude.data = _ROUTE_PARAMS;
      }
    }

    if (Object.keys(props.selectedRole.selectedReferenceRole).length === 0){
      props.setSelectedReferenceRole(attitude.data);
    }

    this.attitude = attitude;
  }

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language;

    this._language = _LANGUAGE;

    props.resetSelectedRole();
  }

  componentWillReceiveProps(props) {
    this._initializeTheSelectedRole(props);
  }

  async componentWillMount() {
    const { props } = this;

    await this._initializeTheSelectedRole(props);
    await props.fetchAvailableRoles(this.attitude.data.usergroup, this.attitude.data.reference_id);
  }

  render() {
    const { props, attitude } = this,
          _PREPARED_PERSONAL_CONTACT_INFO = Preparation._prepareSelectedRolePersonalContactInformation(attitude.data),
          _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en',
          _CAROUSEL_ITEM_KEYS = _PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL.map((item, i) => {
            return item.key;
          }),
          _ITEM_WIDTH_COEFFICIENT = (_SCREEN.width >= 1000 || _SCREEN.height >= 1000)? 2: ((_PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL.length > 1)? 4: 2),
          containerOtherProps = {
            language: this._language
          };

    var _DETAIL_CAROUSEL_CONTAINER = (
      <Carousel
        name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.title.en)}
        data={_PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL}
        firstItem={_PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL_FIRST_INDEX}
        style={Styles.DetailContainer}
        itemWidth={_SCREEN.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
        onLayout={({ item, i }) => {
          const _ITEM_KEY = item.key,
                _ITEM_VALUE = item.value;

          var _ITEM_CONTENT,
              _ITEM_GRADIENT = Global.colors.pair.chaid;

          switch (_ITEM_KEY) {
            case "PRIMARY":
              var _PROFILE_CONTENT = (
                    <View
                      style={Styles.BriefDetailProfileContainerWithNoPhoto}>
                        <Icon
                          name={__CONSTANTS.content.firstCarousel.state.normal.content.profile.state.noPhoto.icon}
                          color={Global.colors.single.mercury}
                          width={Styles.BriefDetailProfileContainerWithNoPhoto.width - 15} />
                    </View>
                  ),
                  _PREFERED_CONTENT_TEXT = '',
                  _TARGET_USER_ROLE = '',
                  _DID_FETCH_APPROPRIATE_ROLE = Functions._getAppropriateRoleBaseOnLocale(_ITEM_VALUE.role, _LANGUAGE);

                  if (_DID_FETCH_APPROPRIATE_ROLE !== false){
                    _TARGET_USER_ROLE = _DID_FETCH_APPROPRIATE_ROLE;
                  }

              if (typeof _ITEM_VALUE.profile != 'undefined'){
                _PROFILE_CONTENT = (
                  <Image
                    source={{ uri: _ITEM_VALUE.profile }}
                    style={Styles.BriefDetailProfileContainer} />
                );
              }

              if (typeof _ITEM_VALUE.full_name != 'undefined'){
                _PREFERED_CONTENT_TEXT = _ITEM_VALUE.full_name;
                _ITEM_GRADIENT = Global.colors.pair.chaid;
              }else if (typeof _ITEM_VALUE.email != 'undefined') {
                const _FOUNDED_KEY_INDEX = _CAROUSEL_ITEM_KEYS.findIndex((keyItem) => {
                  return keyItem === "PERSONAL_CONTACT_INFO";
                });

                if (_FOUNDED_KEY_INDEX === -1){
                  _PREFERED_CONTENT_TEXT = _ITEM_VALUE.email.content;
                }

                _ITEM_GRADIENT = Global.colors.pair.chaid;
              }

              _ITEM_CONTENT = (
                <View
                  style={Styles.DetailItemContent}>
                    {_PROFILE_CONTENT}

                    <View
                      style={Styles.DetailItemMasterInfoContent}>
                        <Text
                          style={Styles.BriefDetailTitle}>
                            {_TARGET_USER_ROLE}
                        </Text>
                        <Text
                          style={Styles.BriefDetailSubtitle}>
                            {_PREFERED_CONTENT_TEXT}
                        </Text>
                    </View>
                </View>
              );
              break;

            case "PERSONAL_CONTACT_INFO":
              var _PHONE_NUMBER_VALIDATION_STATUS = _EMAIL_VALIDATION_STATUS = (
                <View style={Styles.BriefDetailSubRowIconContainer}>
                  <Icon
                    name={__CONSTANTS.content.firstCarousel.state.normal.content.contact.state.notValidated.icon}
                    height={Styles.BriefDetailSubRowIconContainer.width - 14}
                    gradient={Global.colors.pair.peroly} />
                </View>
              );

              if (_ITEM_VALUE.mobile_phone.validated === true){
                _PHONE_NUMBER_VALIDATION_STATUS = (
                  <View style={Styles.BriefDetailSubRowIconContainer}>
                    <Icon
                      name={__CONSTANTS.content.firstCarousel.state.normal.content.contact.state.validated.icon}
                      width={Styles.BriefDetailSubRowIconContainer.width - 10}
                      gradient={Global.colors.pair.mipple} />
                  </View>
                );
              }

              if (_ITEM_VALUE.email.validated === true){
                _EMAIL_VALIDATION_STATUS = (
                  <View style={Styles.BriefDetailSubRowIconContainer}>
                    <Icon
                      name={__CONSTANTS.content.firstCarousel.state.normal.content.contact.state.validated.icon}
                      width={Styles.BriefDetailSubRowIconContainer.width - 10}
                      gradient={Global.colors.pair.mipple} />
                  </View>
                );
              }

              _ITEM_CONTENT = (
                <View>
                    <View
                      style={[
                        Styles.DetailItemMasterSubInfoContent,
                        {
                          marginBottom: Styles.Content.marginVertical
                        }
                      ]}>
                        {_PHONE_NUMBER_VALIDATION_STATUS}

                        <Text
                          style={Styles.BriefDetailRowText}>
                            {_ITEM_VALUE.mobile_phone.content}
                        </Text>
                    </View>
                    <View
                      style={Styles.DetailItemMasterSubInfoContent}>
                        {_EMAIL_VALIDATION_STATUS}

                        <Text
                          style={Styles.BriefDetailRowText}>
                            {_ITEM_VALUE.email.content}
                        </Text>
                    </View>
                </View>
              );

              _ITEM_GRADIENT = Global.colors.pair.bass;
              break;
          }

          return (
            <Input
              type={__CONSTANTS.content.firstCarousel.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.title.en)}
              gradient={_ITEM_GRADIENT}
              style={[
                Styles.DetailItemContainer,
                Styles.LTR_ContentAlignment
              ]}
              disable={true}>
                {_ITEM_CONTENT}
            </Input>
          )
        }}
        {...__CONSTANTS.content.firstCarousel.state.normal.options} />
    ),
    _SELECTED_ROLE_SUB_ROLES_CONTENT;

    if (props.selectedRole.loadingRoles){
      _SELECTED_ROLE_SUB_ROLES_CONTENT = (
        <View
          style={Styles.Content}>
          <Input
            type={__CONSTANTS.content.scrollViewItem.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.loading.title.en)}
            style={[
              Styles.RoleItemContainer,
              Styles.RoleItemContainerWithEmptyPositionContent
            ]}
            gradient={Global.colors.pair.ongerine}
            disable={true}>
              <ActivityIndicator />
          </Input>
        </View>
      );
    }else{
      if (props.selectedRole.roles.length > 0){
        _SELECTED_ROLE_SUB_ROLES_CONTENT = (
          <ScrollView
            showsVerticalScrollIndicator={true}
            contentContainerStyle={[
              Styles.Content,
              {
                direction: 'ltr'
              }
            ]}>
              {
                props.selectedRole.roles.map((role, i) => {
                  var _SINGLE_ROW_CONTENT,
                      _PERSONAL_CONTENT,
                      _PROFILE_CONTENT = (
                        <View
                          style={[
                            Styles.ProfileContainer,
                            Styles.ProfileContainerWithNoPhoto,
                            Styles.LTR_ProfileContainer
                          ]}>
                          <Icon
                            name={__CONSTANTS.content.scrollViewItem.icon}
                            color={Global.colors.single.mercury}
                            height={Styles.__Global_Icons_In_Role.height}
                            style={Styles.ProfileContentWithNoPhoto} />
                        </View>
                      ),
                      _TARGET_ROLE = '',
                      _DID_FETCH_APPROPRIATE_ROLE = Functions._getAppropriateRoleBaseOnLocale(role.usergroup.role, _LANGUAGE);

                      if (_DID_FETCH_APPROPRIATE_ROLE !== false){
                        _TARGET_ROLE = _DID_FETCH_APPROPRIATE_ROLE;
                      }

                  if (typeof role.user != 'undefined'){
                    if ((typeof role.user.profile != 'undefined') && ((typeof role.user.profile.photo != 'undefined') || (typeof role.user.profile_photo != 'undefined') || (typeof role.user.profilePhoto != 'undefined') || (typeof role.userProfilePhoto != 'undefined') || (typeof role.user_profile_photo != 'undefined') || (typeof role.profile_photo != 'undefined') || (typeof role.profilePhoto != 'undefined') || (typeof role.profile != 'undefined'))){
                      const _PROFILE_PHOTO = role.user.profile.photo || role.user.profile_photo || role.user.profilePhoto || role.userProfilePhoto || role.user_profile_photo || role.profile_photo || role.profilePhoto || role.profile;

                      if (_PROFILE_PHOTO != ''){
                        _PROFILE_CONTENT = (
                          <Image
                            source={{
                              uri: _PROFILE_PHOTO
                            }}
                            style={[
                              Styles.ProfileContainer,
                              Styles.ProfileContainerWithPhoto,
                              Styles.LTR_ProfileContainer
                            ]} />
                        );
                      }
                    }

                    if (typeof role.user.personal != 'undefined'){
                      if ((typeof role.user.personal.first_name != 'undefined') || (typeof role.user.personal.firstName != 'undefined') || (typeof role.user.personal.last_name != 'undefined') || (typeof role.user.personal.lastName != 'undefined')){
                        const _FIRST_NAME = role.user.personal.first_name || role.user.personal.firstName,
                              _LAST_NAME = role.user.personal.last_name || role.user.personal.lastName;

                        if (_FIRST_NAME != '' && _LAST_NAME != ''){
                          _PERSONAL_CONTENT = (
                            <Text
                              style={Styles.RoleTitle}>
                                {Functions._convertKeywordToToken(`${_FIRST_NAME} ${_LAST_NAME}`)}
                            </Text>
                          );
                        }
                      }else{
                        if ((typeof role.user.email != 'undefined') && (typeof role.user.email.content != 'undefined')){
                          const _EMAIL_CONTENT = role.user.email.content;

                          if (_EMAIL_CONTENT != ''){
                            _PERSONAL_CONTENT = (
                              <Text
                                style={Styles.RoleTitle}>
                                  {_EMAIL_CONTENT}
                              </Text>
                            );
                          }
                        }
                      }
                    }else{
                      if ((typeof role.user.email != 'undefined') && (typeof role.user.email.content != 'undefined')){
                        const _EMAIL_CONTENT = role.user.email.content;

                        if (_EMAIL_CONTENT != ''){
                          _PERSONAL_CONTENT = (
                            <Text
                              style={Styles.RoleTitle}>
                                {_EMAIL_CONTENT}
                            </Text>
                          );
                        }
                      }
                    }

                    var _SINGLE_ROW_GRADIENT = Global.colors.pair.aqrulean;

                    if ((typeof props.selectedRole.selectedReferenceRole._id != 'undefined') && (role._id === props.selectedRole.selectedReferenceRole._id)){
                      _SINGLE_ROW_GRADIENT = Global.colors.pair.ongerine;
                    }

                    _SINGLE_ROW_CONTENT = (
                      <Input
                        type={__CONSTANTS.content.scrollViewItem.type}
                        name={Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}
                        style={Styles.RoleItemContainer}
                        gradient={_SINGLE_ROW_GRADIENT}
                        onPress={() => {
                          const _SELECTED_REFERENCE_ROLE = props.selectedRole.selectedReferenceRole;

                          if (Object.keys(_SELECTED_REFERENCE_ROLE).length > 0){
                            if (_SELECTED_REFERENCE_ROLE._id === role._id){
                              props.setSelectedReferenceRole(attitude.data);
                            }else{
                              props.setSelectedReferenceRole(role);
                            }
                          }else{
                            props.setSelectedReferenceRole(role);
                          }
                        }}>
                          <View
                            style={Styles.RoleItemContent}>
                              <View
                                style={Styles.RoleDetailContent}>
                                  {_PROFILE_CONTENT}
                              </View>

                              <View
                                style={Styles.RoleDetailContent}>
                                  {_PERSONAL_CONTENT}

                                  <Text
                                    style={Styles.RoleSubtitle}>
                                      {_TARGET_ROLE}
                                  </Text>
                              </View>
                          </View>
                      </Input>
                    );
                  }else{
                    var _SINGLE_ROW_DEPENDED_OPTIONS = {};

                    if ((typeof props.selectedRole.selectedReferenceRole._id != 'undefined') && (role._id === props.selectedRole.selectedReferenceRole._id)){
                      _SINGLE_ROW_DEPENDED_OPTIONS = {
                        ..._SINGLE_ROW_DEPENDED_OPTIONS,
                        gradient: Global.colors.pair.ongerine
                      };
                    }

                    _SINGLE_ROW_CONTENT = (
                      <Input
                        type={__CONSTANTS.content.scrollViewItem.type}
                        name={Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}
                        key={`${Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}-${i}`}
                        style={[
                          Styles.RoleItemContainer,
                          Styles.RoleItemContainerWithEmptyPositionContent
                        ]}
                        {..._SINGLE_ROW_DEPENDED_OPTIONS}
                        onPress={() => {
                          const _SELECTED_REFERENCE_ROLE = props.selectedRole.selectedReferenceRole;

                          if (Object.keys(_SELECTED_REFERENCE_ROLE).length > 0){
                            if ((typeof _SELECTED_REFERENCE_ROLE._id != 'undefined') && (_SELECTED_REFERENCE_ROLE._id === role._id)){
                              props.setSelectedReferenceRole(this.attitude.data);
                            }else{
                              props.setSelectedReferenceRole(role);
                            }
                          }else{
                            props.setSelectedReferenceRole(role);
                          }
                        }}>
                          <View
                            style={Styles.RoleItemContent}>
                              {_PROFILE_CONTENT}

                              <View
                                style={Styles.RoleDetailContent}>
                                  <Text
                                    style={Styles.RoleTitle}>
                                      {_TARGET_ROLE}
                                  </Text>
                              </View>
                          </View>
                      </Input>
                    );
                  }

                  return _SINGLE_ROW_CONTENT;
                })
              }
          </ScrollView>
        );
      }else {
        _SELECTED_ROLE_SUB_ROLES_CONTENT = (
          <View
            style={[
              Styles.Content,
              Styles.EmptyContent
            ]}>
            <Link
              containerStyle={Styles.EmptyContentLink}
              value={__CONSTANTS.content.link[_LANGUAGE]} />
          </View>
        );
      }
    }

    return (
      <Container
        title={_PREPARED_PERSONAL_CONTACT_INFO.CONTAINER_TITLE}
        referenceRole={props.selectedRole.selectedReferenceRole}
        rolesModalVisibility={props.selectedRole.rolesModalVisibility}
        onAddRolePress={(visibilityStatus) => props.setRolesModalVisibility(visibilityStatus)}
        onRolesAbsorb={async (response) => {
          //We can use response later
          await props.fetchAvailableRoles(this.attitude.data.usergroup, this.attitude.data.reference_id);
        }}
        onBackPress={() => props.resetSelectedRole()}
        {...props}
        {...containerOtherProps}>
          {_DETAIL_CAROUSEL_CONTAINER}

          {_SELECTED_ROLE_SUB_ROLES_CONTENT}
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRole);
