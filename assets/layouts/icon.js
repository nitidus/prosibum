import React, { Component } from 'react';

import { View, Dimensions, Platform, Animated, Easing } from 'react-native';
import Svg, { G, Path, Rect, Circle, Ellipse, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg'

import { Global } from '../styles/index';

import { Functions } from '../modules/index';

const { width, height } = Dimensions.get('window'),
      _IS_IPHONE_X = (Platform.OS === 'ios') && ((height === 812 || width === 812));

const _getIconWithName = (name, color = Global.colors.single.rangoonGreen) => {
  const _PRIMARY_UI_ICONS = {
          _SIDE_GUIDE: {
            width: 48,
            height: 32,
            view_box: "0 0 48 32",
            content: <G
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd">
                <Rect
                  fillOpacity="0.3"
                  fill={Global.colors.single.carminePink}
                  x="0"
                  y="0"
                  width="48"
                  height="32">
                </Rect>
                <Rect
                  fill={Global.colors.single.carminePink}
                  opacity="0.3"
                  x="10"
                  y="2"
                  width="28"
                  height="28">
                </Rect>
                <Path
                  d="M10,2 L38,2 L38,30 L10,30 L10,2 Z M11.5,3.5 L11.5,28.5 L36.5,28.5 L36.5,3.5 L11.5,3.5 Z"
                  fill={Global.colors.single.carminePink}
                  opacity="0.3">
                </Path>
            </G>
          },
          INDICATOR: {
            width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 46.2: 33): 33,
            height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 7: 5): 5,
            view_box: "0 0 33 5",
            content: <Path
              fill={color}
              d="M30.5,0h-28C1.1,0,0,1.1,0,2.5S1.1,5,2.5,5h28C31.9,5,33,3.9,33,2.5S31.9,0,30.5,0z"/>
          },
          BAR: {
            width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 24): 24,
            height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 17.333): 13,
            view_box: "0 0 24 13",
            content: <Path
              fill={color}
              d="M2,0h20c1.1,0,2,0.9,2,2s-0.9,2-2,2H2C0.9,4,0,3.1,0,2S0.9,0,2,0z M2,9h20c1.1,0,2,0.9,2,2s-0.9,2-2,2H2c-1.1,0-2-0.9-2-2S0.9,9,2,9z"/>
          },
          CHECK: {
            width: 34,
            height: 23,
            view_box: "0 0 24 19",
            content: <Path
              fill={color}
              d="M23.6,0.5C23.6,0.4,23.6,0.4,23.6,0.5c-0.6-0.6-1.6-0.6-2.2,0L6.7,15c-0.1,0.1-0.3,0.1-0.5,0l-3.6-3.6c-0.6-0.6-1.5-0.6-2.1,0c-0.6,0.6-0.6,1.5,0,2.1c0,0,0,0,0,0l5.3,5.2c0.4,0.4,1,0.4,1.4,0L23.6,2.5C24.1,2,24.1,1,23.6,0.5z"/>
          },
          ARROW_LEFT: {
            width: 15.1,
            height: 25,
            view_box: "0 0 15.1 25",
            content: <Path
              fill={color}
              d="M4.5,12.5l10-9.5c0.7-0.7,0.7-1.8,0-2.5s-1.9-0.7-2.7,0L0.5,11.2c-0.7,0.7-0.7,1.8,0,2.5l11.2,10.7c0.7,0.7,1.9,0.7,2.7,0s0.7-1.8,0-2.5L4.5,12.5z"/>
          },
          ARROW_RIGHT: {
            width: 15.1,
            height: 25,
            view_box: "0 0 15.1 25",
            content: <Path
              fill={color}
              d="M10.5,12.4l-10,9.5c-0.7,0.7-0.7,1.8,0,2.5c0.7,0.7,1.9,0.7,2.7,0l11.3-10.7c0.7-0.7,0.7-1.8,0-2.5L3.3,0.5c-0.7-0.7-1.9-0.7-2.7,0s-0.7,1.8,0,2.5L10.5,12.4z"/>
          },
          PLUS: {
            width: 24,
            height: 24,
            view_box: "0 0 24 24",
            content: <Path
              fill={color}
              d="M22,10h-8V2c0-1.1-0.9-2-2-2s-2,0.9-2,2v8H2c-1.1,0-2,0.9-2,2s0.9,2,2,2h8v8c0,1.1,0.9,2,2,2s2-0.9,2-2v-8h8c1.1,0,2-0.9,2-2S23.1,10,22,10z"/>
          }
        },
        _SECONDARY_UI_ICONS = {
          FOR_YOU: {
            width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 24): 24,
            height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 32: 24): 24,
            view_box: "0 0 24 24",
            content: <Path
              fill={color}
              d="M1.7,0h20.7C23.3,0,24,0.7,24,1.7v20.7c0,0.9-0.7,1.7-1.7,1.7H1.7C0.7,24,0,23.3,0,22.3V1.7C0,0.7,0.7,0,1.7,0zM3,13v1h8v-1H3z M13,13v1h8v-1H13z M13,10v1h8v-1H13z M13,7v1h8V7H13z M13,4v1h8V4H13z M3,16v1h8v-1H3z M13,16v1h8v-1H13z M3,19v1h8v-1H3z M13,19v1h8v-1H13z M7,5.3c-0.4-0.6-1.1-1-1.8-1c-1,0-1.9,0.9-1.9,2C3.2,7.7,4.4,9.3,7,11c2.6-1.7,3.8-3.3,3.7-4.7h0c0-1.1-0.9-2-1.9-2C8.1,4.3,7.4,4.7,7,5.3z"/>
          },
          PERSON: {
            width: 23,
            height: 23,
            view_box: "0 0 23 23",
            content: <Path
              fill={color}
              d="M20.3,17.9c-1.5-0.9-3.1-0.7-4.5-1.3c-0.3-0.1-0.5-0.3-0.8-0.5c-0.6-0.5-0.8-1-0.9-1.6c1.3-1.1,1.6-3,2-4.6c0.3-0.2,0.5-0.6,0.5-1v-1c0-0.3-0.1-0.7-0.4-0.9c0.1-0.9,0.1-1.8,0.1-2.2c0-2.7-2.1-4.9-4.8-4.9c-1.3,0-3.2,1.2-3.2,2C7.3,2,6.8,3.5,6.8,4.9c0,0.4,0,1.3,0.1,2.2C6.6,7.3,6.5,7.6,6.5,7.9v1c0,0.4,0.2,0.8,0.5,1c1,1.6,0.9,3.5,2,4.6c-0.1,0.6-0.4,1.1-0.9,1.6c0,0,0,0,0,0h0c-0.2,0.2-0.5,0.3-0.8,0.5c-1.4,0.6-3.1,0.4-4.5,1.3C1,18.9,0.5,20,0,23h23C22.5,20,22,18.9,20.3,17.9z"/>
          },
          ROLES: {
            width: 34,
            height: 23,
            view_box: "0 0 34 23",
            content: <G>
              <Path
                fill={color}
                d="M14.2,17.3c0.6-0.3,1.2-0.5,1.8-0.7c-0.3-0.1-0.7-0.3-1-0.5c-0.6-0.5-0.8-1-0.9-1.6c1.3-1.1,1.6-3,2-4.6c0.3-0.2,0.5-0.6,0.5-1v-1c0-0.3-0.1-0.7-0.4-0.9c0.1-0.9,0.1-1.8,0.1-2.2c0-2.7-2.1-4.9-4.8-4.9c-1.3,0-3.2,1.2-3.2,2C7.3,2,6.8,3.5,6.8,4.9c0,0.4,0,1.3,0.1,2.2C6.6,7.3,6.5,7.6,6.5,7.9v1c0,0.4,0.2,0.8,0.5,1c1,1.6,0.9,3.5,2,4.6c-0.1,0.6-0.4,1.1-0.9,1.6c-1.5,1.2-3.6,0.7-5.3,1.8C1,18.9,0.5,20,0,23h10.7l0-0.3C11.3,19.2,12.8,18.1,14.2,17.3z"/>
              <Path
                fill={color}
                d="M31.5,18.9c-1.7-1-3.6-0.6-5-1.8c-0.8-0.6-0.9-1.4-1-2.2c2-0.3,3.2-0.9,3.8-1.3c0.3-0.2,0.4-0.5,0.2-0.8l-1.2-3c-0.2-0.6-0.3-1.2-0.3-1.8C28.1,5.8,27.9,0,23.3,1c-0.2,0-0.4,0.1-0.5,0.2L22,1.5c0,0-0.5-0.3-1.5-0.3s-2.2,1.3-2.2,4.3v2.8c0,0.3,0,0.7-0.1,1l-0.8,3.5c-0.1,0.3,0,0.5,0.2,0.7c0.5,0.4,1.5,1,3.4,1.3c-0.1,0.8-0.2,1.6-1,2.2c-1.4,1.2-3.3,0.8-5,1.8c-0.9,0.5-2,1.1-2.5,4.1H34C33.5,20,32.4,19.4,31.5,18.9z"/>
            </G>
          },
          BOLT: {
            width: 14.2,
            height: 24,
            view_box: "0 0 14.2 24",
            content: <Path
              fill={color}
              d="M13.2,9.9H7.1L11,0.6c0.2-0.4-0.4-0.8-0.7-0.4L0.2,11.3c-0.5,0.6-0.1,1.6,0.7,1.6h6.2L2.7,23.6c-0.1,0.3,0.3,0.5,0.5,0.3l10.8-12.7C14.4,10.6,14,9.9,13.2,9.9z"/>
          },
          GALLERY: {
            width: 36.5,
            height: 32,
            view_box: "0 0 36.5 32",
            content: <G>
              <Path
                fill={color}
                d="M18.5,11.3c-2.1,0-3.7,1.7-3.7,3.7c0,2.1,1.7,3.7,3.7,3.7c2.1,0,3.7-1.7,3.7-3.7C22.2,13,20.5,11.3,18.5,11.3z"/>
              <Path
                fill={color}
                d="M33.3,2.8L9.1,0C8.2-0.1,7.2,0.2,6.5,0.8C5.8,1.3,5.3,2.2,5.2,3.1L4.8,6.7H3.4c-2,0-3.4,1.7-3.4,3.7v18.1c0,1.9,1.4,3.4,3.3,3.5c0,0,0.1,0,0.1,0h24.3c2,0,3.7-1.5,3.7-3.5v-0.7c0.6-0.1,1.2-0.4,1.7-0.7c0.7-0.6,1.2-1.5,1.3-2.4l2-18C36.7,4.8,35.3,3,33.3,2.8z M29.7,17.9L20,23.5c-0.8,0.5-1.9,0.4-2.6-0.2L12.5,19c-1.4-1.2-3.4-1.3-4.9-0.2L1.8,23V10.4c0-1,0.7-1.9,1.6-1.9h24.3c1,0,1.9,0.9,2,1.9V17.9z M34.7,6.5l-2.1,18c0,0.5-0.2,0.9-0.6,1.2c-0.2,0.2-0.6,0.3-0.6,0.4V10.4c-0.1-2-1.7-3.6-3.7-3.7H6.6L7,3.3C7,2.8,7.3,2.4,7.6,2.1C8,1.8,8.5,1.7,9,1.8l24.2,2.8C34.1,4.6,34.8,5.5,34.7,6.5C34.7,6.5,34.7,6.5,34.7,6.5z"/>
            </G>
          },
          MESSAGES: {
            width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 30: 24): 24,
            height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 26.6: 21.2): 21.2,
            view_box: "0 0 24 21.2",
            content: <Path
              fill={color}
              d="M12,0C5.4,0,0,4.2,0,10c0,3.7,2.4,6.7,5.7,8.4c-0.1,0.9-0.6,1.9-1.9,2.8C6.2,21.4,8,19.6,9,19.7s2,0.2,3,0.2c6.1,0,12-4.2,12-10C24,4.2,18.6,0,12,0z"/>
          },
          DASHBOARD: {
            width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 24.7: 19.6): 19.6,
            height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 30: 24): 24,
            view_box: "0 0 19.6 24",
            content: <G>
              <Path
                fill={color}
                d="M16,7.6H3.6C3.4,7.6,3.3,7.8,3.3,8v12.4c0,0.2,0.1,0.3,0.3,0.3H16c0.2,0,0.3-0.1,0.3-0.3V8C16.4,7.8,16.2,7.6,16,7.6z"/>
              <Path
                fill={color}
                d="M4,4.7h5.8c0.4,0,0.7-0.3,0.7-0.7s-0.3-0.7-0.7-0.7H4C3.6,3.3,3.3,3.6,3.3,4S3.6,4.7,4,4.7z"/>
              <Path
                fill={color}
                d="M19.4,1c-0.2-0.3-0.4-0.6-0.8-0.8S18,0,17.1,0H2.6C1.7,0,1.3,0.1,1,0.3S0.4,0.7,0.3,1S0,1.7,0,2.6v18.9c0,0.9,0.1,1.2,0.3,1.5s0.4,0.6,0.8,0.8S1.7,24,2.6,24h14.5c0.9,0,1.2-0.1,1.5-0.3s0.6-0.4,0.8-0.8c0.2-0.3,0.3-0.6,0.3-1.5V2.6C19.6,1.7,19.5,1.3,19.4,1z M18.2,20.8c0,0.6-0.1,0.8-0.2,1s-0.3,0.4-0.5,0.5s-0.4,0.2-1,0.2H3.2c-0.6,0-0.8-0.1-1-0.2s-0.4-0.3-0.5-0.5s-0.2-0.4-0.2-1V3.2c0-0.6,0.1-0.8,0.2-1s0.3-0.4,0.5-0.5s0.4-0.2,1-0.2h13.3c0.6,0,0.8,0.1,1,0.2s0.4,0.3,0.5,0.5s0.2,0.4,0.2,1V20.8z"/>
            </G>
          },
          PRODUCTS: {
            width: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 28: 21): 21,
            height: (Platform.OS !== 'ios')? ((width >= 1000 || height >= 1000)? 28.6: 21.5): 21.5,
            view_box: "0 0 21 21.5",
            content: <G>
              <Path
                fill={color}
                d="M0.6,5.6l6.5,3.1c2.2,1,4.7,1,6.8,0l6.5-3.1c0.8-0.4,0.7-1.4,0-1.8l-7.9-3.4c-1.3-0.5-2.7-0.5-4,0L0.6,3.8C-0.2,4.2-0.2,5.3,0.6,5.6z"/>
              <Path
                fill={color}
                d="M20.4,15.8L18.5,15l-4.6,2.2c-2.2,1-4.7,1-6.8,0L2.5,15l-1.9,0.8c-0.8,0.3-0.8,1.4,0,1.8l6.5,3.1c2.2,1,4.7,1,6.8,0l6.5-3.1C21.2,17.3,21.2,16.2,20.4,15.8z"/>
              <Path
                fill={color}
                d="M0.6,11.6l6.5,3.1c2.2,1,4.7,1,6.8,0l6.5-3.1c0.8-0.4,0.7-1.4,0-1.8L18.5,9l-4.6,2.2c-2.2,1-4.7,1-6.8,0L2.5,9L0.6,9.8C-0.2,10.2-0.2,11.3,0.6,11.6z"/>
            </G>
          },
          GRADING: {
            width: 21,
            height: 21.5,
            view_box: "0 0 21 21.5",
            content: <G>
              <Path
                fill={color}
                d="M20.4,15.8L18.5,15l-4.6,2.2c-2.2,1-4.7,1-6.8,0L2.5,15l-1.9,0.8c-0.8,0.3-0.8,1.4,0,1.8l6.5,3.1c2.2,1,4.7,1,6.8,0l6.5-3.1C21.2,17.3,21.2,16.2,20.4,15.8z"/>
              <Path
                fill={color}
                d="M0.6,5.6l6.5,3.1c2.2,1,4.7,1,6.8,0l6.5-3.1c0.8-0.4,0.7-1.4,0-1.8l-7.9-3.4c-1.3-0.5-2.7-0.5-4,0L0.6,3.8C-0.2,4.2-0.2,5.3,0.6,5.6z"/>
              <Path
                fill={color}
                d="M0.6,11.6l6.5,3.1c2.2,1,4.7,1,6.8,0l6.5-3.1c0.8-0.4,0.7-1.4,0-1.8L18.5,9l-4.6,2.2c-2.2,1-4.7,1-6.8,0L2.5,9L0.6,9.8C-0.2,10.2-0.2,11.3,0.6,11.6z"/>
            </G>
          },
          PAY: {
            width: 24,
            height: 24,
            view_box: "0 0 24 24",
            content: <Path
              fill={color}
              d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M12.2,11.3c1.3,0.3,3.3,0.7,3.3,2.6c0,1.3-1.1,2.4-2.6,2.6V18h-1.8v-1.5c-1.5-0.2-2.6-1.3-2.6-2.6h1.8c0,0.6,0.6,1.1,1.3,1.1h0.9c0.7,0,1.3-0.5,1.3-1.1c0-0.6-0.4-0.8-2-1.1c-1.3-0.3-3.3-0.7-3.3-2.6c0-1.3,1.1-2.4,2.6-2.6V6h1.8v1.5c1.5,0.2,2.6,1.3,2.6,2.6h-1.8c0-0.6-0.6-1.1-1.3-1.1h-0.9c-0.7,0-1.3,0.5-1.3,1.1C10.2,10.8,10.7,10.9,12.2,11.3z"/>
          },
          OUTPUT: {
            width: 19,
            height: 23,
            view_box: "0 0 19 23",
            content: <G>
            	<Path
                fill={color}
                d="M8.5,19.8l-2.8-2.5c-0.4-0.4-1-0.3-1.4,0.1c-0.4,0.4-0.3,1,0.1,1.4l4.5,4C9,22.9,9.3,23,9.5,23
            		s0.5-0.1,0.7-0.3l4.5-4c0.4-0.4,0.5-1,0.1-1.4c-0.4-0.4-1-0.4-1.4-0.1l-2.8,2.5V14h-2V19.8z"/>
            	<Path
                fill={color}
                d="M14.5,0h-4v0l-2,0h-4C2,0,0,2,0,4.5v5C0,12,2,14,4.5,14h4V6c0-0.5,0.5-1,1-1s1,0.5,1,1v8h4C17,14,19,12,19,9.5
            		v-5C19,2,17,0,14.5,0z"/>
            </G>
          },
          BOOKMARK: {
            width: 14,
            height: 24,
            view_box: "0 0 14 24",
            content: <Path
              fill={color}
              d="M13.7,1c-0.2-0.3-0.4-0.6-0.8-0.8S12.3,0,11.4,0H2.6C1.7,0,1.3,0.1,1,0.3S0.4,0.7,0.3,1S0,1.7,0,2.6V24l7-6l7,6V2.6C14,1.7,13.9,1.3,13.7,1z"/>
          }
        },
        _CREDIT_CARD_ICONS = {
          MASTERCARD: {
            width: 38.8,
            height: 33.6,
            view_box: "0 0 38.8 33.6",
            content: <G>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.mastercard.sorbus}
                d="M14.2,2.6h10.5v18.9H14.2V2.6z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.mastercard.cgRed}
                d="M14.8,12c0-3.8,1.8-7.2,4.6-9.4C17.4,1,14.8,0,12,0C5.4,0,0,5.4,0,12s5.4,12,12,12c2.8,0,5.4-1,7.4-2.6C16.6,19.2,14.8,15.8,14.8,12z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.mastercard.yellowSea}
                d="M38.8,12c0,6.6-5.4,12-12,12c-2.8,0-5.4-1-7.4-2.6c2.8-2.2,4.6-5.6,4.6-9.4s-1.8-7.3-4.6-9.4C21.5,1,24,0,26.8,0C33.5,0,38.8,5.4,38.8,12z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.mastercard.black}
                d="M5.6,33.5v-2.2c0-0.8-0.5-1.4-1.4-1.4c-0.5,0-0.9,0.1-1.2,0.6c-0.3-0.4-0.6-0.6-1.2-0.6c-0.4,0-0.8,0.1-1,0.5v-0.4H0v3.5h0.8v-2c0-0.6,0.3-0.9,0.9-0.9c0.5,0,0.8,0.3,0.8,0.9v2h0.8v-2c0-0.6,0.4-0.9,0.9-0.9c0.5,0,0.8,0.3,0.8,0.9v2L5.6,33.5L5.6,33.5zM17.1,29.9h-1.3v-1.1h-0.8v1.1h-0.7v0.7h0.7v1.6c0,0.8,0.3,1.3,1.2,1.3c0.3,0,0.7-0.1,1-0.3L17,32.6c-0.2,0.1-0.5,0.2-0.7,0.2c-0.4,0-0.5-0.2-0.5-0.6v-1.6h1.3L17.1,29.9L17.1,29.9z M23.7,29.8c-0.4,0-0.7,0.2-0.9,0.5v-0.4H22v3.5h0.8v-2c0-0.6,0.3-0.9,0.8-0.9c0.2,0,0.3,0,0.5,0.1l0.2-0.7C24.1,29.9,23.8,29.8,23.7,29.8z M13.8,30.2c-0.4-0.3-0.9-0.4-1.4-0.4c-0.9,0-1.5,0.4-1.5,1.1c0,0.6,0.4,0.9,1.2,1l0.4,0.1c0.4,0.1,0.6,0.2,0.6,0.4c0,0.3-0.3,0.4-0.8,0.4c-0.5,0-0.9-0.2-1.2-0.4l-0.4,0.6c0.4,0.3,1,0.5,1.5,0.5c1,0,1.6-0.5,1.6-1.2c0-0.6-0.5-0.9-1.2-1.1l-0.4-0.1c-0.3,0-0.6-0.1-0.6-0.4c0-0.3,0.3-0.4,0.7-0.4c0.5,0,0.9,0.2,1.1,0.3L13.8,30.2L13.8,30.2z M34.4,29.8c-0.4,0-0.7,0.2-0.9,0.5v-0.4h-0.8v3.5h0.8v-2c0-0.6,0.3-0.9,0.8-0.9c0.2,0,0.3,0,0.5,0.1l0.2-0.7C34.8,29.9,34.5,29.8,34.4,29.8z M24.5,31.7c0,1.1,0.8,1.9,1.9,1.9c0.5,0,0.9-0.1,1.3-0.4l-0.4-0.6c-0.3,0.2-0.6,0.3-0.9,0.3c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1c0.3,0,0.6,0.1,0.9,0.3l0.4-0.6c-0.4-0.3-0.7-0.4-1.3-0.4C25.2,29.8,24.5,30.6,24.5,31.7z M31.7,31.7v-1.8h-0.8v0.4c-0.3-0.3-0.6-0.5-1.1-0.5c-1,0-1.8,0.8-1.8,1.9s0.8,1.9,1.8,1.9c0.5,0,0.9-0.2,1.1-0.5v0.4h0.8V31.7z M28.8,31.7c0-0.6,0.4-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1s-0.4,1.1-1.1,1.1C29.2,32.8,28.8,32.3,28.8,31.7z M19.5,29.8c-1,0-1.8,0.8-1.8,1.9c0,1.1,0.8,1.9,1.8,1.9c0.5,0,1-0.1,1.4-0.5l-0.4-0.6c-0.3,0.2-0.7,0.4-1,0.4c-0.5,0-0.9-0.2-1.1-0.9h2.6c0-0.1,0-0.2,0-0.3C21.2,30.6,20.5,29.8,19.5,29.8z M19.5,30.5c0.5,0,0.8,0.3,0.9,0.9h-1.8C18.6,30.9,19,30.5,19.5,30.5z M38.8,31.7v-3.2h-0.8v1.8c-0.3-0.3-0.6-0.5-1.1-0.5c-1,0-1.8,0.8-1.8,1.9s0.8,1.9,1.8,1.9c0.5,0,0.9-0.2,1.1-0.5v0.4h0.8V31.7z M36,31.7c0-0.6,0.4-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1s-0.4,1.1-1.1,1.1C36.4,32.8,36,32.3,36,31.7z M10,31.7v-1.8H9.2v0.4c-0.3-0.3-0.6-0.5-1.1-0.5c-1,0-1.8,0.8-1.8,1.9s0.8,1.9,1.8,1.9c0.5,0,0.9-0.2,1.1-0.5v0.4H10V31.7z M7.1,31.7c0-0.6,0.4-1.1,1.1-1.1c0.6,0,1.1,0.5,1.1,1.1s-0.4,1.1-1.1,1.1C7.5,32.8,7.1,32.3,7.1,31.7z"/>
            </G>
          },
          VISA: {
            width: 56,
            height: 17.9,
            view_box: "0 0 56 17.9",
            content: <G>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.visa.romance}
                d="M52.3,0.3h-3.9c-0.9,0-1.6,0.5-1.9,1.3l-6.8,16.1h4.8l0.9-2.6h5.8l0.6,2.6H56L52.3,0.3z M46.8,11.5L49.1,5l1.4,6.5H46.8z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.visa.romance}
                d="M16.5,0.3l-4.7,11.8l-1.9-10C9.7,0.9,8.8,0.3,7.8,0.3H0.1L0,0.8c1.6,0.4,3.4,0.9,4.5,1.5c0.6,0.4,0.8,0.7,1,1.5l3.6,13.9H14l7.3-17.4H16.5z"/>
              <Polygon
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.visa.romance}
                points="23.2,0.3 19.5,17.7 24,17.7 27.7,0.3 	"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.visa.romance}
                d="M33.7,5.1c0-0.6,0.6-1.3,1.9-1.5c0.6,0,2.4-0.1,4.4,0.8l0.8-3.7c-1-0.3-2.5-0.7-4.2-0.7C32.1,0,29,2.4,29,5.7c0,2.5,2.2,3.9,4,4.7c1.8,0.9,2.4,1.4,2.3,2.2c0,1.2-1.4,1.7-2.7,1.7c-2.3,0-3.6-0.6-4.6-1.1L27.1,17c1.1,0.5,3,0.9,5,0.9c4.8,0,7.9-2.3,7.9-5.9C40,7.4,33.6,7.2,33.7,5.1z"/>
            </G>
          },
          AMERICAN_EXPRESS: {
            width: 48.1,
            height: 18.2,
            view_box: "0 0 48.1 18.2",
            content: <G>
            	<G>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.white}
                  d="M48.1,10.6l-29.3-0.1l-0.7,1l-0.7-1h-1.3h-3.2H9.6v7.7h7.6l0.9-1.2l0.8,1.2h4.7v-1.9H24c0.6,0,1.1-0.1,1.6-0.4v2.3h3.5v-0.7l0.5,0.7h14.9c1.7,0,3-1.2,3-2.9c0-0.8-0.2-1.4-0.7-1.9L48.1,10.6z"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.white}
                  d="M23.5,7.1l0.4,0.5h4.8V6.9c0.4,0.3,1.2,0.7,1.2,0.7h3.8l0.5-1.1h1.1l0.4,1.1h4.9V6.8L41,7.6h3.3V0h-3.5v0.7L40.4,0H37v1.8L36.2,0H31c-0.9,0-1.7,0.3-2.4,0.8V0H11.9l-0.4,1.1L11.2,0h-4v2.1L6.3,0h-3L0,7.6h3.8l0.5-1.1h1.1l0.4,1.1h17.7V7.1z"/>
            	</G>
            	<G>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M4.1,1.1L1.8,6.4h1.3l0.5-1.1h2.6l0.4,1.1h1.3L5.6,1.1H4.1z M4,4.3l0.5-1.2L4.9,2l0.4,1.1l0.5,1.2H4z"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M25.6,2.8c0-1-0.7-1.7-1.8-1.7H21v5.3h1.3V4.5h0.6l1.6,1.9H26l-1.8-2C25.1,4.2,25.6,3.6,25.6,2.8z M22.3,3.4V2.1l1.5,0.1c0.5,0,0.7,0.3,0.7,0.6c0,0.3-0.2,0.6-0.7,0.6H22.3z"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M30.9,6.4l0.5-1.1h-0.2c-0.9,0-1.4-0.6-1.4-1.5V3.7c0-0.9,0.5-1.5,1.4-1.5h1.3V1.1h-1.4c-1.6,0-2.5,1.1-2.5,2.6v0.1C28.5,5.4,29.4,6.4,30.9,6.4z"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="20.1,5.3 17.1,5.3 17.1,4.2 20,4.2 20,3.1 17.1,3.1 17.1,2.1 20.1,2.2 20.1,1.1 15.9,1.1 15.9,6.4 20.1,6.4 		"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="11.6,4.7 10.4,1.1 8.4,1.1 8.4,6.4 9.6,6.4 9.6,2.1 11,6.4 12.1,6.4 13.6,2.1 13.6,6.4 14.8,6.4 14.8,1.1 12.8,1.1 		"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M35.5,1.1H34l-2.3,5.3H33l0.5-1.1h2.6l0.4,1.1h1.3L35.5,1.1z M34,4.3l0.4-1.2L34.8,2l0.4,1.1l0.5,1.2H34z"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="27.6,4 27.6,1.2 26.4,1.2 26.4,3.9 26.4,6.4 27.6,6.4 		"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="39.4,2.8 39.6,3.2 41.7,6.4 43.2,6.4 43.2,1.1 42,1.1 42,4.6 41.7,4.1 39.8,1.1 38.2,1.1 38.2,6.4 39.4,6.4 		"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M44.6,13.9h-1.2c-0.3,0-0.5-0.2-0.5-0.5s0.2-0.5,0.5-0.5h2.3l0.5-1.1h-2.7c-1.1,0-1.8,0.7-1.8,1.6c0,1,0.6,1.5,1.6,1.5h1.2c0.3,0,0.5,0.2,0.5,0.5c0.1,0.4-0.1,0.6-0.4,0.6h-2.8v1.1h2.6c1.1,0,1.8-0.7,1.8-1.7S45.6,13.9,44.6,13.9z"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M38.5,12.9h2.3l0.5-1.1h-2.7c-1.1,0-1.8,0.7-1.8,1.6c0,1,0.6,1.5,1.6,1.5h1.2c0.3,0,0.5,0.2,0.5,0.5c0.2,0.4-0.2,0.6-0.5,0.6h-2.7v1.1h2.6c1.1,0,1.8-0.7,1.8-1.7s-0.6-1.5-1.6-1.5h-1.2c-0.3,0-0.5-0.2-0.5-0.5S38.2,12.9,38.5,12.9z"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M31.2,13.4c0-1-0.7-1.7-1.8-1.7h-2.8V17h1.2v-1.9h0.6L30,17h1.5l-1.7-2C30.7,14.8,31.2,14.2,31.2,13.4zM27.8,14v-1.3l1.5,0.1c0.5,0,0.7,0.3,0.7,0.6S29.8,14,29.3,14H27.8z"/>
            		<Path
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  d="M24,11.6l-2.9,0.1V17h1.2v-1.8h1.6c1.1,0,1.9-0.7,1.9-1.8C25.8,12.4,25.1,11.6,24,11.6z M24,14.2h-1.6v-1.4h1.4c0.5,0,0.8,0.3,0.8,0.7C24.6,13.9,24.5,14.2,24,14.2z"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="19.3,11.7 18,13.4 16.7,11.7 15.2,11.7 17.3,14.3 15.2,16.9 16.7,16.9 18,15.2 19.3,17 20.8,17 18.7,14.3 20.8,11.7 		"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="10.6,17 14.8,17 14.8,15.9 11.8,15.9 11.8,14.8 14.7,14.8 14.7,13.7 11.8,13.7 11.8,12.7 14.8,12.7 14.8,11.7 10.6,11.7 		"/>
            		<Polygon
                  fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.americanExpress.denim}
                  points="32,17 36.2,17 36.2,15.9 33.2,15.9 33.2,14.8 36.1,14.8 36.1,13.7 33.2,13.7 33.2,12.7 36.2,12.7 36.2,11.7 32,11.7 		"/>
            	</G>
            </G>
          },
          DISCOVER: {
            width: 87.2,
            height: 14.8,
            view_box: "0 0 87.2 14.8",
            content: <G>
              <Defs>
                <LinearGradient id="DEFAULT_DISCOVER_GRADIENT" gradientUnits="userSpaceOnUse" x1="5109.2583" y1="7780.7021" x2="5212.4282" y2="7887.8848" gradientTransform="matrix(0.1 0 0 0.1 -469.8 -776.0197)">
                  <Stop offset="6.232897e-02" stopColor={Global.colors.organization.discover.redwood}/>
                  <Stop offset="0.105" stopColor={Global.colors.organization.discover.metallicCopper}/>
                  <Stop offset="0.2187" stopColor={Global.colors.organization.discover.prairieSand}/>
                  <Stop offset="0.3058" stopColor={Global.colors.organization.discover.mediumCarmine}/>
                  <Stop offset="0.3552" stopColor={Global.colors.organization.discover.mojo}/>
                  <Stop offset="0.5026" stopColor={Global.colors.organization.discover.chileanFire}/>
                  <Stop offset="0.6184" stopColor={Global.colors.organization.discover.flamePea}/>
                  <Stop offset="0.7537" stopColor={Global.colors.organization.discover.tahitiGold}/>
                  <Stop offset="1" stopColor={Global.colors.organization.discover.sun}/>
                </LinearGradient>
              </Defs>
              <Ellipse fill={(color !== Global.colors.single.rangoonGreen)? color: "url(#DEFAULT_DISCOVER_GRADIENT)"} cx="46.3" cy="7.4" rx="7.4" ry="7.4"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M7.2,10.9c-0.9,0.8-2,1.1-3.7,1.1H2.7V2.7h0.7c1.8,0,2.8,0.3,3.7,1.1C8.1,4.7,8.7,6,8.7,7.4C8.7,8.7,8.1,10,7.2,10.9z M4,0.4H0v14h4c2.1,0,3.7-0.5,5-1.6c1.6-1.3,2.5-3.3,2.5-5.4C11.5,3.2,8.4,0.4,4,0.4"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M12.8,14.4h2.7v-14h-2.7V14.4z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M22.2,5.7c-1.6-0.6-2.1-1-2.1-1.8c0-0.9,0.9-1.5,2-1.5c0.8,0,1.5,0.3,2.2,1.1l1.4-1.9c-1.2-1-2.6-1.6-4.1-1.6c-2.5,0-4.4,1.7-4.4,4c0,1.9,0.9,2.9,3.4,3.8c1.1,0.4,1.6,0.6,1.9,0.8c0.5,0.4,0.8,0.9,0.8,1.5c0,1.1-0.9,2-2.1,2c-1.3,0-2.4-0.6-3-1.9L16.5,12c1.3,1.9,2.8,2.7,4.8,2.7c2.8,0,4.8-1.9,4.8-4.6C26.2,7.9,25.3,6.9,22.2,5.7"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M27.1,7.4c0,4.1,3.2,7.3,7.4,7.3c1.2,0,2.2-0.2,3.4-0.8v-3.2c-1.1,1.1-2.1,1.5-3.3,1.5c-2.8,0-4.7-2-4.7-4.8c0-2.7,2-4.8,4.6-4.8c1.3,0,2.3,0.5,3.4,1.6V0.9c-1.2-0.6-2.2-0.9-3.4-0.9C30.4,0.1,27.1,3.3,27.1,7.4"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M59.5,9.8l-3.7-9.4h-3l5.9,14.3h1.5l6-14.3h-3L59.5,9.8"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M67.5,14.4h7.7V12h-5V8.2H75V5.8h-4.8V2.7h5V0.4h-7.7L67.5,14.4"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.discover.rangoonGreen}
                d="M80.5,6.8h-0.8V2.6h0.8c1.7,0,2.6,0.7,2.6,2.1C83.2,6.1,82.3,6.8,80.5,6.8z M86,4.5c0-2.6-1.8-4.1-5-4.1h-4v14h2.7V8.7h0.4l3.8,5.6h3.4l-4.4-5.9C84.9,8.1,86,6.6,86,4.5"/>
            </G>
          },
          PAYPAL: {
            width: 90.1,
            height: 24,
            view_box: "0 0 90.1 24",
            content: <G>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.paypal.catalinaBlue}
                d="M10.8,0h-7c-0.5,0-0.9,0.4-1,0.8L0,18.8c-0.1,0.4,0.2,0.7,0.6,0.7h3.4c0.5,0,0.9-0.4,1-0.8l0.8-4.8c0.1-0.5,0.5-0.8,1-0.8h2.2c4.6,0,7.3-2.2,8-6.7C17.5,2.3,15.5,0,10.8,0z M11.6,6.6c-0.4,2.5-2.3,2.5-4.2,2.5H6.4l0.7-4.7c0-0.3,0.3-0.5,0.6-0.5h0.5C10.2,3.9,12,3.9,11.6,6.6z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.paypal.catalinaBlue}
                d="M31.8,6.5h-3.4c-0.3,0-0.5,0.2-0.6,0.5l-0.2,0.9l-0.2-0.4c-0.7-1.1-2.3-1.4-4-1.4c-3.7,0-6.8,2.8-7.5,6.8c-0.5,3,0.9,6.8,5.5,6.8c3,0,4.6-1.9,4.6-1.9L26,18.8c-0.1,0.4,0.2,0.7,0.6,0.7h3c0.5,0,0.9-0.4,1-0.8l1.8-11.5C32.4,6.8,32.1,6.5,31.8,6.5z M27.1,13c-0.3,1.9-1.9,3.2-3.8,3.2c-2,0-3.1-1.4-2.8-3.3c0.3-1.9,1.9-3.2,3.7-3.2C26.2,9.7,27.4,11.1,27.1,13z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.paypal.catalinaBlue}
                d="M49.6,6.5h-3.4c-0.3,0-0.6,0.2-0.8,0.4l-4.7,6.8l-2-6.6c-0.1-0.4-0.5-0.7-0.9-0.7h-3.3c-0.4,0-0.7,0.4-0.5,0.8l3.7,10.9l-3.5,4.9c-0.3,0.4,0,0.9,0.5,0.9h3.4c0.3,0,0.6-0.2,0.8-0.4L50.1,7.4C50.4,7,50.1,6.5,49.6,6.5z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.paypal.celestialBlue}
                d="M60.7,0h-7c-0.5,0-0.9,0.4-1,0.8l-2.8,18c-0.1,0.4,0.2,0.7,0.6,0.7h3.4c0.5,0,0.9-0.4,1-0.8l0.8-4.8c0.1-0.5,0.5-0.8,1-0.8h2.2c4.6,0,7.3-2.2,8-6.7C67.4,2.3,65.4,0,60.7,0z M61.5,6.6c-0.4,2.5-2.3,2.5-4.2,2.5h-1.1l0.7-4.7c0-0.3,0.3-0.5,0.6-0.5h0.5C60.1,3.9,62,3.9,61.5,6.6z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.paypal.celestialBlue}
                d="M81.7,6.5h-3.4c-0.3,0-0.5,0.2-0.6,0.5l-0.2,0.9l-0.2-0.4c-0.7-1.1-2.3-1.4-4-1.4c-3.7,0-6.8,2.8-7.5,6.8c-0.5,3,0.9,6.8,5.5,6.8c3,0,4.6-1.9,4.6-1.9l-0.2,0.9c-0.1,0.4,0.2,0.7,0.6,0.7h3c0.5,0,0.9-0.4,1-0.8l1.8-11.5C82.3,6.8,82,6.5,81.7,6.5z M77,13c-0.3,1.9-1.9,3.2-3.8,3.2c-2,0-3.1-1.4-2.8-3.3c0.3-1.9,1.9-3.2,3.7-3.2C76.2,9.7,77.3,11.1,77,13z"/>
              <Path
                fill={(color !== Global.colors.single.rangoonGreen)? color: Global.colors.organization.paypal.celestialBlue}
                d="M85.7,0.5l-2.9,18.3c-0.1,0.4,0.2,0.7,0.6,0.7h2.9c0.5,0,0.9-0.4,1-0.8l2.8-18C90.1,0.3,89.8,0,89.5,0h-3.2C86,0,85.7,0.2,85.7,0.5z"/>
            </G>
          }
        },
        _ICONS = {
          ..._PRIMARY_UI_ICONS,
          ..._SECONDARY_UI_ICONS,
          ..._CREDIT_CARD_ICONS
        };

  return _ICONS[name];
};

