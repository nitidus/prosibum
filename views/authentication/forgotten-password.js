import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Container, Input, InputGroup, Segment, Link } from '../../assets/components/index';

import { content as target } from '../../app.json';

const Contents = target.pages.authorization.forgottenPassword.content;
const Styles = Views.Authentication.ForgottenPassword;

export default class ForgottenPassword extends Component<{}> {
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

          <Segment
            style={Styles.Segment}
            name="forgotten-options">
              <Container
                active={true}
                name="email"
                title="Email">
                  <Input
                    type="EMAIL"
                    name="email"
                    placeholder="Email" />
              </Container>
              <Container
                name="phone-number"
                title="Phone">
                  <Input
                    type="TEXT"
                    name="phone-number"
                    placeholder="Phone Number" />
              </Container>
          </Segment>

          <Input
            style={Styles.SubmitButton}
            type="BUTTON"
            name="send"
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
