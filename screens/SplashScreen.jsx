// screens/SplashScreen.jsx
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import splashImage from '../assets/img/favicon.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A2D96',
  },
  image: {
    width: 200,
    height: 200,
  }
});

export default SplashScreen;

