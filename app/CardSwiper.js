import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';


import Swiper from 'react-native-swiper';
import Card from './Card';
import EmojiCard from './EmojiCard';
import { CARDS_FOR_SEQUENCE, COLORS } from './settingsValues';

const styles = StyleSheet.create({
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  dotActive: {
    backgroundColor: 'rgba(255,255,255,.7)',
  },

  emoji: {
    flex: 1,
    paddingTop: 150,
    paddingBottom: 150,
    paddingLeft: 50,
    paddingRight: 50,
    backgroundColor: 'white',
  },
});

// const CARDS = [
//   { content: 1, color: '#37A1E8' },
//   { content: 2, color: '#3498DB' },
//   { content: 3, color: '#2E86C1' },
//   { content: 5, color: '#256C9B' },
//   { content: 8, color: '#16405B' },
//   { content: "💩", color: '#16405B' },
// ];

function cardsForSettings({ cardSequence, maxCard }) {
  let maxReached = false;

  const cards = CARDS_FOR_SEQUENCE[cardSequence]
    .filter((oneCardValue) => {
      if (oneCardValue === maxCard) {
        maxReached = true;
        return true;
      }

      return !maxReached;
    });

  return cards;
}

export default function CardSwiper({ settings, openEmojiPicker }) {
  const swiperProps = {
    showButtons: false,
    dot: <View style={styles.dot} />,
    activeDot: <View style={[styles.dot, styles.dotActive]} />,
  };

  const allCards = cardsForSettings(settings);
  const colors = COLORS[settings.color];

  return (
    <Swiper {...swiperProps} testID="swiper">
      {allCards.map((cardData, index) => {
        if (cardData === 'emoji-picker') {
          return <EmojiCard key="emoji-picker" settings={settings} colors={colors[index]} openEmojiPicker={openEmojiPicker} />;
        }

        return <Card key={cardData} colors={colors[index]}>{cardData}</Card>;
      })}
    </Swiper>
  );
}
