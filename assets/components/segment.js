import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Animated, TouchableOpacity, Text, Easing } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Input } from './input';
import { Global, Modules } from '../styles/index';

const Styles = Modules.Components.Segment;

class Segment extends Component<{}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(props) {

  }

  componentWillMount() {
    const { props } = this;

    this._componentWillInitialize(props);
  }

  _componentWillInitialize(props) {
    var localState = {
      children: [],
      childrenVisibility: []
    };

    if (typeof props.children != 'undefined'){
      if (Array.isArray(props.children)){
        localState.children = localState.children.concat(props.children);
      }else{
        localState.children.push(props.children);
      }

      localState.children = localState.children.filter((child, i) => {
        var childDisplayName = child.type.displayName;

        if (typeof childDisplayName != 'undefined' && childDisplayName.toLowerCase() == 'container'){
          var localChildrenVisibility = {
            name: child.props.name || child.props.title.toLowerCase().replace(/ /ig, '-')
          };

          if ((typeof child.props.active != 'undefined') && child.props.active){
            localChildrenVisibility.value = true;
          }else{
            localChildrenVisibility.value = false;
          }

          localState.childrenVisibility.push(localChildrenVisibility);

          return child;
        }
      });
    }

    if (typeof props.style != 'undefined'){
      localState.style = props.style;

      if (typeof localState.style == 'object' && Array.isArray(localState.style)){
        localState.style = localState.style.reduce((total, item) => {
          return {
            ...total,
            ...item
          };
        })
      }
    }else{
      localState.style = {};
    }

    this.setState(localState);
  }

  render() {
    const { state } = this,
          { children, childrenVisibility } = state;

    return (
      <View
        name={state.name}
        style={[
          Styles.DualSegmentContainer,
          state.style
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

                            this.setState({
                              childrenVisibility: localChildrenVisibility
                            });
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
                            <TouchableOpacity
                              onPress={state.onPress}>
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
                  var childStyle = [
                    child.props.style
                  ];

                  var childProps = {
                    key: (childrenVisibility[i].name),
                    name: childrenVisibility[i].name,
                    active: childrenVisibility[i].value,
                    style: childStyle
                  };

                  if (child.props.title){
                    childProps.title = child.props.title;
                  }

                  return React.cloneElement(child, childProps);
                })
              }
          </View>
      </View>
    )
  }
}

Segment.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object)
  ])
};

export default Segment;
