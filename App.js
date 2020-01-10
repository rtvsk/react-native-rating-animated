import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Rating from './Rating';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Rating numStars={5} rating={4} starColor="blue" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
