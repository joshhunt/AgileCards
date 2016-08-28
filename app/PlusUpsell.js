import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';
import Button from 'apsl-react-native-button';

import HeartEyesEmoji from 'emojione/assets/png_512x512/1f60d.png';
import BustsEmoji from 'emojione/assets/png_512x512/1f465.png';

import { TINT_FOR_COLOR } from './settingsValues';

const INNER_MARGIN = 20;

const styles = StyleSheet.create({

  main: {
    padding: INNER_MARGIN,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
  },

  header: {
    fontFamily: 'Avenir Next',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },

  carousel: {
    marginTop: -5,
  },

  textContainer: {
    maxWidth: 200,
    flexWrap: 'wrap',
  },

  featureCard: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  featureImageWrapper: { flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  featureTitle: {
    fontSize: 20,
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontWeight: '500',
    flexWrap: 'wrap',
    marginBottom: 5,
  },

  featureDesc: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontWeight: '500',
    flexWrap: 'wrap',
  },

  buyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(66, 163, 221)',
    borderColor: 'transparent',
    borderWidth: 0,
  },

  buyButtonText: {
    fontSize: 16,
    fontFamily: 'Avenir Next',
    fontWeight: '500',
    color: 'white',
  },

});

export const UPSELL_WIDTH = 300;
export const UPSELL_HEIGHT = 400;

const CAROUSEL_WIDTH = UPSELL_WIDTH - (INNER_MARGIN * 2);
const CAROUSEL_HEIGHT = 220;

export default class PlusUpsell extends Component {
  state = {
    lol: true,
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.header}>Upgrade To Pro</Text>

        <Swiper
          autoplay
          showsPagination={false}
          width={CAROUSEL_WIDTH}
          height={CAROUSEL_HEIGHT}
          style={styles.carousel}
          paginationStyle={{ bottom: 5 }}
        >

          <View style={styles.featureCard}>
            <View style={styles.featureImageWrapper}>
              <Image source={HeartEyesEmoji} width={100} height={100} style={{ width: 100, height: 100 }} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.featureTitle}>Emoji Cards</Text>
              <Text style={styles.featureDesc} numberOfLines={3}>For when points just are not enough!</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureImageWrapper}>
              <Image source={BustsEmoji} width={100} height={100} style={{ width: 100, height: 100 }} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.featureTitle}>Team Planning</Text>
              <Text style={styles.featureDesc} numberOfLines={3}>Plan your sprints as a team. Coming soon!</Text>
            </View>
          </View>

        </Swiper>

        <Button style={[styles.buyButton, { backgroundColor: TINT_FOR_COLOR[this.props.settings.color] }]}>
          <Text style={styles.buyButtonText}>Upgrade now for $1.99</Text>
        </Button>

      </View>
    );
  }
}
