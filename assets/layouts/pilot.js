import React, { Component } from 'react';

import { TopBar } from './container/layouts/pilot/top-bar';
import { TabBar } from './container/layouts/pilot/tab-bar';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Pilot;

import { Functions } from '../modules/index';

export const Pilot = (props) => {
  var attitude = {};

  attitude.type = props.type || props.title || props.name || props.id || props._id || props.token || props.navigation_type || props.navType || props.NavType || props.nav_type || props.navigationType || props.NavigationType || 'Title';

  attitude.layout = props.layout || props.layout_name || props.layoutName || props.layout_Type || props.layoutType || 'TOP_BAR';

  if (typeof props.children != 'undefined'){
    attitude.children = [];

    if (Array.isArray(props.children)){
      attitude.children = attitude.children.concat(props.children);
    }else{
      attitude.children.push(props.children);
    }
  }

  if (attitude.type != 'undefined'){
    const _LAYOUT_TYPE = Functions._convertTokenToKey(attitude.layout);

    var Bar = TopBar,
        _CONTENT;

    switch (_LAYOUT_TYPE) {
      case 'TOP_BAR':
      case 'TOP':
      case 'NAV':
      case 'NAV_BAR':
      default:
        Bar = TopBar;
        break;

      case 'TAB_BAR':
      case 'TAB':
      case 'TABS':
        Bar = TabBar;
        break;
    }

    if (typeof attitude.children != 'undefined'){
      if (attitude.children.length > 0){
        _CONTENT = attitude.children.map((child, i) => {
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
        });
      }
    }

    return (
      <Bar
        title={attitude.type}
        {...props}>
          {_CONTENT}
      </Bar>
    );
  }
}
