import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/splash.png')} style={styles.loadingImage} resizeMode="cover" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  loadingImage: {
    flex: 1,
    width: Dimensions.get('window').width, // Utilise toute la largeur de l'écran
    height: Dimensions.get('window').height, // Utilise toute la hauteur de l'écran
  },
});

export default LoadingScreen;
