import React from 'react';

import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import emojiSpriteSheet from '../people-emoji-sprite.png';
import emojiSpriteSheetData from '../spriteData.json';

const TOTAL_EMOJIS_LENGTH = Math.ceil(Math.sqrt(Object.keys(emojiSpriteSheetData).length));

const styles = StyleSheet.create({
  emoji: {
    position: 'absolute',
    top: 250 * 0,
    left: (250 * 6) * -1,
  },

  // 43 emoji
  mask: {
    position: 'relative',
    width: 250,
    height: 250,
    overflow: 'hidden',
  },
});

export default function Emoji({ size, name }) {
  const { posX, posY } = emojiSpriteSheetData[name];


  const top = size * posX;
  const left = (size * posY) * -1;

  console.log('Rendering emoji', name, 'at', { posX, posY, top, left });
  return (
    <View style={styles.mask} >
      <Image
        style={[styles.emoji, { top, left }]}
        source={emojiSpriteSheet}
        width={TOTAL_EMOJIS_LENGTH * size} height={TOTAL_EMOJIS_LENGTH * size}
      />
    </View>
  );
}