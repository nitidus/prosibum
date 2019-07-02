import React, { Component } from 'react';
import { View, Dimensions, Platform, Text, Image, FlatList, Keyboard } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon } from '../../assets/layouts/index';
import { Input, Link } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewFragment,
      Container = ViewsContainer.Products.NewFragmentContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewFragment;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_fragment_detection;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewFragmentDetection extends Component<{}> {
  static navigationOptions = {

  };

  async componentDidMount() {
    const { props } = this,
          _NATIVE_SETTINGS = await Functions._getDefaultNativeSettings(),
          _LANGUAGE = await _NATIVE_SETTINGS.language;

    props.resetForms();
    props.setLanguage(_LANGUAGE);
  }

  render() {
    const { props } = this;

    if (Object.keys(props.newFragment.language).length > 0){
      const _LANGUAGE = Functions._convertTokenToKeyword(props.newFragment.language.key),
            _WAREHOUSES_OTHER_PROPS = {
              language: props.newFragment.language
            },
            _PRODUCT_CATEGORIES_OTHER_PROPS = {
              language: props.newFragment.language
            };

      var _PRODUCTS_QUERY_CONTENT = (
            <View/>
          ),
          _PRODUCTS_QUERY_EXTRA_CONTENT = (
            <View/>
          );

      if (props.newFragment.queryItemsLoading){
        _PRODUCTS_QUERY_CONTENT = (
          <Input
            type={__CONSTANTS.content.firstFlatList.type}
            name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstFlatList.state.loading.title.en)}
            gradient={Global.colors.pair.tilan}
            style={[
              Styles.WarehouseItemContainer,
              {
                marginHorizontal: Styles.Content.marginHorizontal,
                marginBottom: Styles.Content.marginVertical
              }
            ]}
            disable={true}>
              <ActivityIndicator/>
          </Input>
        );
      }else{
        if (!props.newFragment.connected.status){
          _PRODUCTS_QUERY_CONTENT = (
            <Input
              type={__CONSTANTS.content.firstFlatList.type}
              name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstFlatList.state.disconected.title.en)}
              style={[
                Styles.WarehouseItemContainer,
                Styles.WarehouseErrorContainer,
                {
                  marginHorizontal: Styles.Content.marginHorizontal,
                  marginBottom: Styles.Content.marginVertical
                }
              ]}
              textStyle={Styles.WarehouseErrorContent}
              value={props.newFragment.connected.content}
              onPress={async () => await props.fetchAvailableProductsBasedOnQueryOnDemand(props.newFragment.productQuery)}/>
          );
        }else{
          if (props.newFragment.queryItems.length > 0){
            const _PRODUCTS_QUERY_CONTENT_CUSTOM_STYLE = {
                    paddingHorizontal: Styles.Content.marginHorizontal
                  };

            _PRODUCTS_QUERY_CONTENT = (
              <FlatList
                name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstFlatList.state.normal.title.en)}
                data={props.newFragment.queryItems}
                contentContainerStyle={_PRODUCTS_QUERY_CONTENT_CUSTOM_STYLE}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }, i) => {
                  return (
                    <Input
                      type={__CONSTANTS.content.firstFlatList.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstFlatList.state.normal.content.title.en)}
                      style={[
                        Styles.WarehouseItemContainer,
                        {
                          marginBottom: Styles.Content.marginVertical
                        }
                      ]}
                      gradient={Global.colors.pair.tilan}
                      onPress={() => {
                        const { navigation } = props,
                              _CATEGORY = item.category;

                        props.setProduct(item);
                        props.setName(item.name);

                        navigation.navigate('NewFragmentIdentity');
                      }}>
                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <Text
                              style={Styles.BriefDetailTitle}>
                                {Functions._convertKeywordToToken(item.name)}
                            </Text>
                            <Text
                              style={Styles.BriefDetailSubtitle}>
                                {item.category.key}
                            </Text>
                        </View>
                    </Input>
                  );
                }}/>
            );

            _PRODUCTS_QUERY_EXTRA_CONTENT = (
              <View
                style={{
                  marginVertical: Styles.Content.marginVertical
                }}>
                  <Input
                    type={__CONSTANTS.content.firstFlatList.state.null.type}
                    name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstFlatList.state.null.state.normal.title.en)}
                    value={__CONSTANTS.content.firstFlatList.state.null.state.normal.title[_LANGUAGE]}
                    gradient={Global.colors.pair.ongerine}
                    style={{
                      marginHorizontal: Styles.Content.marginHorizontal
                    }}
                    onPress={() => {
                      const { navigation } = props;

                      Keyboard.dismiss();
                      navigation.navigate('NewProductIdentity');
                    }} />
              </View>
            );
          }else{
            if (props.newFragment.query.length >= 3){
              _PRODUCTS_QUERY_EXTRA_CONTENT = (
                <View
                  style={{
                    marginBottom: Styles.Content.marginVertical
                  }}>
                    <Input
                      type={__CONSTANTS.content.firstFlatList.state.null.type}
                      name={Functions._convertTokenToKeyword(__CONSTANTS.content.firstFlatList.state.null.state.normal.title.en)}
                      value={__CONSTANTS.content.firstFlatList.state.null.state.normal.title[_LANGUAGE]}
                      gradient={Global.colors.pair.ongerine}
                      style={{
                        marginHorizontal: Styles.Content.marginHorizontal
                      }}
                      onPress={() => {
                        const { navigation } = props;

                        Keyboard.dismiss();
                        navigation.navigate('NewProductIdentity');
                      }} />
                </View>
              );
            }
          }
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
              value={props.newFragment.query}
              style={[
                Styles.RegularItemContainer,
                {
                  marginTop: Styles.Content.marginVertical
                }
              ]}
              onChangeText={async (currentValue) => {
                if (currentValue.length >= 3){
                  await props.fetchAvailableProductsBasedOnQueryOnDemand(currentValue);
                }else{
                  if ((props.newFragment.query.length > currentValue.length) && (props.newFragment.queryItems.length > 0)){
                    await props.setQueryItems([]);
                  }
                }

                await props.setQuery(currentValue);
              }} />

              {_PRODUCTS_QUERY_CONTENT}

              {_PRODUCTS_QUERY_EXTRA_CONTENT}
        </Container>
      );
    }else{
      return (
        <ActivityIndicator/>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFragmentDetection);
