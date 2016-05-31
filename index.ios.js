/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

console.log('starting...')

import React, { Component } from 'react';
import Main from './app/Main';

import {
  AppRegistry,
  View,
  Text,
} from 'react-native';

console.log('starting...')

class AgileCards extends Component {
  render() {
    return <Main/>
  }
}

console.log('about to register...');
AppRegistry.registerComponent('AgileCards', () => AgileCards);
