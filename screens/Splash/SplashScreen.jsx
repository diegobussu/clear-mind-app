// screens/SplashScreen.jsx
import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import splashImage from '../../assets/img/logo-white.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Tutorial');
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient colors={['rgba(157, 80, 255, 0.75)', 'rgba(76, 78, 255, 0.75)']} style={styles.container}>
      <Image source={splashImage} style={styles.image} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 317,
    height: 111,
  }
});

export default SplashScreen;
