import React, { Component } from 'react';

import { connect } from 'react-redux';

import { TopBar } from './container/layouts/pilot/top-bar';
import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.Pilot;

import { Functions } from '../modules/index';

import { Layouts as LayoutsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.Pilot;

const Pilot = (props) => {
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

              if (childName === 'PinnedSide' && childProps.type.toLowerCase() === 'bottom' && (typeof childProps.children == 'undefined')){
                const _ACHIEVED_TAB_ITEMS = childProps.data || childProps.items || [],
                      _TAB_ITEMS = _ACHIEVED_TAB_ITEMS.map((itemText, i) => {
                        return itemText.toLowerCase().replace(/( |_)/ig, '-');
                      }),
                      _ACHIEVED_CURRENT_TAB = (childProps.current || childProps.currentItem || childProps.current_item || ''),
                      _CURRENT_TAB = _ACHIEVED_CURRENT_TAB.toLowerCase().replace(/( |_)/ig, '-');

                if (!_TAB_ITEMS.every(item => props.pilot.tabs.includes(item))){
                  props.setTabs(_TAB_ITEMS);
                }

                if (props.pilot.currentTab != _CURRENT_TAB){
                  if (_CURRENT_TAB != ''){
                    props.setCurrentTab(_CURRENT_TAB);
                  }else{
                    if (props.pilot.tabs.length > 0){
                      props.setCurrentTab(props.pilot.tabs[0]);
                    }
                  }
                }
              }

              childProps.key = childProps.name || ultimateKey;
              childProps.style = childStyle;

              return React.cloneElement(child, childProps);
            })
          }
      </TopBar>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pilot);
