import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { Global, Views } from '../../assets/styles/index';
import { Input } from '../../assets/components/index';
const Styles = Views.Profile.Dashboard;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.profile.dashboard;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

export const Dashboard = (props) => {
  const { navigation } = props;

  return (
    <ScrollView
      contentContainerStyle={Styles.Container}
      showsVerticalScrollIndicator={false}>
        <Input
          type={__CONSTANTS.walletsCursor.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.walletsCursor.state.normal.title.en)}
          gradient={Global.colors.pair.chaid}
          style={[
            Styles.DetailContainer,
            Styles.BriefDetailContainer,
            Styles.LTR_ContentAlignment
          ]}
          onPress={() => navigation.navigate('Wallets')}>
            <Text
              style={Styles.BriefDetailTitle}>
                8 {__CONSTANTS.walletsCursor.options.unit.en}
            </Text>
            <Text
              style={Styles.BriefDetailSubtitle}>
                {Functions._convertKeywordToToken(__CONSTANTS.walletsCursor.state.normal.title.en)}
            </Text>
        </Input>
    </ScrollView>
  )
}
