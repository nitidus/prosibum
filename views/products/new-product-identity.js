import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Text, Image, Keyboard } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, Options, ProductFeaturesModal, ProductCategoriesModal } from '../../assets/layouts/index';
import { Input, InputGroup, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_identity;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductIdentity extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    props.setLanguage(_LANGUAGE);
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (Object.keys(_PROPS.category).length > 0) && (_PROPS.tags.length > 0) && (_PROPS.inventoryUnits.length > 0)){
      if (_PROPS.name.length > 7){
        const _CATEGORY_NAME = _PROPS.category.cumulative_key || _PROPS.category.key,
              _PRODUCT_NAME_CONTAINS_CATEGORY_NAME_REGEX = new RegExp(`\.*${_CATEGORY_NAME}\.*`, 'gi');

        if (_PROPS.name.match(_PRODUCT_NAME_CONTAINS_CATEGORY_NAME_REGEX) && (_PROPS.name.trim() !== _CATEGORY_NAME)){
          _FORM_FIELDS_VALIDITY = true;
        }
      }
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newProduct.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newProduct.language.key),
            _PRODUCT_CATEGORIES_OTHER_PROPS = {
              language: props.newProduct.language
            },
            _PRODUCT_UNITS_OTHER_PROPS = {
              language: props.newProduct.language,
              units: props.newProduct.inventoryUnits
            };

      const _PRODUCT_CATEGORY = (Object.keys(props.newProduct.category).length > 0)? (props.newProduct.category.cumulative_key || props.newProduct.category.key): '',
            _VALIDATED = this._componentWillCheckValidation(props);

      var _UNITS_CONTENT,
          _FINAL_BUTTON = (
            <Input
              type={__CONSTANTS.content.submitButton.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.submitButton.state.normal.title.en)}
              value={__CONSTANTS.content.submitButton.state.normal.title[_LANGUAGE]}
              gradient={Global.colors.pair.ongerine}
              style={{
                marginHorizontal: Styles.Content.marginHorizontal,
                marginVertical: Styles.Content.marginVertical
              }}
              onPress={async () => {
                const { navigation } = props;

                await navigation.navigate('NewProductFeatures');
              }}
              forcedDisable={_VALIDATED} />
          );

      if (props.newProduct.inventoryUnits.length > 0){
        let _FIRST_CAROUSEL_OTHER_OPTIONS = {},
            _ITEM_WIDTH_COEFFICIENT = (_Screen.width >= 1000 || _Screen.height >= 1000)? 2: ((props.newProduct.inventoryUnits.length > 1)? ((Platform.OS !== 'ios')? 4: 2): 2);

        if (Platform.OS !== 'ios'){
          _FIRST_CAROUSEL_OTHER_OPTIONS.layout = 'default';
          _FIRST_CAROUSEL_OTHER_OPTIONS.loop = true;
        }

        _UNITS_CONTENT = (
          <Carousel
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.title.en)}
            data={props.newProduct.inventoryUnits}
            itemWidth={_Screen.width - (Styles.Content.marginHorizontal * _ITEM_WIDTH_COEFFICIENT)}
            style={[
              Styles.DetailContainer,
              {
                marginTop: Styles.Content.marginVertical
              }
            ]}
            onLayout={({ item, index }) => {
              var _UNIT_DELETE_ACTION = () => props.setInvenntoryUnits(props.newProduct.inventoryUnits.filter((checkingItem, j) => {
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
      }

      if (_VALIDATED){
        var _MESSAGE = '';

        if (Object.keys(props.newProduct.category).length === 0){
          _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.firstInput.warning[_LANGUAGE]}`;
        }

        if (props.newProduct.name != ''){
          if ((props.newProduct.name.length > 7) && (Object.keys(props.newProduct.category).length > 0)){
            const _CATEGORY_NAME = props.newProduct.category.cumulative_key || props.newProduct.category.key,
                  _PRODUCT_NAME_CONTAINS_CATEGORY_NAME_REGEX = new RegExp(`\.*${_CATEGORY_NAME}\.*`, 'gi');

            if (props.newProduct.name.match(_PRODUCT_NAME_CONTAINS_CATEGORY_NAME_REGEX) === null){
              _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.secondInput.warning.fourth[_LANGUAGE]}`;
            }

            if (props.newProduct.name.trim() === _CATEGORY_NAME){
              _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.secondInput.warning.third[_LANGUAGE]}`;
            }
          }else{
            _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.secondInput.warning.second[_LANGUAGE]}`;
          }
        }else{
          _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.secondInput.warning.first[_LANGUAGE]}`;
        }

        if (props.newProduct.tags.length === 0){
          _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.thirdInput.warning[_LANGUAGE]}`;
        }

        if (props.newProduct.inventoryUnits.length === 0){
          _MESSAGE += `${((_MESSAGE != '')? '\n': '')} ${__CONSTANTS.content.firstCarousel.warning[_LANGUAGE]}`;
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
                  marginVertical: Styles.Content.marginVertical
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              name={Functions._convertKeywordToToken(__CONSTANTS.content.title.en)}>
                <InputGroup
                  style={{
                    marginHorizontal: Styles.Content.marginHorizontal,
                    marginTop: Styles.Content.marginVertical
                  }}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInputGroup.title.en)}>
                    <Input
                      type={__CONSTANTS.content.firstInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstInput.title.en)}
                      link={__CONSTANTS.content.firstInput.link[_LANGUAGE]}
                      placeholder={__CONSTANTS.content.firstInput.title[_LANGUAGE]}
                      value={_PRODUCT_CATEGORY}
                      onPress={() => {
                        Keyboard.dismiss();
                        props.setCategoriesModalVisibility(true);
                      }}
                      disable={true} />

                    <Input
                      type={__CONSTANTS.content.secondInput.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.secondInput.title.en)}
                      placeholder={__CONSTANTS.content.secondInput.title[_LANGUAGE]}
                      value={props.newProduct.name}
                      onChangeText={(currentValue) => props.setName(currentValue)} />
                </InputGroup>

                {_UNITS_CONTENT}

                <Input
                  type={__CONSTANTS.content.thirdInput.type}
                  name={Functions._convertTokenToKeyword(__CONSTANTS.content.thirdInput.title.en)}
                  placeholder={__CONSTANTS.content.thirdInput.title[_LANGUAGE]}
                  gradient={Global.colors.pair.ongerine}
                  tags={props.newProduct.tags}
                  value={props.newProduct.inprocessTag}
                  style={{
                    marginHorizontal: Styles.Content.marginHorizontal,
                    marginTop: Styles.Content.marginVertical
                  }}
                  onChangeText={(currentValue) => props.setInprocessTag(currentValue)}
                  onSubmitEditing={(currentValue) => {
                    props.appendTag(currentValue);
                    props.setInprocessTag('');
                  }}
                  onRemoveTag={(tag) => props.setTags(props.newProduct.tags.filter((checkingTag, i) => {
                    return (tag !== checkingTag);
                  }))} />

              <Input
                type={__CONSTANTS.content.modalHandlerButton.type}
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.modalHandlerButton.state.normal.title.en)}
                value={__CONSTANTS.content.modalHandlerButton.state.normal.title[_LANGUAGE]}
                gradient={Global.colors.pair.ongerine}
                style={{
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginTop: Styles.Content.marginVertical
                }}
                onPress={() => props.setUnitsModalVisibility(true)} />

                {_FINAL_BUTTON}
            </ScrollView>

            <ProductCategoriesModal
              visibility={props.newProduct.categoriesModalVisibility}
              onBlur={() => props.setCategoriesModalVisibility(false)}
              onProgressSuccess={async (response) => {
                const _CATEGORY_NAME = response.cumulative_key || response.key;

                await props.setCategory(response);
                await props.setName(_CATEGORY_NAME);
              }}
              {..._PRODUCT_CATEGORIES_OTHER_PROPS} />

            <ProductFeaturesModal
              visibility={props.newProduct.unitsModalVisibility}
              onBlur={() => props.setUnitsModalVisibility(false)}
              onProgressSuccess={(response) => props.appendInvenntoryUnit(response)}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProductIdentity);
