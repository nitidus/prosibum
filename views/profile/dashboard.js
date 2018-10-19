import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Global, Views } from '../../assets/styles/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Profile.Dashboard,
      Container = ViewsContainer.Profile.DashboardContainer;

export default class Dashboard extends Component<{}> {
  static navigationOptions = {

  };

  render() {
    const { props } = this;

    return (
      <Container>
        <Text>Dashboard page.</Text>
      </Container>
    )
  }
}
