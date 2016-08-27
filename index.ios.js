import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  AsyncStorage,
} from 'react-native';

import CardSwiper from './app/CardSwiper';
import Nav from './app/Nav';
import EmojiPicker from './app/EmojiPicker';

import { FIBONACCI, COLOR_BLUE } from './app/settingsValues';

console.disableYellowBox = true;

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
        emoji: '1f61d',
      },
    };

    // AsyncStorage.setItem('settings', JSON.stringify(this.state.settings));

    AsyncStorage.getItem('settings')
      .then((settings) => {
        if (!settings) return;

        try {
          this.setState({ settings: JSON.parse(settings), loaded: true });
        } catch (e) {
          this.setState({ loaded: true });
        }
      })
      .done();
  }

  onSettingsChange = (newSettings) => {
    AsyncStorage.mergeItem('settings', JSON.stringify(newSettings))
      .done();

    this.setState({
      settings: { ...newSettings },
    });
  }

  openEmojiPicker = () => {
    this.setState({ displayEmojiPicker: true });
  }

  onEmojiSelect = (newEmoji) => {
    console.log('selected emoji', newEmoji);
    this.onSettingsChange({ ...this.state.settings, emoji: newEmoji });
    this.setState({ displayEmojiPicker: false });
  }

  render() {
    return (
      <View testID="root-view">
        { this.state.displayEmojiPicker && <EmojiPicker onSelect={this.onEmojiSelect} /> }
        { this.state.loaded && <CardSwiper openEmojiPicker={this.openEmojiPicker} settings={this.state.settings} /> }
        <Nav settings={this.state.settings} onSettingsChange={this.onSettingsChange} />
      </View>
    );
  }
}

AppRegistry.registerComponent('AgileCards', () => AgileCards);
