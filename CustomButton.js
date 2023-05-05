import React from 'react';
import {Animated, Pressable, StyleSheet, Text} from 'react-native';

export default function CustomButton({
  label,
  bgColor = 'lightgray',
  onPress,
}) {
  // For more infos about Animated https://reactnative.dev/docs/animated

  const animatedButtonScale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.container,
          {backgroundColor: bgColor},
          animatedScaleStyle,
        ]}>
        <Text style={{textAlign: 'center'}}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
  },
});