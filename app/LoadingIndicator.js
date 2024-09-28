// LoadingIndicator.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const LoadingIndicator = () => {
  const [progress, setProgress] = useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 6000, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();

    animatedValue.addListener(({ value }) => {
      setProgress(Math.floor(value * 100));
    });

    return () => {
      animatedValue.removeAllListeners();
    };
  }, []);

  const loadingBarWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loadingBar,
          {
            width: loadingBarWidth,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  loadingBar: {
    height: 5,
    backgroundColor: '#04AA6D',
    width: '100%',
  },
  progressText: {
    fontSize: 16,
    color: '#04AA6D',
  },
});

export default LoadingIndicator;
