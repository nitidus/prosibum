import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import { connect } from 'react-redux';

import { Input, Link } from '../components/index';

import { Global, Modules } from '../styles/index';
const Styles = Modules.Layouts.List;

import { Layouts as LayoutsActions } from '../../assets/flows/states/actions';
const { mapStateToProps, mapDispatchToProps } = LayoutsActions.List;

import { Functions } from '../modules/index';

import { layouts_constants } from '../flows/knowledge/index';
const __CONSTANTS = layouts_constants.list;

const _restructureTheDataSource = (dataSource) => {
        return dataSource.map((item, i, totalItems) => {
          var _RESPONSE = item,
              _CHILDREN = totalItems;

          if (typeof _RESPONSE.ancestors != 'undefined'){
            _RESPONSE.depth = _RESPONSE.ancestors.length;
          }else{
            _RESPONSE.depth = 0;
          }

          _CHILDREN = _CHILDREN.filter((child, j) => {
            if (typeof child.ancestors != 'undefined'){
              const _CHILD_DEPTH = child.ancestors.length;

              if (
                ((_RESPONSE.depth + 1) === _CHILD_DEPTH) &&
                child.ancestors.includes(_RESPONSE._id)
              ){
                return child;
              }
            }
          });

          if (_CHILDREN.length > 0){
            _RESPONSE.children = _CHILDREN.map((child, j) => {
              return child._id;
            });
          }

          _RESPONSE.color = _RESPONSE.color || Styles.RowSelectedState.backgroundColor;

          return _RESPONSE;
        });
      };

