import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Platform, Text, Image, Animated, Easing } from 'react-native';
const _Screen = Dimensions.get('window');

import { connect } from 'react-redux';
import Interactable from 'react-native-interactable';

import { Global, Views } from '../../assets/styles/index';
import { ActivityIndicator, Toast, Icon, ProductFeaturesModal } from '../../assets/layouts/index';
import { Input, Link, Carousel } from '../../assets/components/index';
import { Views as ViewsContainer } from '../../assets/layouts/container/index';
const Styles = Views.Products.NewProduct,
      Container = ViewsContainer.Products.NewProductContainer;

import { Views as ViewsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ViewsActions.Products.NewProduct;

import { views_constants } from '../../assets/flows/knowledge/index';
const __CONSTANTS = views_constants.products.new_product_features;

import { Functions } from '../../assets/modules/index';
const { Preparation } = Functions;

class NewProductFeatures extends Component<{}> {
  static navigationOptions = {

  };

  componentDidMount() {
    const { props } = this;
  }

  _componentWillCheckValidation(props) {
    const _PROPS = props.newProduct;

    var _FORM_FIELDS_VALIDITY = false;

    if ((_PROPS.name != '') && (Object.keys(_PROPS.currentWarehouse).length > 0) && (Object.keys(_PROPS.category).length > 0)){
      _FORM_FIELDS_VALIDITY = true;
    }

    return !_FORM_FIELDS_VALIDITY;
  }

  render() {
    const { props } = this;

    var _FEATURES_CONTENT,
        _UNIT_FEATURES = [],
        _PAN_RESPONDER = this._panResponder,
        _FEATURES_ANIMATED_VALUES = [];

    const _PRODUCT_TITLE = (props.newProduct.name != '')? props.newProduct.name: __CONSTANTS.pilot.title.en,
          _VALIDATED = this._componentWillCheckValidation(props);

    // if (props.newProduct.features.length > 0){
      const TEST = [{"feature":{"_id":"5ca681d9d0a37b307e733050","created_at":"2019-04-04T22:14:48.903Z","modified_at":"2019-04-04T22:14:48.903Z","key":"UNIT"},"unit":{"_id":"5ca6848ed0a37b307e733054","created_at":"2019-04-04T22:26:21.819Z","modified_at":"2019-04-04T22:26:21.819Z","key":"BOX"},"minimumOrderQuantity":20,"maximumOrderQuantity":200,"quantity":1000},{"feature":{"_id":"5ca681d9d0a37b307e733050","created_at":"2019-04-04T22:14:48.903Z","modified_at":"2019-04-04T22:14:48.903Z","key":"UNIT"},"unit":{"_id":"5ca684a9d0a37b307e733055","created_at":"2019-04-04T22:26:48.960Z","modified_at":"2019-04-04T22:26:48.960Z","key":"KILOGRAM"},"minimumOrderQuantity":20,"maximumOrderQuantity":2000,"quantity":20000},{"feature":{"_id":"5ca6823dd0a37b307e733052","created_at":"2019-04-04T22:16:28.930Z","modified_at":"2019-04-04T22:16:28.930Z","key":"DESCRIPTION"},"description":"Hello\nWorld"},{"feature":{"_id":"5ca68269d0a37b307e733053","created_at":"2019-04-04T22:17:13.287Z","modified_at":"2019-04-04T22:17:13.287Z","key":"CUSTOMIZED"},"featureName":"Barcode","featureValue":"112335345"}];

      _FEATURES_ANIMATED_VALUES = TEST.map((item, i) => {
        const _FINAL_VALUE = new Animated.Value(0);

        return _FINAL_VALUE;
      });

      _FEATURES_CONTENT = <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={Styles.FeaturesContainer}>
          {
            /*props.newProduct.features*/TEST.map((featureItem, i, totalFeatures) => {
              const _FEATURE_NAME = Functions._convertTokenToKeyword(featureItem.feature.key);

              var _CUSTOM_STYLE = {};

              if (i < totalFeatures.length){
                _CUSTOM_STYLE.marginBottom = Styles.Content.marginHorizontal;
              }

              switch (_FEATURE_NAME) {
                case 'unit':
                const _SELECTED_FEATURE_INDEX = 0;

                  if (_UNIT_FEATURES.length > 0){
                    _UNIT_FEATURES.push(featureItem);
                  }else{
                    _UNIT_FEATURES.push(featureItem);

                    return (
                      <Carousel
                        name="{Functions._convertTokenToKeyword(__CONSTANTS.content.firstCarousel.state.normal.title.en)}"
                        data={_UNIT_FEATURES}
                        firstItem={_SELECTED_FEATURE_INDEX}
                        itemWidth={_Screen.width - (Styles.Content.marginHorizontal * 2)}
                        style={[
                          Styles.DetailContainer,
                          _CUSTOM_STYLE
                        ]}
                        onLayout={({ item, index }) => {
                          var _ITEM_GRADIENT = Global.colors.pair.tilan;

                          return (
                            <Input
                              type="BUTTON"
                              style={[
                                Styles.UnitsFeatureDetailItemContainer,
                                Styles.LTR_ContentAlignment
                              ]}
                              gradient={_ITEM_GRADIENT}>
                                <View
                                  style={Styles.DetailItemMasterInfoContent}>
                                    <View
                                      style={Styles.BriefDetailTitleContainer}>
                                      <Text
                                        style={Styles.BriefDetailTitle}>
                                          {Functions._convertKeywordToToken(item.unit.key)}
                                      </Text>
                                      <Text
                                        style={Styles.BriefDetailTitleSuffix}>
                                          {"Unit Type"}
                                      </Text>
                                    </View>
                                </View>
                                <View
                                  style={[
                                    Styles.DetailItemMasterSubInfoContent,
                                    {
                                      marginBottom: Styles.Content.marginHorizontal / 2
                                    }
                                  ]}>
                                    <Icon
                                      name="grading"
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={Styles.BriefDetailRowText}>
                                        {Functions._convertNumberToHumanReadableFormat(item.minimumOrderQuantity)} {"Minimum Order"}
                                    </Text>
                                </View>
                                <View
                                  style={[
                                    Styles.DetailItemMasterSubInfoContent,
                                    {
                                      marginBottom: Styles.Content.marginHorizontal / 2
                                    }
                                  ]}>
                                    <Icon
                                      name="grading"
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={Styles.BriefDetailRowText}>
                                        {Functions._convertNumberToHumanReadableFormat(item.maximumOrderQuantity)} {"Maximum Order"}
                                    </Text>
                                </View>
                                <View
                                  style={Styles.DetailItemMasterSubInfoContent}>
                                    <Icon
                                      name="grading"
                                      color={Global.colors.single.romance} />

                                    <Text
                                      style={Styles.BriefDetailRowText}>
                                        {Functions._convertNumberToHumanReadableFormat(item.quantity)} {"Quantity"}
                                    </Text>
                                </View>
                            </Input>
                          );
                        }} />
                    );
                  }
                  break;

                case 'description':
                // console.log(_FEATURES_ANIMATED_VALUES[i])
                  return (
                    <View
                      style={{flex: 1}}>
                        <Interactable.View
                          horizontalOnly={true}
                          snapPoints={[
                            { x: 0 },
                            { x: -116 }
                          ]}
                          boundaries={{
                            left: -116,
                            right: 0
                          }}
                          dragToss={0.01}
                          animatedValueX={_FEATURES_ANIMATED_VALUES[i]}
                          onSnap={({nativeEvent}) => {
                            // console.log(nativeEvent)
                          }}>
                            <Input
                              type="BUTTON"
                              style={[
                                Styles.DescriptionFeature,
                                Styles.LTR_ContentAlignment,
                                {
                                  ..._CUSTOM_STYLE,
                                  height: (featureItem.description.length > 64)? 128: Styles.DescriptionFeature.height
                                }
                              ]}
                              textStyle={Styles.DescriptionFeatureText}
                              value={Functions._stripLongString(featureItem.description, ((featureItem.description.length > 64)? 128: 64))}
                              disable={true}/>
                        </Interactable.View>

                        <Animated.View
                          style={{
                            position: 'absolute',
                            backgroundColor: 'red',
                            height: (featureItem.description.length > 64)? 128: Styles.DescriptionFeature.height,
                            right: Styles.Content.marginHorizontal,
                            borderRadius: 5,
                            width: _FEATURES_ANIMATED_VALUES[i].interpolate({
                              inputRange: [-116, 0],
                              outputRange: [101, 0],
                              extrapolateLeft: 'clamp',
                              extrapolateRight: 'clamp'
                            })
                          }}/>
                    </View>
                  );
                  break;

                case 'customized':
                  return (
                    <Input
                      type="BUTTON"
                      style={[
                        Styles.CustomizedFeatureDetailItemContainer,
                        Styles.LTR_ContentAlignment,
                        _CUSTOM_STYLE
                      ]}
                      gradient={Global.colors.pair.aqrulean}>
                        <View
                          style={Styles.DetailItemMasterInfoContent}>
                            <View
                              style={Styles.BriefDetailTitleContainer}>
                              <Text
                                style={Styles.BriefDetailTitle}>
                                  {Functions._convertKeywordToToken(featureItem.featureName)}
                              </Text>
                              <Text
                                style={Styles.BriefDetailTitleSuffix}>
                                  {"Customized"}
                              </Text>
                            </View>

                            <Text
                              style={Styles.BriefDetailSubtitle}>
                                {Functions._convertKeywordToToken(featureItem.featureValue)}
                            </Text>
                        </View>
                    </Input>
                  );
                  break;
              }
            })
          }
      </ScrollView>;
    // }else{
    //   _FEATURES_CONTENT = (<Text>Empty</Text>)
    // }

    return (
      <Container
        title={Functions._convertKeywordToToken(_PRODUCT_TITLE)}
        subtitle={Functions._convertKeywordToToken(__CONSTANTS.pilot.subtitle.en)}
        rightIcon="plus"
        onRightIconPress={() => props.setProductFeaturesModalVisibility(true)}
        {...props}>
          {_FEATURES_CONTENT}

          <ProductFeaturesModal
            visibility={props.newProduct.productFeaturesModalVisibility}
            onBlur={() => props.setProductFeaturesModalVisibility(false)}
            onProgressSuccess={(response) => props.appendProductFeature(response)} />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProductFeatures);