export const Icon = (props) => {
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

  if (typeof props.gradient != 'undefined'){
    attitude.gradient = props.gradient;
  }

  const _ICON_SELECTED_NAME = (props.name || props.title || '_SIDE_GUIDE');

  attitude.name = Functions._convertTokenToIconName(_ICON_SELECTED_NAME);

  var _SELECTED_ICON, _ICON_DEFS_CONTENT;

  if (typeof attitude.gradient != 'undefined'){
    const restructredRange = Object.keys(attitude.gradient).map((stepName) => {
      return attitude.gradient[stepName];
    });

    _SELECTED_ICON = _getIconWithName(attitude.name, 'url(#gradient)');

    _ICON_DEFS_CONTENT = <Defs>
        <LinearGradient id="gradient" x1="0" y1="0" x2="100%" y2="100%">
          {
            restructredRange.map((range, i) => {
              const _INDEX = i.toString();

              return (
                <Stop offset={_INDEX} stopColor={range} />
              );
            })
          }
        </LinearGradient>
    </Defs>;
  }else{
    if (typeof props.color != 'undefined'){
      attitude.color = props.color;

      _SELECTED_ICON = _getIconWithName(attitude.name, attitude.color);
    }else{
      _SELECTED_ICON = _getIconWithName(attitude.name);
    }
  }

  attitude.viewBox = _SELECTED_ICON.view_box;
  attitude.content = _SELECTED_ICON.content;

  attitude.width = props.width || _SELECTED_ICON.width;
  attitude.height = props.height || _SELECTED_ICON.height;

  if ((typeof props.width != 'undefined') && (typeof props.height == 'undefined')){
    attitude.height = (_SELECTED_ICON.height * attitude.width) / _SELECTED_ICON.width;
  }else if ((typeof props.width == 'undefined') && (typeof props.height != 'undefined')){
    attitude.width = (_SELECTED_ICON.width * attitude.height) / _SELECTED_ICON.height;
  }

  return (
    <Svg
      key={attitude.key}
      width={attitude.width}
      height={attitude.height}
      viewBox={attitude.viewBox}
      style={attitude.style}>
        {_ICON_DEFS_CONTENT}
        {attitude.content}
    </Svg>
  )
}
