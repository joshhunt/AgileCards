import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Foundation';
import Popover from './Popover';
import Settings from './Settings';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 30,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  proButton: {
    // alignSelf: 'flex-start',
  },

  settingsButton: {
    // alignSelf: 'flex-end',
  },
});

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const settingsHeight = 421;
const popupOffset = 10;
const popupDisplayArea = {
  x: popupOffset,
  y: popupOffset,
  width: windowWidth - (popupOffset * 2),
  height: windowHeight - (popupOffset * 2),
};

export default class Nav extends Component {

  state = {
    isVisible: false,
    buttonRect: {},
  };

  showPopover = () => {
    this.button.measure((ox, oy, width, height, px, py) => {
      const newState = {
        isVisible: true,
        buttonRect: { x: px, y: py, width, height },
        popupHeight: Math.min(popupDisplayArea.height - (py + height) - 8, settingsHeight),
      };
      this.setState(newState);
    });
  };

  closePopover = () => {
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <View style={styles.root}>
        {/*
        { !this.props.iap.pro &&
          <TouchableOpacity style={styles.proButton} ref={c => this.button = c} onPress={this.props.showPlus} testID="pro-button">
            <View>
              <Icon
                name="star"
                size={28}
                color={'rgba(0, 0, 0, .25)'}
              />
            </View>
          </TouchableOpacity>
        }

        {this.props.iap.pro && <View />}
        */}

        <View />

        <TouchableOpacity style={styles.settingsButton} ref={c => this.button = c} onPress={this.showPopover} testID="settings-button">
          <View>
            <Icon
              name="widget"
              size={28}
              color={this.state.isVisible ? 'rgba(255, 255, 255, .75)' : 'rgba(0, 0, 0, .25)'}
            />
          </View>
        </TouchableOpacity>

        <Popover
          displayArea={popupDisplayArea}
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          placement="bottom"
          onClose={this.closePopover}
        >
          <View style={{ height: this.state.popupHeight, width: windowWidth * 0.75 }}>
            <Settings
              iap={this.props.iap}
              settings={this.props.settings}
              onChange={this.props.onSettingsChange}
            />
          </View>
        </Popover>
      </View>
    );
  }
}
