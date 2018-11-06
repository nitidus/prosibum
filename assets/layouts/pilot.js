import React, { Component } from 'react';

import { TopBar } from './container/layouts/pilot/top-bar';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Pilot;

import { Functions } from '../modules/index';

export const Pilot = (props) => {
  var attitude = {};

  attitude.type = props.type || props.title || props.name || props.id || props._id || props.token || props.navigation_type || props.navType || props.NavType || props.nav_type || props.navigationType || props.NavigationType || 'Title';

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if (attitude.type != 'undefined'){
    return (
      <TopBar
        title={attitude.type}
        {...props}>
          {
            attitude.children.map((child, i) => {
              var childName = child.type.name,
                  childProps = {...child.props},
                  childStyle = [
                    Styles.PinnedSide,
                    childProps.style
                  ];

              const ultimateKey = Functions._generateNewUniqueObjectKey();

              childProps.key = childProps.name || ultimateKey;
              childProps.style = childStyle;

              return React.cloneElement(child, childProps);
            })
          }
      </TopBar>
    );
  }
}
