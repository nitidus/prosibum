import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Global, Views } from '../../assets/styles/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Profile.Profile,
      Container = ViewsContainer.Profile.ProfileContainer;

export default class Dashboard extends Component<{}> {
  static navigationOptions = {

  };

  render() {
    const { props } = this;

    return (
      <Container
        title="Profile"
        {...props}>
          <Text>Profile page.</Text>
      </Container>
    )
  }
}
