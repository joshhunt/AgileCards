import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import emojisListRaw from './emojis';
import emojisJson from 'emojione/emoji.json';
import _ from 'lodash';

const emojisList = _.filter(emojisJson, ({ category }) => category === 'people').slice(0, 50);


const styles = StyleSheet.create({
  pickerEmoji: {},

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

  scroll: {
    flex: 1,
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    margin: 10,
    width: 50,
    height: 50,
  },
});

const emojiUrl = (unicode) => (
  `https://github.com/Ranks/emojione/blob/master/assets/png_512x512/${unicode}.png?raw=true`
);

export default class EmojiCard extends React.Component {
  state = {
    pickerOpen: false,
  };

  onPressButton = () => {
    this.setState({ pickerOpen: !this.state.pickerOpen });
  };

  render() {
    return (
      <View style={styles.overlay}>
        <ScrollView style={[styles.scroll]} contentContainerStyle={styles.list}>
          {emojisList.map((emo) => {
            return (
              <View style={styles.item} key={emo.unicode}>
                <TouchableOpacity onPress={this.props.onSelect.bind(null, emo.unicode)} >
                  <Image
                    style={styles.pickerEmoji}
                    source={{ uri: emojiUrl(emo.unicode) }}
                    width={50}
                    height={50}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
