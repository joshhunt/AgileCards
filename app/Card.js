import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native'

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
  },
});

export default function Card({ children, colors }) {

  return (
    <View style={[styles.slide, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text]}>{children}</Text>
    </View>
  );
}
