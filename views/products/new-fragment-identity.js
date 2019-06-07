import React, { Component } from 'react';
import { View, Dimensions, Platform, Text, Image, Keyboard, I18nManager } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_identity;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentIdentity extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    props.setLanguage(_LANGUAGE);
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newFragment;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (_PROPS.units.length > 0)){
      if (_PROPS.name.length > 7){
        if (Object.keys(_PROPS.product).length > 0){
          const _FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX = new RegExp(`\.*${_PROPS.product.name}\.*`, 'gi');

          if (_PROPS.name.match(_FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX)){
            _FORM_FIELDS_VALIDITY = true;
          }
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key);

      const _PRODUCT_CATEGORY = (Object.keys(props.newFragment.product).length > 0)? (props.newFragment.product.category.cumulative_key || props.newFragment.product.category.key): '',
            _VALIDATED = this._componentWillCheckValidation(props),
            _PRODUCT_UNITS_OTHER_PROPS = {
              language: props.newFragment.language,
              units: props.newFragment.units
            };

      var _UNITS_CONTENT;

      if (props.newFragment.units.length > 0){
        let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
            _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newFragment.units.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

        if (Platform.OS !== 'ios'){
          _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
          _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;

          if (I18nManager.isRTL){
            _FIRST_CAROUSEL_OTHER_OPTIONS.contentContainerCustomStyle = {
              flexDirection: 'row-reverse'
            };
          }
        }

        _UNITS_CONTENT = (
          <Carousel
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.title.en)}
            data={props.newFragment.units}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
            style={Styles.DetailContainer}
            onLayout={({ item, index }) => {
              var _UNIT_DELETE_ACTION = () => props.setUnits(props.newFragment.units.filter((checkingItem, j) => {
                return (checkingItem._id !== item._id);
              }));

              return (
                <Input
                  type={__CONSTANTS.content.firstCarousel.type}
                  style={[
                    Styles.UnitsDetailItemContainer,
                    Styles.LTR_ContentAlignment
                  ]}
                  gradient={Global.colors.pair.tilan}
                  onLongPress={_UNIT_DELETE_ACTION}>
                    <View
                      style={Styles.DetailItemMasterInfoContent}>
                        <View
                          style={Styles.BriefDetailTitleContainer}>
                          <Text
                            style={Styles.BriefDetailTitle}>
                              {Functions._getAppropriateTaxonomyBaseOnLocale(item.key, _LANGUAGE, 'unit')}
                          </Text>
                          <Text
                            style={Styles.BriefDetailTitleSuffix}>
                              {Functions._convertKeywordToToken(__CONSTANTS.content.firstCarousel.state.normal.suffix[_LANGUAGE])}
                          </Text>
                        </View>
                    </View>
                </Input>
              );
            }}
            {..._FIRST_CAROUSEL_OTHER_OPTIONS} />
        );
      }else{
        _UNITS_CONTENT = (
          <Link
            containerStyle={Styles.EmptyContentLink}
            value={__CONSTANTS.content.firstCarousel.state.null.title[_LANGUAGE]} />
        );
      }

      let _FINAL_BUTTON = (
        <Input
          type={__CONSTANTS.content.submitButton.type}
          name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
          value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
          gradient={Global.colors.pair.ongerine}
          style={{
            marginHorizontal: Styles.Content.marginHorizontal
          }}
          onPress={async () => {
            const { navigation } = props;

            await navigation.navigate('NewFragmentFeatures');
          }}
          forcedDisable={_VALIDATED} />
      );

      if (_VALIDATED){
        var _MESSAGE = '';

        if (props.newFragment.name != ''){
          if (props.newFragment.name.length > 7){
            if (Object.keys(props.newFragment.product).length > 0){
              const _FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX = new RegExp(`\.*${props.newFragment.product.name}\.*`, 'gi');

              if (props.newFragment.name.match(_FRAGMENT_INTERNAL_NAME_CONTAINS_PRODUCT_NAME_REGEX) === null){
                _MESSAGE += __CONSTANTS.content.firstInput.warnning.third[_LANGUAGE];
              }
            }
          }else{
            _MESSAGE += __CONSTANTS.content.firstInput.warnning.second[_LANGUAGE];
          }
        }else{
          _MESSAGE += __CONSTANTS.content.firstInput.warnning.first[_LANGUAGE];

          if (props.newFragment.units.length === 0){
            _MESSAGE += `\n ${__CONSTANTS.content.firstCarousel.warnning[_LANGUAGE]}`;
          }
        }

        if (_MESSAGE != ''){
          _FINAL_BUTTON = (
            <Input
              type={__CONSTANTS.content.submitButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
              value={_MESSAGE}
              style={[
                Styles.WarningContainer,
                {
                  marginBottom: Styles.Content.marginVertical
                }
              ]}
              textStyle={Styles.WarningContent} />
          );
        }
      }

      return (
        <Container
          title={Functions._convertKeywordToToken(__CONSTANTS.pilot.title[_LANGUAGE])}
          subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle[_LANGUAGE])}
          {...props}>
            <Input
              type={__CONSTANTS.content.firstInput.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
              placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
              value={props.newFragment.name}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={(currentValue) => props.setName(currentValue)} />

            {_UNITS_CONTENT}

            <View
              style={Styles.BottomPinnedContainer}>
                <Input
                  type={__CONSTANTS.content.modalHandlerButton.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
                  value={__CONSTANTS.content.modalHandlerButton.state.normal.title[_LANGUAGE]}
                  gradient={Global.colors.pair.ongerine}
                  style={{
                    marginHorizontal: Styles.Content.marginHorizontal,
                    marginBottom: Styles.Content.marginVertical
                  }}
                  onPress={() => props.setUnitsModalVisibility(true)} />

                {_FINAL_BUTTON}
            </View>

            <ProductFeaturesModal
              visibility={props.newFragment.unitsModalVisibility}
              onBlur={() => props.setUnitsModalVisibility(false)}
              onProgressSuccess={(response) => props.appendUnit(response)}
              {..._PRODUCT_UNITS_OTHER_PROPS} />
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentIdentity);
