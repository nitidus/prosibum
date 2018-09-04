import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Container, Input, InputGroup, Segment, Link } from '../../assets/components/index';

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
            title="Dear User"
            subtitle={"To change your password\nuse the form below."} />

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
            value="Send"
            gradient={Global.colors.pair.ongerine}
            onPress={() => {
              alert('ok')
            }} />

          <Link
            containerStyle={Styles.QuickLink}
            value="Remember your password?"
            onPress={() => {
              const { navigation } = this.props;

              navigation.goBack();
            }} />
        </View>
      </View>
    )
  }
}
