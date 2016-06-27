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
    backgroundColor: 'transparent',
  },

  settingsButton: {
    alignSelf: 'flex-end',
  },
});

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const settingsHeight = 421;
const popupOffset = 10
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
    this.refs.button.measure((ox, oy, width, height, px, py) => {
      const newState = {
        isVisible: true,
        buttonRect: {x: px, y: py, width: width, height: height},
        popupHeight: Math.min(popupDisplayArea.height - (py + height) - 8, settingsHeight)
      };
      this.setState(newState);
    });
  };

  closePopover = (ev) => {
    this.setState({isVisible: false});
  };

  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity style={styles.settingsButton} ref="button" onPress={this.showPopover} testID="settings-button">
          <View>
            <Icon name="widget" size={28} color="rgba(0, 0, 0, .25)"/>
          </View>
        </TouchableOpacity>

        <Popover
          displayArea={popupDisplayArea}
          isVisible={this.state.isVisible}
          fromRect={this.state.buttonRect}
          placement="bottom"
          onClose={this.closePopover}>

          <View style={{height: this.state.popupHeight, width: windowWidth * .75 }}>
            <Settings settings={this.props.settings} onChange={this.props.onSettingsChange} />
          </View>

        </Popover>
      </View>
    );
  }
}