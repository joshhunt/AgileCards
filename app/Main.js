import Swiper from 'react-native-swiper'
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

var styles = StyleSheet.create({
  wrapper: {
  },
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
})

export default class Main extends Component {


  render() {
    const swiperProps = {
      dot: <View style={styles.dot} />,
      activeDot: <View style={[styles.dot, styles.dotActive]} />,
    };

    return (
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        {...swiperProps}
      >

        <View style={[styles.slide, {backgroundColor: '#37A1E8'}]}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={[styles.slide, {backgroundColor: '#3498DB'}]}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={[styles.slide, {backgroundColor: '#2E86C1'}]}>
          <Text style={styles.text}>3</Text>
        </View>
        <View style={[styles.slide, {backgroundColor: '#256C9B'}]}>
          <Text style={styles.text}>5</Text>
        </View>
        <View style={[styles.slide, {backgroundColor: '#16405B'}]}>
          <Text style={styles.text}>8</Text>
        </View>
      </Swiper>
    );
  }
}
