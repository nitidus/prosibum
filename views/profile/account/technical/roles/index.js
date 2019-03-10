import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../../../../assets/flows/states/types/index';

import { Global, Views } from '../../../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../../../../assets/layouts/index';
import { Input, Link } from '../../../../../assets/components/index';
import { Views as ViewsContainer } from '../../../../../assets/layouts/container/index';
const Styles = Views.Profile.Technical.Roles,
      Container = ViewsContainer.Profile.Technical.RolesContainer;

import { Views as ViewsActions } from '../../../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.Roles;

import { views_constants } from '../../../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.roles;

import { Functions } from '../../../../../assets/modules/index';
const { Preparation } = Functions;

class Roles extends Component<{}> {
  static navigationOptions = {

  };

  async _initializeTheSelectedReference(props) {
    if (Object.keys(props.roles.selectedReferenceRole).length === 0){
      const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
            _AUTH = JSON.parse(_SERIALIZED_AUTH);

      props.setSelectedReferenceRole(_AUTH);
    }
  }

  async componentWillReceiveProps(props) {
    await this._initializeTheSelectedReference(props);
  }

  async componentWillMount() {
    const { props } = this,
          { navigation } = props,
          { params } = navigation.state;

    if (props.roles.tabs.length === 0){
      if (typeof params != 'undefined'){
        if ((typeof params.currentRole != 'undefined') || (typeof params.current_role != 'undefined') || (typeof params.brandRole != 'undefined') || (typeof params.brand_ole != 'undefined') || (typeof params.selectedRole != 'undefined') || (typeof params.selected_role != 'undefined')){
          const _CURRENT_ROLE = params.currentRole || params.current_role || params.brandRole || params.brand_ole || params.selectedRole || params.selected_role;

          await props.fetchAvailableRolesType(GLOBAL.TARGET, _CURRENT_ROLE);
        }else{
          await props.fetchAvailableRolesType(GLOBAL.TARGET);
        }
      }else{
        await props.fetchAvailableRolesType(GLOBAL.TARGET);
      }
    }

    await this._initializeTheSelectedReference(props);
  }

  render() {
    const { props } = this;

    if (props.roles.loadingRolesType){
      return (
        <View
          style={Styles.Container}>
            <ActivityIndicator />
        </View>
      );
    }else{
      if (!props.roles.connected.status){
        const _TOP_PINNED_TOAST = (
          <Toast
            message={props.roles.connected.content}
            launched={!props.roles.connected.status}
            color={Global.colors.single.carminePink}
            onPress={() => props.fetchAvailableRolesType(GLOBAL.TARGET)} />
        );

        return (
          <View
            style={Styles.Container}>
              {_TOP_PINNED_TOAST}
          </View>
        );
      }else{
        const __TABS = props.roles.tabs.map((tabItem, i) => {
                const _ROW = tabItem,
                      _ROLE = _ROW.role;

                return Functions._convertKeywordToToken(_ROLE || _ROLE.en);
              }),
              _CURRENT_TAB_CONTENT = (typeof props.roles.currentTab.role != 'undefined')? props.roles.currentTab.role: '',
              _CURRENT_TAB = Functions._convertKeywordToToken(_CURRENT_TAB_CONTENT);

        var _TAB_CONTENT;

        if (props.roles.loadingRoles){
          _TAB_CONTENT = (
            <View
              style={Styles.Content}>
              <Input
                type={__CONSTANTS.content.scrollViewItem.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.loading.title.en)}
                style={[
                  Styles.RoleItemContainer,
                  Styles.RoleItemContainerWithEmptyPositionContent
                ]}
                disable={true}>
                  <ActivityIndicator />
              </Input>
            </View>
          );
        }else{
          if (props.roles.roles.length > 0){
            _TAB_CONTENT = (
              <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={Styles.Content}>
                  {
                    props.roles.roles.map((role, i) => {
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
                          );

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

                        if ((typeof props.roles.selectedReferenceRole._id != 'undefined') && (role._id === props.roles.selectedReferenceRole._id)){
                          _SINGLE_ROW_GRADIENT = Global.colors.pair.ongerine;
                        }

                        _SINGLE_ROW_CONTENT = (
                          <Input
                            type={__CONSTANTS.content.scrollViewItem.type}
                            name={Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}
                            style={Styles.RoleItemContainer}
                            gradient={_SINGLE_ROW_GRADIENT}
                            onPress={() => {
                              const { props } = this,
                                    { navigation } = props;

                              navigation.navigate('SelectedRole', role);
                            }}
                            onLongPress={async () => {
                              const _SELECTED_REFERENCE_ROLE = props.roles.selectedReferenceRole;

                              if (Object.keys(_SELECTED_REFERENCE_ROLE).length > 0){
                                if ((typeof _SELECTED_REFERENCE_ROLE._id != 'undefined') && (_SELECTED_REFERENCE_ROLE._id === role._id)){
                                  const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
                                        _AUTH = JSON.parse(_SERIALIZED_AUTH);

                                  props.setSelectedReferenceRole(_AUTH);
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
                                          {Functions._convertKeywordToToken(role.usergroup.role)}
                                      </Text>
                                  </View>
                              </View>
                          </Input>
                        );
                      }else{
                        var _SINGLE_ROW_DEPENDED_OPTIONS = {};

                        if ((typeof props.roles.selectedReferenceRole._id != 'undefined') && (role._id === props.roles.selectedReferenceRole._id)){
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
                              const { props } = this,
                                    { navigation } = props;

                              navigation.navigate('SelectedRole', role);
                            }}
                            onLongPress={async () => {
                              const _SELECTED_REFERENCE_ROLE = props.roles.selectedReferenceRole;

                              if (Object.keys(_SELECTED_REFERENCE_ROLE).length > 0){
                                if ((typeof _SELECTED_REFERENCE_ROLE._id != 'undefined') && (_SELECTED_REFERENCE_ROLE._id === role._id)){
                                  const _SERIALIZED_AUTH = await Functions._retrieveDataWithKey(GLOBAL.STORAGE.AUTH),
                                        _AUTH = JSON.parse(_SERIALIZED_AUTH);

                                  props.setSelectedReferenceRole(_AUTH);
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
                                          {Functions._convertKeywordToToken(role.usergroup.role)}
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
            _TAB_CONTENT = (
              <View
                style={[
                  Styles.Content,
                  Styles.EmptyContent
                ]}>
                <Link
                  containerStyle={Styles.EmptyContentLink}
                  value={__CONSTANTS.content.link.en} />
              </View>
            );
          }
        }

        return (
          <Container
            title={__CONSTANTS.pilot.title.en}
            pilotItems={props.roles.tabs}
            currentPilotItem={props.roles.currentTab}
            onPilotTabItemPress={async (item) => {
              const _SELECTED_ITEM_INDEX = __TABS.indexOf(item);

              props.setPilotCurrentTab(props.roles.tabs[_SELECTED_ITEM_INDEX]);

              await props.fetchAvailableRoles(props.roles.tabs[_SELECTED_ITEM_INDEX]);
            }}
            onAddRolePress={(visibilityStatus) => props.setRolesModalVisibility(visibilityStatus)}
            rolesModalVisibility={props.roles.rolesModalVisibility}
            referenceRole={props.roles.selectedReferenceRole}
            onRolesAbsorb={async (response) => {
              //We can use response later
              if (Object.keys(props.roles.selectedReferenceRole).length > 0){
                await props.fetchAvailableRoles(props.roles.selectedReferenceRole.usergroup, props.roles.selectedReferenceRole.reference_id);
              }
            }}
            {...props}>
              {_TAB_CONTENT}
          </Container>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
