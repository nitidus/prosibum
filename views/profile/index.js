import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Profile.Self,
      Container = ViewsContainer.Profile.ProfileContainer;

import { PersonalTab, TechnicalTab, CertificationTab, HistoryTab, PostalTab } from './account/tabs';

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.UserProfile;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.self;

import { Functions } from '../../assets/modules/index';

class Profile extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          { tabs } = __CONSTANTS.pilot,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = _NATIVE_SETTINGS.language,
          __TABS = tabs.map((tabItem, i) => {
            return tabItem;
          });

    this._language = _LANGUAGE;

    props.setPilotTabs(__TABS);
    props.setPilotCurrentTab(__TABS[0]);
  }

  render() {
    const { props } = this,
          _LANGUAGE = (typeof this._language != 'undefined')? Functions._convertTokenToKeyword(this._language.key): 'en',
          _CURRENT_TAB = (Object.keys(props.userProfile.currentTab).length > 0)? Functions._convertTokenToKeyword(props.userProfile.currentTab.en): '',
          _CONTAINER_OTHER_PROPS = {
            language: this._language
          },
          _OTHER_PROPS = {
            language: this._language
          };

    var _TAB_CONTENT;

    switch (_CURRENT_TAB) {
      case 'personal':
        _TAB_CONTENT = <PersonalTab
          {...props}
          {..._OTHER_PROPS} />;
        break;
      case 'technical':
        _TAB_CONTENT = <TechnicalTab
          {...props}
          {..._OTHER_PROPS} />;
        break;
      case 'certification':
        _TAB_CONTENT = <CertificationTab
          {...props}
          {..._OTHER_PROPS} />
        break;
      case 'history':
        _TAB_CONTENT = <HistoryTab
          {...props}
          {..._OTHER_PROPS} />
        break;
      case 'postal':
        _TAB_CONTENT = <PostalTab
          {...props}
          {..._OTHER_PROPS} />
        break;
    }

    return (
      <Container
        title={__CONSTANTS.pilot.title[_LANGUAGE]}
        pilotItems={props.userProfile.tabs}
        currentPilotItem={props.userProfile.currentTab}
        onPilotTabItemPress={(item) => {
          props.setPilotCurrentTab(item);
        }}
        {...props}
        {..._CONTAINER_OTHER_PROPS}>
          {_TAB_CONTENT}
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