const List = (props) => {
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

  if ((typeof props.dataSource != 'undefined') || (typeof props.data_source != 'undefined') || (typeof props.source != 'undefined') || (typeof props.data != 'undefined') || (typeof props.items != 'undefined')){
    attitude.dataSource = props.dataSource || props.data_source || props.source || props.data || props.items;
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

  if ((typeof props.onLayout != 'undefined') || (typeof props.onRowLayout != 'undefined')){
    const _ON_LAYOUT = props.onLayout || props.onRowLayout;

    attitude.onLayout = _ON_LAYOUT;
  }

  if ((typeof props.onPress != 'undefined') || (typeof props.onRowPress != 'undefined') || (typeof props.rowOnPress != 'undefined')){
    attitude.onPress = props.onPress || props.onRowPress || props.rowOnPress;
  }

  const _DATA_SOURCE = _restructureTheDataSource(attitude.dataSource);

  if ((props.list.dataSource.length === 0) && (Object.keys(props.list.selectedRow.new).length === 0)){
    if (_DATA_SOURCE.length > 0){
      props.setDataSource(_DATA_SOURCE);
    }
  }else{
    if (_DATA_SOURCE.length === 0){
      props.resetList();
    }
  }

  const _SELECTED_ROW = props.list.selectedRow,
        _PREV_SELECTED_ROW = _SELECTED_ROW.previous,
        _NEW_SELECTED_ROW = _SELECTED_ROW.new,
        _TARGET_LEAF = props.list.targetLeaf,
        _PREV_TARGET_LEAF = _TARGET_LEAF.previous,
        _NEW_TARGET_LEAF = _TARGET_LEAF.new;

  if (_DATA_SOURCE.length > 0){
    return (
      <ScrollView
        contentContainerStyle={[
          Styles.Container,
          attitude.style
        ]}
        showsVerticalScrollIndicator={false}>
          {
            props.list.dataSource.map((item, i, totalItems) => {
              var _DEPTH = props.list.currentDepth,
                  _TOTAL_VISIBLE_ITEMS_TOKEN = totalItems.filter((visibilityCheckItem, j) => {
                    const _CURRENT_ITEM_DEPTH = (typeof visibilityCheckItem.depth != 'undefined')? visibilityCheckItem.depth: ((typeof visibilityCheckItem.ancestors != 'undefined')? visibilityCheckItem.ancestors.length: 0);

                    return (_DEPTH === _CURRENT_ITEM_DEPTH);
                  })
                  .map((reducedFeaturesItem, j) => {
                    return reducedFeaturesItem._id;
                  }),
                  _ROW_EXTRA_CONTENT;

              if (Object.keys(_NEW_SELECTED_ROW).length > 0){
                if (typeof _NEW_SELECTED_ROW.children != 'undefined'){
                  if (_NEW_SELECTED_ROW.children.every(child => _TOTAL_VISIBLE_ITEMS_TOKEN.includes(child))){
                    if ((_TOTAL_VISIBLE_ITEMS_TOKEN.includes(item._id)) && (item.ancestors.includes(_NEW_SELECTED_ROW._id))){
                      const _TOTAL_VISIBLE_ITEMS  = totalItems.filter((depthCheckItem, j) => {
                        return _NEW_SELECTED_ROW.children.includes(depthCheckItem._id);
                      });

                      return (
                        <View
                          key={Functions._generateNewUniqueObjectKey()}>
                            <Input
                              type={__CONSTANTS.row.type}
                              style={Styles.Row}
                              onPress={() => {
                                var _DETECTED_PARENT = {},
                                    _DETECTED_PARENT_LEAF = {};

                                if (typeof item.ancestors != 'undefined'){
                                  if (item.ancestors.length > 1){
                                    const _LAST_ANCESTOR_WITH_NAME_PARENT_INDEX = item.ancestors.length - 2,
                                          _DEEP_LAST_ANCESTOR_WITH_NAME_PARENT_INDEX = item.ancestors.length - 1,
                                          _LAST_ANCESTOR_WITH_NAME_PARENT = item.ancestors[_LAST_ANCESTOR_WITH_NAME_PARENT_INDEX],
                                          _DEEP_LAST_ANCESTOR_WITH_NAME_PARENT = item.ancestors[_DEEP_LAST_ANCESTOR_WITH_NAME_PARENT_INDEX],
                                          _FOUNDED_PARENT_INDEX = totalItems.findIndex((findParentItem, j) => {
                                            return (findParentItem._id === _LAST_ANCESTOR_WITH_NAME_PARENT);
                                          }),
                                          _FOUNDED_DEEP_PARENT_INDEX = totalItems.findIndex((findDeepParentItem, j) => {
                                            return (findDeepParentItem._id === _DEEP_LAST_ANCESTOR_WITH_NAME_PARENT);
                                          });

                                    _DETECTED_PARENT = totalItems[_FOUNDED_PARENT_INDEX];
                                    _DETECTED_PARENT_LEAF = totalItems[_FOUNDED_DEEP_PARENT_INDEX];
                                  }else{
                                    const _FOUNDED_PARENT_INDEX = totalItems.findIndex((findParentItem, j) => {
                                      return (findParentItem._id === item.ancestors[0]);
                                    });

                                    _DETECTED_PARENT_LEAF = totalItems[_FOUNDED_PARENT_INDEX];
                                  }
                                }

                                props.setSelectedRow({
                                  previous: props.list.selectedRow.new,
                                  new: _DETECTED_PARENT
                                });

                                if (Object.keys(_DETECTED_PARENT_LEAF).length > 0){
                                  props.setTargetLeaf({
                                    previous: props.list.targetLeaf.new,
                                    new: _DETECTED_PARENT_LEAF
                                  });

                                  attitude.onPress(_DETECTED_PARENT_LEAF);
                                }

                                props.setCurrentDepth(_DEPTH - 1);
                              }}>
                                <Text
                                  style={[
                                    Styles.DefaultTextStyle
                                  ]}>
                                    {`←`}
                                </Text>
                            </Input>

                            {
                              _TOTAL_VISIBLE_ITEMS.map((nestedItem, j) => {
                                var _CUSTOM_STYLE = [
                                  Styles.Row
                                ],
                                _CUSTOM_TEXT_STYLE = [
                                  Styles.DefaultTextStyle
                                ];

                                if (typeof attitude.onLayout != 'undefined'){
                                  const _ON_ROW_EXTRA_CONTENT = (color) => attitude.onLayout(color);

                                  _ROW_EXTRA_CONTENT = _ON_ROW_EXTRA_CONTENT(Functions._refactorColor(nestedItem.color, (nestedItem.depth * (-1 * 30))));
                                }

                                if (typeof _NEW_TARGET_LEAF != 'undefined'){
                                  if (_NEW_TARGET_LEAF._id === nestedItem._id){
                                    const _NESTED_ITEM_DEPTH = (typeof nestedItem.depth != 'undefined')? nestedItem.depth: ((typeof nestedItem.ancestors != 'undefined')? nestedItem.ancestors.length: 0);

                                    _CUSTOM_STYLE.push({
                                      ...Styles.RowSelectedState,
                                      backgroundColor: Functions._refactorColor(nestedItem.color, (nestedItem.depth * (-1 * 30)))
                                    });

                                    if (typeof attitude.onLayout != 'undefined'){
                                      const _ON_ROW_EXTRA_CONTENT = (color) => attitude.onLayout(color);

                                      _ROW_EXTRA_CONTENT = _ON_ROW_EXTRA_CONTENT(Styles.RowTextSelectedState.color);
                                    }

                                    _CUSTOM_TEXT_STYLE.push({
                                      ...Styles.RowTextSelectedState
                                    });
                                  }
                                }

                                if (typeof nestedItem.children != 'undefined'){
                                  return (
                                    <Input
                                      type={__CONSTANTS.row.type}
                                      key={Functions._generateNewUniqueObjectKey()}
                                      style={_CUSTOM_STYLE}
                                      onPress={() => {
                                        props.setSelectedRow({
                                          previous: props.list.selectedRow.new,
                                          new: nestedItem
                                        });

                                        props.setCurrentDepth(_DEPTH + 1);

                                        props.setTargetLeaf({
                                          previous: props.list.targetLeaf.new,
                                          new: nestedItem
                                        });

                                        attitude.onPress(nestedItem);
                                      }}
                                      onLongPress={() => {
                                        if (nestedItem._id !== props.list.targetLeaf.new._id){
                                          props.setTargetLeaf({
                                            previous: props.list.targetLeaf.new,
                                            new: nestedItem
                                          });

                                          attitude.onPress(nestedItem);
                                        }else{
                                          props.setTargetNewLeaf(props.list.targetLeaf.previous);

                                          attitude.onPress(props.list.targetLeaf.previous);
                                        }
                                      }}>
                                        {_ROW_EXTRA_CONTENT}

                                        <Text
                                          style={_CUSTOM_TEXT_STYLE}>
                                            {nestedItem.key}
                                        </Text>
                                    </Input>
                                  );
                                }else{
                                  return (
                                    <Input
                                      type={__CONSTANTS.row.type}
                                      key={Functions._generateNewUniqueObjectKey()}
                                      style={_CUSTOM_STYLE}
                                      onPress={() => {
                                        if (nestedItem._id !== props.list.targetLeaf.new._id){
                                          props.setTargetLeaf({
                                            previous: props.list.targetLeaf.new,
                                            new: nestedItem
                                          });

                                          attitude.onPress(nestedItem);
                                        }else{
                                          props.setTargetNewLeaf(props.list.targetLeaf.previous);

                                          attitude.onPress(props.list.targetLeaf.previous);
                                        }
                                      }}
                                      onLongPress={() => {
                                        if (nestedItem._id !== props.list.targetLeaf.new._id){
                                          props.setTargetLeaf({
                                            previous: props.list.targetLeaf.new,
                                            new: nestedItem
                                          });

                                          attitude.onPress(nestedItem);
                                        }else{
                                          props.setTargetNewLeaf(props.list.targetLeaf.previous);

                                          attitude.onPress(props.list.targetLeaf.previous);
                                        }
                                      }}>
                                        {_ROW_EXTRA_CONTENT}

                                        <Text
                                          style={_CUSTOM_TEXT_STYLE}>
                                            {nestedItem.key}
                                        </Text>
                                    </Input>
                                  );
                                }
                              })
                            }
                        </View>
                      );
                    }
                  }
                }
              }else{
                if (_TOTAL_VISIBLE_ITEMS_TOKEN.includes(item._id)){
                  var _CUSTOM_STYLE = [
                    Styles.Row
                  ],
                  _CUSTOM_TEXT_STYLE = [
                    Styles.DefaultTextStyle
                  ];

                  if (typeof attitude.onLayout != 'undefined'){
                    const _ON_ROW_EXTRA_CONTENT = (color) => attitude.onLayout(color);

                    _ROW_EXTRA_CONTENT = _ON_ROW_EXTRA_CONTENT(Functions._refactorColor(item.color, (item.depth * (-1 * 30))));
                  }

                  if (typeof _NEW_TARGET_LEAF != 'undefined'){
                    if (_NEW_TARGET_LEAF._id === item._id){
                      const _NESTED_ITEM_DEPTH = (typeof item.depth != 'undefined')? item.depth: ((typeof item.ancestors != 'undefined')? item.ancestors.length: 0);

                      _CUSTOM_STYLE.push({
                        ...Styles.RowSelectedState,
                        backgroundColor: Functions._refactorColor(item.color, (item.depth * (-1 * 30)))
                      });

                      if (typeof attitude.onLayout != 'undefined'){
                        const _ON_ROW_EXTRA_CONTENT = (color) => attitude.onLayout(color);

                        _ROW_EXTRA_CONTENT = _ON_ROW_EXTRA_CONTENT(Styles.RowTextSelectedState.color);
                      }

                      _CUSTOM_TEXT_STYLE.push({
                        ...Styles.RowTextSelectedState
                      });
                    }
                  }

                  if (typeof item.children != 'undefined'){
                    return (
                      <Input
                        type={__CONSTANTS.row.type}
                        key={Functions._generateNewUniqueObjectKey()}
                        style={_CUSTOM_STYLE}
                        onPress={() => {
                          props.setSelectedRow({
                            previous: props.list.selectedRow.new,
                            new: item
                          });

                          props.setCurrentDepth(_DEPTH + 1);

                          props.setTargetLeaf({
                            previous: props.list.targetLeaf.new,
                            new: item
                          });

                          attitude.onPress(item);
                        }}
                        onLongPress={() => {
                          if (item._id !== props.list.targetLeaf.new._id){
                            props.setTargetLeaf({
                              previous: props.list.targetLeaf.new,
                              new: item
                            });

                            attitude.onPress(item);
                          }else{
                            props.setTargetNewLeaf(props.list.targetLeaf.previous);

                            attitude.onPress(props.list.targetLeaf.previous);
                          }
                        }}>
                          {_ROW_EXTRA_CONTENT}

                          <Text
                            style={_CUSTOM_TEXT_STYLE}>
                              {item.key}
                          </Text>
                      </Input>
                    );
                  }else{
                    return (
                      <Input
                        type={__CONSTANTS.row.type}
                        key={Functions._generateNewUniqueObjectKey()}
                        style={_CUSTOM_STYLE}
                        onPress={() => {
                          if (item._id !== props.list.targetLeaf.new._id){
                            props.setTargetLeaf({
                              previous: props.list.targetLeaf.new,
                              new: item
                            });

                            attitude.onPress(item);
                          }else{
                            const _ROOT_ITEM_DEPTH = (typeof item.depth != 'undefined')? item.depth: ((typeof item.ancestors != 'undefined')? item.ancestors.length: 0);

                            if (_ROOT_ITEM_DEPTH > 0){
                              props.setTargetNewLeaf(props.list.targetLeaf.previous);

                              attitude.onPress(props.list.targetLeaf.previous);
                            }else{
                              props.setTargetNewLeaf({});

                              attitude.onPress({});
                            }
                          }
                        }}
                        onLongPress={() => {
                          if (item._id !== props.list.targetLeaf.new._id){
                            props.setTargetLeaf({
                              previous: props.list.targetLeaf.new,
                              new: item
                            });

                            attitude.onPress(item);
                          }else{
                            const _ROOT_ITEM_DEPTH = (typeof item.depth != 'undefined')? item.depth: ((typeof item.ancestors != 'undefined')? item.ancestors.length: 0);

                            if (_ROOT_ITEM_DEPTH > 0){
                              props.setTargetNewLeaf(props.list.targetLeaf.previous);

                              attitude.onPress(props.list.targetLeaf.previous);
                            }else{
                              props.setTargetNewLeaf({});

                              attitude.onPress({});
                            }
                          }
                        }}>
                          {_ROW_EXTRA_CONTENT}

                          <Text
                            style={_CUSTOM_TEXT_STYLE}>
                              {item.key}
                          </Text>
                      </Input>
                    );
                  }
                }
              }
            })
          }
      </ScrollView>
    );
  }else{
    return (
      <Link
        containerStyle={[
          Styles.Center_ContentAlignment,
          Styles.EmptyContent
        ]}
        style={Styles.Center_TextAlignment}
        value="There's no item in the list." />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
