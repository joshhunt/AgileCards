import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native'

import CardSwiper from './app/CardSwiper';
import Nav from './app/Nav';

import { FIBONACCI, COLOR_BLUE } from './app/settingsValues';

console.disableYellowBox = true;

var Overlay = require('react-native-overlay');

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

class AgileCards extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loaded: true,
      settings: {
        cardSequence: FIBONACCI,
        maxCard: '13',
        color: COLOR_BLUE,
        displayEmoji: true,
      },
    }

    AsyncStorage.getItem('settings')
      .then((settings) => {
        console.log('Got settings of', settings);
        if (!settings) return

        try {
          console.log('Got saved settings', JSON.parse(settings));
          this.setState({ settings: JSON.parse(settings), loaded: true });
        } catch (e) {
          console.log('unable to parse settings');
          this.setState({ loaded: true });
        }
      })
      .done()
  }

  onSettingsChange = (newSettings) => {
    console.log('Saving new settings', newSettings);
    AsyncStorage.mergeItem('settings', JSON.stringify(newSettings))
      .then(() => {
        console.log('persisted settings');
      })
      .done();

    this.setState({
      settings: { ...newSettings },
    })
  }

  render() {
    return (
      <View testID="root-view">
        { this.state.loaded && <CardSwiper settings={this.state.settings} /> }
        <Nav settings={this.state.settings} onSettingsChange={this.onSettingsChange}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('AgileCards', () => AgileCards);