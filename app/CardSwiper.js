import React, { Component } from 'react';
import please from 'pleasejs';

import {
  StyleSheet,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper';
import Card from './Card';
import { CARDS_FOR_SEQUENCE } from './settingsValues';

// 60
// -
// 25
range = 60-25


function colorForCard(index, maxColors) {
  const baseColor = {
    h: 204,
    s: .70,
    v: .1,
  };

  const min = 60;
  const max = 25;
  const range = max - min;
  const step = range / maxColors;
  const value = min + (step * index);
  const percentage = value;

  const colors = please.make_scheme(baseColor, {
    golden: false,
    colors_returned: maxColors,
  });

  const ccc = `hsl(204, 70%, ${percentage}%)`;
  return ccc;
}

var styles = StyleSheet.create({
  dot: {
    backgroundColor:'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },

  dotActive: {
    backgroundColor:'rgba(255,255,255,.7)',
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

function cardsForSettings({cardSequence,  maxCard}) {
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

export default function CardSwiper({ settings }) {
  const swiperProps = {
    showButtons: false,
    dot: <View style={styles.dot} />,
    activeDot: <View style={[styles.dot, styles.dotActive]} />,
  };

  const allCards = cardsForSettings(settings);

  return (
    <Swiper {...swiperProps}>
      {allCards.map((cardData, index) => {
        return <Card key={cardData} color={colorForCard(index, allCards.length)}>{cardData}</Card>
      })}
    </Swiper>
  );
}
