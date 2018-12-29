import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';

import { connect } from 'react-redux';

import { GLOBAL } from '../../../assets/flows/states/types/index';

import { Global, Views } from '../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../../assets/layouts/index';
import { Input } from '../../../assets/components/index';
import { Views as ViewsContainer } from '../../../assets/layouts/container/index';
const Styles = Views.Profile.Roles,
      Container = ViewsContainer.Profile.RolesContainer;

import { PersonalTab, TechnicalTab, CertificationTab, HistoryTab, PostalTab } from '../profile/tabs';

import { Views as ViewsActions } from '../../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.Roles;

import { views_constants } from '../../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.roles;

import { Functions } from '../../../assets/modules/index';

class Roles extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this;

    await props.fetchAvailableRolesType(GLOBAL.TARGET);
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

        if ((props.roles.loadingRoles) || (props.roles.roles.length === 0)){
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
          _TAB_CONTENT = (
            <ScrollView
              showsVerticalScrollIndicator={true}
              contentContainerStyle={Styles.Content}>
                {
                  props.roles.roles.map((role, i) => {
                    var _SINGLE_ROW_CONTENT,
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
                      if ((typeof role.user.profile.photo != 'undefined') || (typeof role.user.profile_photo != 'undefined') || (typeof role.user.profilePhoto != 'undefined') || (typeof role.userProfilePhoto != 'undefined') || (typeof role.user_profile_photo != 'undefined') || (typeof role.profile_photo != 'undefined') || (typeof role.profilePhoto != 'undefined') || (typeof role.profile != 'undefined')){
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

                      _SINGLE_ROW_CONTENT = (
                        <Input
                          type={__CONSTANTS.content.scrollViewItem.type}
                          name={Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}
                          style={Styles.RoleItemContainer}
                          gradient={Global.colors.pair.aqrulean}
                          disable={true}>
                            <View
                              style={Styles.RoleItemContent}>
                                {_PROFILE_CONTENT}

                                <View
                                  style={Styles.RoleDetailContent}>
                                    <Text
                                      style={Styles.RoleTitle}>
                                        {Functions._convertKeywordToToken(`${role.user.personal.first_name} ${role.user.personal.last_name}`)}
                                    </Text>
                                    <Text
                                      style={Styles.RoleSubtitle}>
                                        {Functions._convertKeywordToToken(role.usergroup.role)}
                                    </Text>
                                </View>
                            </View>
                        </Input>
                      );
                    }else{
                      _SINGLE_ROW_CONTENT = (
                        <Input
                          type={__CONSTANTS.content.scrollViewItem.type}
                          name={Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}
                          style={[
                            Styles.RoleItemContainer,
                            Styles.RoleItemContainerWithEmptyPositionContent
                          ]}
                          disable={true}
                          key={`${Functions._convertTokenToKeyword(__CONSTANTS.content.scrollViewItem.state.normal.title.en)}-${i}`}>
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
            onRolesAbsorb={async (response) => {
              //We can use response later
              await props.fetchAvailableRoles(props.roles.currentTab);
            }}
            rolesModalvisibility={props.roles.rolesModalVisibility}
            {...props}>
              {_TAB_CONTENT}
          </Container>
        );
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
