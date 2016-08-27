import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const emojiUrl = (unicode) => (
  `https://github.com/Ranks/emojione/blob/master/assets/png_512x512/${unicode}.png?raw=true`
);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
  },

  text: {
    color: '#fff',
    fontSize: 200,
    fontFamily: 'AppleColorEmoji',
  },

  pickerEmoji: {
    width: 150,
    height: 150,
    margin: 20,
  },

  overlay: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 300,
    height: 500,
    backgroundColor: 'white',
    zIndex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default class EmojiCard extends React.Component {
  state = {
    pickerOpen: false,
  };

  onPressButton = () => {
    this.setState({ pickerOpen: !this.state.pickerOpen });
  };

  render() {
    return (
      <View style={[styles.slide, { backgroundColor: this.props.colors.bg }]}>
        <TouchableOpacity onPress={this.props.openEmojiPicker}>
          <Image
            style={styles.emoji}
            source={{ url: emojiUrl(this.props.settings.emoji) }}
            width={250} height={250}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
