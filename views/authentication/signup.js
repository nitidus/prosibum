import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';

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
            title="Dear User"
            subtitle={"Please enter your\nuser accoun details."} />

          <InputGroup
            style={Styles.FirstInputGroup}>
            <Input
              type="TEXT"
              name="firstName"
              placeholder="First Name" />
            <Input
              type="TEXT"
              name="lastName"
              placeholder="Last Name" />
          </InputGroup>

          <InputGroup
            style={Styles.SecondInputGroup}>
            <Input
              type="TEXT"
              name="phoneNumber"
              placeholder="Phone Number" />
            <Input
              type="EMAIL"
              name="email"
              placeholder="Email" />
            <Input
              type="PASSWORD"
              name="password"
              placeholder="Password" />
          </InputGroup>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="signup"
            value="Signup"
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }} />

          <Link
            containerStyle={Styles.QuickLink}
            value="Already have an account?"
            onPress={() => {
              const { navigation } = this.props;

              navigation.goBack();
            }} />
        </View>
      </View>
    )
  }
}
