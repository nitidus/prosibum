import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Animated, TouchableOpacity, Text, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Segment;

import { Functions } from '../modules/index';

import { Components as ComponentsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = ComponentsActions.Segment;

const Segment = (props) => {
  var attitude = {};

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      attitude.key = Functions._generateNewUniqueObjectKey()
    }
  }

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
  }

  if ((typeof props.onChangeTab != 'undefined') || (typeof props.onChange != 'undefined')){
    attitude.onChangeTab = props.onChangeTab || props.onChange;
  }

  if (typeof props.style != 'undefined'){
    attitude.style = props.style;

    if (typeof attitude.style == 'object' && Array.isArray(attitude.style)){
      attitude.style = attitude.style.reduce((total, item) => {
        return {
          ...total,
          ...item
        };
      })
    }
  }

  var _CONTENT;

  if (props.active != ''){
    console.log('ok')
    _CONTENT = (
      <View
        key="contents"
        style={Styles.DualSegmentContents}>
          {
            props.children.filter((child, i) => {
              var childProps = {...child.props},
                  childName = childProps.children.props.name;

              return (childName === props.active);
            }).map((child, i, children) => {
              var childProps = {...child.props},
                  childStyle = [
                    child.props.style
                  ];

              const ultimateKey = Functions._generateNewUniqueObjectKey();

              childProps.key = childProps.name || ultimateKey;
              childProps.style = childStyle;

              childProps.active = true;

              return React.cloneElement(child, childProps);
            })
          }
      </View>
    );
  }

  return (
    <View
      key={attitude.key}
      name={attitude.name}
      style={[
        Styles.DualSegmentContainer,
        attitude.style
      ]}>
        <View
          key="tabs"
          style={Styles.DualSegmentTabs}>
            {
              props.children.map((childSymbol, i) => {
                var childLocalProps = childSymbol.props,
                    childStatusName = props.active,
                    localProps = childLocalProps.children.props,
                    child = {
                      name: localProps.name,
                      value: localProps.value
                    },
                    selectedChildTitle = props.children[i].props.title || child.name,
                    childTitle = Functions._convertKeywordToToken(selectedChildTitle);

                if (typeof childTitle != 'undefined'){
                  var disableSegmentStyle = {};

                  if ((i % 2) == 0){
                    disableSegmentStyle.marginRight = 15;
                  }else{
                    disableSegmentStyle.marginLeft = 15;
                  }

                  if (childStatusName != child.name){
                    return (
                      <TouchableOpacity
                        key={child.name}
                        name={child.name}
                        style={[
                          Styles.DualSegmentTabContainer,
                          Styles.DualSegmentTabInnerContent,
                          Styles.DisableDualSegmentTabInnerContent,
                          disableSegmentStyle
                        ]}
                        onPress={() => {
                          attitude.onChangeTab(child.name);

                          var localChildrenVisibility = props.children.map((singleChildSymbol, j) => {
                            var singleChildSymbol = singleChildSymbol.props.children.props,
                                singleChild = {
                                  name: singleChildSymbol.name,
                                  value: singleChildSymbol.value
                                };

                            return singleChild;
                          })

                          props.setChildrenVisibility(localChildrenVisibility);
                        }}>
                          <Text
                            style={Styles.DualSegmentTabInnerContentTitle}>
                              {childTitle}
                          </Text>
                      </TouchableOpacity>
                    );
                  }else {
                    const activeSegmentGradient = Global.colors.pair.ongerine,
                          restructredRange = Object.keys(activeSegmentGradient).map((stepName) => {
                            return activeSegmentGradient[stepName];
                          });

                    return (
                      <LinearGradient
                        key={child.name}
                        name={child.name}
                        style={[
                          Styles.DualSegmentTabContainer,
                          Styles.DualSegmentTabInnerContent
                        ]}
                        start={{x: 0.0, y: 0.0}} end={{x: 1.0, y: 1.0}}
                        colors={restructredRange}>
                          <TouchableOpacity>
                              <Text
                                style={Styles.DualSegmentTabInnerContentTitle}>
                                  {childTitle}
                              </Text>
                          </TouchableOpacity>
                      </LinearGradient>
                    );
                  }
                }
              })
            }
        </View>

        {_CONTENT}
    </View>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
