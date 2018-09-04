import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Animated, TouchableOpacity, Text, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { Input } from './input';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Components.Segment;

import { COMPONENTS } from '../flows/states/types/components';
const { SEGMENT } = COMPONENTS;

const Segment = (props) => {
  var attitude = {};

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    var localChildrenVisibility = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }

    attitude.children = attitude.children.filter((child, i) => {
      var childName = child.type.name;

      if (typeof childName != 'undefined' && childName.toLowerCase() == 'container'){
        var localChildVisibility = {
          name: child.props.name || child.props.title.toLowerCase().replace(/ /ig, '-')
        };

        if ((typeof child.props.active != 'undefined') && child.props.active){
          localChildVisibility.value = true;
        }else{
          localChildVisibility.value = false;
        }

        localChildrenVisibility.push(localChildVisibility);

        return child;
      }
    });

    if (localChildrenVisibility.length > 0 && (props.segment.childrenVisibility.every(child => localChildrenVisibility.includes(child)))){
      props.setChildrenVisibility(localChildrenVisibility);
    }
  }

  if (typeof props.key != 'undefined'){
    attitude.key = props.key;
  }else{
    if (typeof props.name != 'undefined'){
      attitude.key = props.name;
    }else{
      const today = new Date(),
            randomToken = Math.random();

      attitude.key = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());
    }
  }

  if ((typeof props.name != 'undefined') || (typeof props.title != 'undefined')){
    attitude.name = props.name || props.title;
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

  const { children } = attitude,
        { childrenVisibility } = props.segment;

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
              childrenVisibility.map((child, i) => {
                var childTitle = children[i].props.title || child.name.replace(/-/ig, ' ');

                if (typeof childTitle != 'undefined'){
                  var disableSegmentStyle = {};

                  if ((i % 2) == 0){
                    disableSegmentStyle.marginRight = 15;
                  }else{
                    disableSegmentStyle.marginLeft = 15;
                  }

                  if (!child.value){
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
                          var localChildrenVisibility = childrenVisibility.map((singleChild, j) => {
                            if (singleChild.value){
                              singleChild.value = false;
                            }else if (singleChild.name == child.name){
                              singleChild.value = true;
                            }

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
        <View
          key="contents"
          style={Styles.DualSegmentContents}>
            {
              children.map((child, i, children) => {
                var childProps = {...child.props};

                var childStyle = [
                  child.props.style
                ];

                const today = new Date(),
                      randomToken = Math.random();

                const ultimateKey = parseInt(today.getTime().toString() + (randomToken * Math.pow(10, randomToken.toString().length - 2)).toString());

                childProps.key = childProps.name || ultimateKey;
                childProps.style = childStyle;

                if (typeof childrenVisibility[i] != 'undefined'){
                  childProps.active = props.segment.childrenVisibility[i].value;
                }

                return React.cloneElement(child, childProps);
              })
            }
        </View>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    segment: state.Segment
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setChildrenVisibility: (childrenVisibility) => {
      dispatch({
        type: SEGMENT.SET_CHILDREN_VISIBILITY,
        payload: childrenVisibility
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Segment);
