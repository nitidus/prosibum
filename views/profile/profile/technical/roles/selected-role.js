import React, { Component } from 'react';
import { View, ScrollView, Text, Image, Dimensions } from 'react-native';

import { connect } from 'react-redux';

import { Global, Views } from '../../../../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../../../../assets/layouts/index';
import { Input, Carousel, Link } from '../../../../../assets/components/index';
import { Views as ViewsContainer } from '../../../../../assets/layouts/container/index';
const Styles = Views.Profile.Technical.RolesSubsets.SelectedRole,
      Container = ViewsContainer.Profile.Technical.Roles.SelectedRoleContainer,
      _SCREEN = Dimensions.get('window');
//
// import { Views as ViewsActions } from '../../../../assets/flows/states/actions';
// const { mapStateToProps, mapDispatchToProps } = ViewsActions.Profile.Roles;
//
// import { views_constants } from '../../../../assets/flows/knowledge/index';
// const __CONSTANTS = views_constants.profile.roles;
//
import { Functions } from '../../../../../assets/modules/index';
const { Preparation } = Functions;

class SelectedRole extends Component<{}> {
  static navigationOptions = {

  };

  _initializeTheSelectedRole(props) {
    var attitude = {};

    if ((typeof props.data != 'undefined') || (typeof props.roleData != 'undefined') || (typeof props.role_data != 'undefined')){
      attitude.data = props.data || props.roleData || props.role_data;
    }else{
      const { navigation } = props,
            _ROUTE_PARAMS = navigation.state.params;

      if (typeof _ROUTE_PARAMS != 'undefined'){
        attitude.data = _ROUTE_PARAMS;
      }else{
        attitude.data = {"_id":"5c62a6c2e70af56819877717","cardinal_id":"5c62a3d1d3b8016767779dca","created_at":"2019-02-12T10:58:10.044Z","modified_at":"2019-02-12T10:58:10.044Z","reference_id":"5c62a3d1d3b8016767779dca","cardinal_ancestors":["5c62a3d1d3b8016767779dca"],"user":{"_id":"5c62a6c2e70af56819877716","email":{"content":"fifth@example.com","validation":{"token":"6dade72a96af2f52be2ac5c2f49b6a2624422fcde150f0848827fb97ae455a39","value":true}},"created_at":"2019-02-12T10:58:10.044Z","modified_at":"2019-02-12T10:58:10.044Z"},"usergroup":{"_id":"5c62cd26195b276f1aa76a3f","cardinal_id":"5c62ccc1195b276f1aa76a39","cardinal_ancestors":["5c62ccc1195b276f1aa76a39"],"reference_id":"5c62ccc1195b276f1aa76a39","type":"WHOLESALER","role":"WAREHOUSE_MANAGER","priority":1,"created_at":"2019-02-12T13:41:58.181Z","modified_at":"2019-02-12T13:41:58.181Z"}};
      }
    }

    this.attitude = attitude;
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {
    this._initializeTheSelectedRole(props);
  }

  componentWillMount() {
    const { props } = this;

    this._initializeTheSelectedRole(props);
  }

  render() {
    const { props, attitude } = this,
          _PREPARED_PERSONAL_CONTACT_INFO = Preparation._prepareSelectedRolePersonalContactInformation(attitude.data),
          _CAROUSEL_ITEM_KEYS = _PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL.map((item, i) => {
            return item.key;
          }),
          _ITEM_WIDTH_COEFFICIENT = (_SCREEN.width >= 1000 || _SCREEN.height >= 1000)? 2: ((_PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL.length > 1)? 4: 2);

    return (
      <Container
        title={_PREPARED_PERSONAL_CONTACT_INFO.CONTAINER_TITLE}
        {...props}>
          <Carousel
            layout="default"
            name="hello"
            data={_PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL}
            firstItem={_PREPARED_PERSONAL_CONTACT_INFO.ROLE_DETAIL_FIRST_INDEX}
            style={Styles.DetailContainer}
            loop={true}
            itemWidth={_SCREEN.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
            onLayout={({ item, i }) => {
              const _ITEM_KEY = item.key,
                    _ITEM_VALUE = item.value;

              var _ITEM_CONTENT,
                  _ITEM_GRADIENT = Global.colors.pair.chaid;

              switch (_ITEM_KEY) {
                case "PRIMARY":
                  var _PROFILE_CONTENT = (
                        <View
                          style={Styles.BriefDetailProfileContainerWithNoPhoto}>
                            <Icon
                              name="person"
                              color={Global.colors.single.mercury}
                              width={Styles.BriefDetailProfileContainerWithNoPhoto.width - 15} />
                        </View>
                      ),
                      _PREFERED_CONTENT_TEXT = '';

                  if (typeof _ITEM_VALUE.profile != 'undefined'){
                    _PROFILE_CONTENT = (
                      <Image
                        source={{ uri: _ITEM_VALUE.profile }}
                        style={Styles.BriefDetailProfileContainer} />
                    );
                  }

                  if (typeof _ITEM_VALUE.full_name != 'undefined'){
                    _PREFERED_CONTENT_TEXT = _ITEM_VALUE.full_name;
                    _ITEM_GRADIENT = Global.colors.pair.chaid;
                  }else if (typeof _ITEM_VALUE.email != 'undefined') {
                    const _FOUNDED_KEY_INDEX = _CAROUSEL_ITEM_KEYS.findIndex((keyItem) => {
                      return keyItem === "PERSONAL_CONTACT_INFO";
                    });

                    if (_FOUNDED_KEY_INDEX === -1){
                      _PREFERED_CONTENT_TEXT = _ITEM_VALUE.email.content;
                    }

                    _ITEM_GRADIENT = Global.colors.pair.chaid;
                  }

                  _ITEM_CONTENT = (
                    <View
                      style={Styles.DetailItemContent}>
                        {_PROFILE_CONTENT}

                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <Text
                              style={Styles.BriefDetailTitle}>
                                {_ITEM_VALUE.role}
                            </Text>
                            <Text
                              style={Styles.BriefDetailSubtitle}>
                                {_PREFERED_CONTENT_TEXT}
                            </Text>
                        </View>
                    </View>
                  );
                  break;

                case "PERSONAL_CONTACT_INFO":
                  var _PHONE_NUMBER_VALIDATION_STATUS = _EMAIL_VALIDATION_STATUS = (
                    <View style={Styles.BriefDetailSubRowIconContainer}>
                      <Icon
                        name="bolt"
                        height={Styles.BriefDetailSubRowIconContainer.width - 14}
                        gradient={Global.colors.pair.peroly} />
                    </View>
                  );

                  if (_ITEM_VALUE.mobile_phone.validated === true){
                    _PHONE_NUMBER_VALIDATION_STATUS = (
                      <View style={Styles.BriefDetailSubRowIconContainer}>
                        <Icon
                          name="check"
                          width={Styles.BriefDetailSubRowIconContainer.width - 10}
                          gradient={Global.colors.pair.mipple} />
                      </View>
                    );
                  }

                  if (_ITEM_VALUE.email.validated === true){
                    _EMAIL_VALIDATION_STATUS = (
                      <View style={Styles.BriefDetailSubRowIconContainer}>
                        <Icon
                          name="check"
                          width={Styles.BriefDetailSubRowIconContainer.width - 10}
                          gradient={Global.colors.pair.mipple} />
                      </View>
                    );
                  }

                  _ITEM_CONTENT = (
                    <View>
                        <View
                          style={[
                            Styles.DetailItemMasterSubInfoContent,
                            {
                              marginBottom: Styles.Content.marginVertical
                            }
                          ]}>
                            {_PHONE_NUMBER_VALIDATION_STATUS}

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {_ITEM_VALUE.mobile_phone.content}
                            </Text>
                        </View>
                        <View
                          style={Styles.DetailItemMasterSubInfoContent}>
                            {_EMAIL_VALIDATION_STATUS}

                            <Text
                              style={Styles.BriefDetailRowText}>
                                {_ITEM_VALUE.email.content}
                            </Text>
                        </View>
                    </View>
                  );

                  _ITEM_GRADIENT = Global.colors.pair.bass;
                  break;
              }

              return (
                <Input
                  type="BUTTON"
                  name="{Functions._convertTokenToKeyword(__CONSTANTS.walletsCursor.state.normal.title.en)}"
                  gradient={_ITEM_GRADIENT}
                  style={[
                    Styles.DetailItemContainer,
                    Styles.LTR_ContentAlignment
                  ]}
                  disable={true}>
                    {_ITEM_CONTENT}
                </Input>
              )
            }} />
      </Container>
    );
  }
}

export default SelectedRole;
// export default connect(mapStateToProps, mapDispatchToProps)(Roles);
