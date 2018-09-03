import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';

import { content as target } from '../../app.json';

const Contents = target.pages.authorization.signup.content;
const Styles = Views.Authentication.Signup;

export default class Signup extends Component<{}> {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {

  }

  render() {
    return (
      <View style={Styles.Container}>
        <StatusBar hidden={true}/>

        <View style={Styles.Content}>
          <Headline
            style={Styles.Headline}
            title={Contents.headline.title.en}
            subtitle={Contents.headline.subtitle.en} />

          <InputGroup
            style={Styles.FirstInputGroup}>
            <Input
              type="TEXT"
              name="firstName"
              placeholder={Contents.firstInputGroup.firstName.placeholder.en} />
            <Input
              type="TEXT"
              name="lastName"
              placeholder={Contents.firstInputGroup.lastName.placeholder.en} />
          </InputGroup>

          <InputGroup
            style={Styles.SecondInputGroup}>
            <Input
              type="TEXT"
              name="phoneNumber"
              placeholder={Contents.secondInputGroup.phoneNumber.placeholder.en} />
            <Input
              type="EMAIL"
              name="email"
              placeholder={Contents.secondInputGroup.email.placeholder.en} />
            <Input
              type="PASSWORD"
              name="password"
              placeholder={Contents.secondInputGroup.password.placeholder.en} />
          </InputGroup>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="signup"
            value={Contents.submitButton.value.en}
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }} />

          <Link
            containerStyle={Styles.QuickLink}
            value={Contents.quickLink.value.en}
            onPress={() => {
              const { navigation } = this.props;

              navigation.goBack();
            }} />
        </View>
      </View>
    )
  }
}
