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
import PlusUpsell, { UPSELL_WIDTH, UPSELL_HEIGHT } from './app/PlusUpsell';

import { FIBONACCI, COLOR_BLUE } from './app/settingsValues';

console.disableYellowBox = true;

class AgileCards extends Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loaded: true,
      iap: {},
      settings: {
        cardSequence: FIBONACCI,
        maxCard: '13',
        color: COLOR_BLUE,
        displayEmoji: true,
        emoji: '1f61d',
      },
    };

    // Clears out the settings
    // AsyncStorage.setItem('settings', JSON.stringify(this.state.settings));

    const DEFAULT_IAP = { pro: false };

    AsyncStorage.getItem('iap')
      .then((result) => {
        if (!result) {
          this.setState({ iap: DEFAULT_IAP });
          return;
        }

        try {
          this.setState({ iap: JSON.parse(result) });
        } catch (e) {
          this.setState({ iap: DEFAULT_IAP });
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

  onEmojiSelect = (newEmoji) => {
    this.onSettingsChange({ ...this.state.settings, emoji: newEmoji });
    this.setState({ displayEmojiPicker: false });
  }

  openEmojiPicker = () => {
    this.setState({ displayEmojiPicker: true });
  }

  openPlusUpsell = () => {
    this.setState({ plusUpsellVisible: true });
  }

  closeModals = () => {
    this.setState({ plusUpsellVisible: false, displayEmojiPicker: false });
  }

  render() {
    return (
      <View testID="root-view">
        { this.state.loaded && this.state.iap && <CardSwiper openEmojiPicker={this.openEmojiPicker} settings={this.state.settings} /> }
        <Nav
          iap={this.state.iap}
          settings={this.state.settings}
          showPlus={this.openPlusUpsell}
          onSettingsChange={this.onSettingsChange}
        />

        <Modal
          isOpen={this.state.displayEmojiPicker}
          swipeToClose={false}
          onClosed={this.closeModals}
        >
          <EmojiPicker onSelect={this.onEmojiSelect} />
        </Modal>

        <Modal
          isOpen={this.state.plusUpsellVisible}
          position="center"
          style={{ height: UPSELL_HEIGHT, width: UPSELL_WIDTH, borderRadius: 10 }}
          onClosed={this.closeModals}
        >
          <PlusUpsell settings={this.state.settings} />
        </Modal>
      </View>
    );
  }
}

AppRegistry.registerComponent('AgileCards', () => AgileCards);
