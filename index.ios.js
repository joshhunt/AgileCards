import React, { Component } from 'react';

import {
  AppRegistry,
  View,
  AsyncStorage,
} from 'react-native';

import Modal from 'react-native-modalbox';

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

    AsyncStorage.getItem('iap')
      .then((result) => {
        if (!result) {
          this.setState({ iap: { pro: false } });
          return;
        }

        try {
          this.setState({ iap: JSON.parse(result) });
        } catch (e) {
          this.setState({ iap: { pro: false } });
        }
      });

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
    this.onSettingsChange({ ...this.state.settings, emoji: newEmoji });
    this.setState({ displayEmojiPicker: false });
  }

  render() {
    return (
      <View testID="root-view">
        { this.state.loaded && this.state.iap && <CardSwiper openEmojiPicker={this.openEmojiPicker} settings={this.state.settings} /> }
        <Nav settings={this.state.settings} onSettingsChange={this.onSettingsChange} />

        <Modal isOpen={this.state.displayEmojiPicker} swipeToClose={false} swipeArea={1}>
          <EmojiPicker onSelect={this.onEmojiSelect} />
        </Modal>
      </View>
    );
  }
}

AppRegistry.registerComponent('AgileCards', () => AgileCards);
