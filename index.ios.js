import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
} from 'react-native'

import CardSwiper from './app/CardSwiper';
import Nav from './app/Nav';

import { FIBONACCI } from './app/settingsValues';

console.disableYellowBox = true;

var Overlay = require('react-native-overlay');

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

class AgileCards extends Component {

  state = {
    settings: {
      cardSequence: FIBONACCI,
      maxCard: '13',
    },
  }

  onSettingsChange = (newSettings) => {
    this.setState({
      settings: { ...newSettings },
    })
  }

  render() {
    return (
      <View>
        <CardSwiper settings={this.state.settings} />
        <Nav settings={this.state.settings} onSettingsChange={this.onSettingsChange}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('AgileCards', () => AgileCards);