import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';

import { Headline, Input, InputGroup, Link } from '../../assets/components/index';
const Styles = Views.Authentication.Signup;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Authentication.Signup;

class Signup extends Component<{}> {
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
    const { props } = this;
    
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
              placeholder="First Name"
              value={props.signup.firstName}
              onChangeText={(currentValue) => props.setFirstName(currentValue)} />
            <Input
              type="TEXT"
              name="lastName"
              placeholder="Last Name"
              value={props.signup.lastName}
              onChangeText={(currentValue) => props.setLastName(currentValue)} />
          </InputGroup>

          <InputGroup
            style={Styles.SecondInputGroup}>
            <Input
              type="TEXT"
              name="phoneNumber"
              placeholder="Phone Number"
              value={props.signup.phoneNumber}
              onChangeText={(currentValue) => props.setPhoneNumber(currentValue)} />
            <Input
              type="EMAIL"
              name="email"
              placeholder="Email"
              value={props.signup.email}
              onChangeText={(currentValue) => props.setEmail(currentValue)} />
            <Input
              type="PASSWORD"
              name="password"
              placeholder="Password"
              value={props.signup.password}
              onChangeText={(currentValue) => props.setPassword(currentValue)} />
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

              // props.setEmail('');
              // props.setPassword('');

              navigation.goBack();
            }} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
