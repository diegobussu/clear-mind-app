import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import splashImage from '../../assets/img/logo-white.png';

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Tutorial');
    }, 500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient className="flex-1 justify-center items-center" colors={['rgba(157, 80, 255, 0.75)', 'rgba(76, 78, 255, 0.75)']}>
      <Image source={splashImage} className="w-[317px] h-[111px]" />
    </LinearGradient>
  );
};

export default Splash;
