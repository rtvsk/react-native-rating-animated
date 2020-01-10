import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class App extends Component {
  state = {
    rating: 2,
    animation: new Animated.Value(1),
    numStars: this.props.numStars ?? 3,
    rating: this.props.rating ?? 1,
    starColor: this.props.starColor ?? 'orange',
  }

  animate = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.state.animation.setValue(1);
    });
  }

  rate = star => {
    this.setState({ rating: star })
  }

  render() {
    const { rating, animation, starColor, numStars } = this.state;

    const animateScale = animation.interpolate({
      inputRange: [1, 1.5, 2],
      outputRange: [1, 1.4, 1],
    });

    const animateOpacity = animation.interpolate({
      inputRange: [1, 1.2, 2],
      outputRange: [1, 0.2, 1],
    });

    const animateWobble = animation.interpolate({
      inputRange: [1, 1.25, 1.75, 2],
      outputRange: ['0deg', '-5deg', '5deg', '0deg'],
    });

    const animationStyle = {
      transform: [{ scale: animateScale }, { rotate: animateWobble }],
      opacity: animateOpacity,
    }

    let stars = [];
    for (let x = 1; x <= numStars; x++) {
      stars.push(
        <TouchableWithoutFeedback
          key={x}
          onPress={() => {
            this.rate(x), this.animate()
          }}
        >
          <Animated.View style={x <= rating ? animationStyle : {}}>
            <Star filled={x <= rating} color={starColor} />
          </Animated.View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          {stars}
        </View>
      </View>
    );
  }
}

class Star extends Component {
  render() {
    return (
      <FontAwesome
        name={this.props.filled ? 'star' : 'star-o'}
        size={32}
        color={this.props.color}
        style={{ marginHorizontal: 6 }}
      />
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
