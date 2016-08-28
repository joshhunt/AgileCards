import React from 'react';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import _ from 'lodash';
import Swiper from 'react-native-swiper';
import emojisJson from 'emojione/emoji.json';
import emojiBlacklist from './emojiBlacklist.json';

const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const emojisList = _(emojisJson)
  .filter(({ unicode, category }) => category === 'people' && !emojiBlacklist.includes(unicode))
  .sortBy(({ emoji_order }) => parseInt(emoji_order, 10))
  .value();

const EMOJI_SIZE = 50;
const EMOJI_MARGIN = 10;

const styles = StyleSheet.create({
  pickerEmoji: {},

  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: {
    flex: 1,
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: EMOJI_MARGIN * 3,
    paddingBottom: EMOJI_MARGIN * 3,
    marginLeft: EMOJI_MARGIN,
    marginRight: EMOJI_MARGIN,
  },

  item: {
    margin: EMOJI_MARGIN,
    width: EMOJI_SIZE,
    height: EMOJI_SIZE,
  },
});

const emojiUrl = (unicode) => (
  `https://s3-ap-southeast-2.amazonaws.com/agilecards/emoji_512/${unicode}.png`
);

export default class EmojiCard extends React.Component {
  state = { emojisToFuckoff: [] };

  onPressButton = (emoji) => {
    const emojisToFuckoff = this.state.emojisToFuckoff.concat(emoji);
    console.log(JSON.stringify(emojisToFuckoff));
    this.setState({ emojisToFuckoff });
  };

  makePages = () => {
    const input = _.clone(emojisList);
    const pagedEmojis = [];

    const emojiSize = (EMOJI_SIZE + (EMOJI_MARGIN * 2));

    const pageHeight = windowHeight - (EMOJI_MARGIN * 6);
    const pageWidth = windowWidth - (EMOJI_MARGIN * 2);

    const canFitInHeight = Math.floor(pageHeight / emojiSize);
    const canFitInWidth = Math.floor(pageWidth / emojiSize);
    const emojisOnEachPage = canFitInHeight * canFitInWidth;

    while (input.length > 0) {
      pagedEmojis.push(input.splice(0, emojisOnEachPage));
    }

    const pages = pagedEmojis.map((emojis, pageIndex) => (
      <View key={pageIndex} style={styles.list}>
        {emojis.map((emoji, emojiIndex) => (
          <View key={emojiIndex} style={styles.item}>
            <TouchableOpacity onPress={this.props.onSelect.bind(null, emoji.unicode)} >
              <Image
                style={styles.pickerEmoji}
                source={{ uri: emojiUrl(emoji.unicode) }}
                width={EMOJI_SIZE}
                height={EMOJI_SIZE}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    ));

    return pages;
  }

  render() {
    return (
      <View style={styles.overlay}>
        <Swiper loadMinimal loadMinimalSize={1} showButtons={false} testID="emojiSwiper">
          {this.makePages()}
        </Swiper>
      </View>
    );
  }
}
