import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Profile.Profile,
      Container = ViewsContainer.Profile.ProfileContainer;

import { PersonalTab, TechnicalTab, CertificationTab, HistoryTab, PostalTab } from './profile/tabs';

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.UserProfile;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.user_profile;

import { Functions } from '../../assets/modules/index';

class Profile extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {
    const { props } = this,
          { tabs } = __CONSTANTS.pilot,
          __TABS = tabs.map((tabItem, i) => {
            return tabItem.en;
          });

    props.setPilotTabs(__TABS);
    props.setPilotCurrentTab(__TABS[0]);
  }

  render() {
    const { props } = this,
          _CURRENT_TAB = Functions._convertTokenToKeyword(props.userProfile.currentTab);

    var _TAB_CONTENT;

    switch (_CURRENT_TAB) {
      case 'personal':
        _TAB_CONTENT = <PersonalTab />;
        break;
      case 'technical':
        _TAB_CONTENT = <TechnicalTab />;
        break;
      case 'certification':
        _TAB_CONTENT = <CertificationTab />
        break;
      case 'history':
        _TAB_CONTENT = <HistoryTab />
        break;
      case 'postal':
        _TAB_CONTENT = <PostalTab />
        break;
    }

    return (
      <Container
        title={__CONSTANTS.pilot.title.en}
        pilotItems={props.userProfile.tabs}
        currentPilotItem={props.userProfile.currentTab}
        onPilotTabItemPress={(item) => {
          props.setPilotCurrentTab(item);
        }}
        {...props}>
          {_TAB_CONTENT}
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
