import React from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
    LazyloadScrollView,
    LazyloadView,
    LazyloadImage,
} from 'react-native-lazyload';

import emojisJson from 'emojione/emoji.json';
import _ from 'lodash';

const offsetHeight = 60;
const offsetWidth = 30;
const { height: windowHeight, width: windowWidth } = Dimensions.get('window');

const emojisList = _.filter(emojisJson, ({ category }) => category === 'people');


const styles = StyleSheet.create({
  pickerEmoji: {},

  overlay: {
    flex: 1,
    margin: 20,
    // position: 'absolute',
    // top: offsetHeight,
    // left: offsetWidth,
    // width: windowWidth - (offsetWidth * 2),
    // height: windowHeight - (offsetHeight * 2),
    // backgroundColor: 'white',
    // zIndex: 1,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // borderRadius: 10,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 2,
    // shadowOpacity: 0.5,
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
  `https://s3-ap-southeast-2.amazonaws.com/agilecards/emoji_512/${unicode}.png`
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
        <LazyloadScrollView name="emoji-picker" style={[styles.scroll]} contentContainerStyle={styles.list}>
          {emojisList.map((emo) => {
            return (
              <LazyloadView host="emoji-picker" style={styles.item} key={emo.unicode}>
                <TouchableOpacity onPress={this.props.onSelect.bind(null, emo.unicode)} >
                  <LazyloadImage
                    host="emoji-picker"
                    style={styles.pickerEmoji}
                    source={{ uri: emojiUrl(emo.unicode) }}
                    width={50}
                    height={50}
                  />
                </TouchableOpacity>
              </LazyloadView>
            );
          })}
        </LazyloadScrollView>
      </View>
    );
  }
}
