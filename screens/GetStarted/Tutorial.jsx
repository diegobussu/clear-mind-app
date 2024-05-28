import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, PanResponder, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';

const images = [
  require('../../assets/img/tuto-1.png'),
  require('../../assets/img/tuto-2.png'),
  require('../../assets/img/tuto-3.png')
];

const texts = [
  "Bienvenue sur Clear Mind",
  "Suivez vos humeurs et exprimez-vous",
  "Recevez des conseils personnalisés"
];

const texts1 = [
  "Votre compagnon quotidien pour suivre vos humeurs et améliorer votre bien-être.",
  "Gardez une trace de vos émotions et notez vos pensées comme dans un journal intime",
  "Des conseils adaptés à vos besoins et un soutien disponible à tout moment."
];

const Tutorial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation(); // Initialize useNavigation

  useEffect(() => {
    // Reset the index when the component is mounted
    setCurrentIndex(0);
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setCurrentIndex(currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex);
    } else if (direction === 'left') {
      if (currentIndex + 1 < images.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Navigate to TutoScreen when reaching the last point
        navigation.navigate('Login');
      }
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false, // Prevent termination of panResponder
    onPanResponderGrant: (evt, gestureState) => {},
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;
      if (Math.abs(dx) > 50) { // Threshold to consider as a swipe
        if (dx > 0) {
          handleSwipe('right');
        } else {
          handleSwipe('left');
        }
      }
    }
  });

  const handleSkip = () => {
    // Navigate to LoginScreen when "Skip" button is pressed
    navigation.navigate('Login');
  };

  const buttonText = currentIndex === images.length - 1 ? "Commencer" : "Continuer";

  return (
    <SafeAreaView className="flex-1 justify-center px-5 bg-secondary-white" {...panResponder.panHandlers}>
      <TouchableOpacity className="absolute top-20 right-5" onPress={handleSkip}>
        <Text className="items-center absolute top-0 right-0 m-2 text-primary-purple text-lg">Passer</Text>
      </TouchableOpacity>
      <View className="items-center justify-center mt-10">
        <Image
          source={images[currentIndex]}
          className="w-[330px] h-[280px]"
          resizeMode="contain"
        />
        <Text className="mt-12 px-5 text-center font-sf-semibold text-2xl">{texts[currentIndex]}</Text>
        <Text className="mt-12 px-10 text-center font-sf-thin text-lg">{texts1[currentIndex]}</Text>
        
        <View className="flex-row mt-10 mb-10">
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
              style={{
                width: 10,
                height: 10,
                backgroundColor: currentIndex === index ? '#6F26FF' : 'rgba(86, 0, 255, 0.17)',
                borderRadius: 5,
                marginRight: 5
              }}
            />
          ))}
        </View>
      </View>
      <Button text={buttonText} onPress={() => handleSwipe('left')} />
    </SafeAreaView>
  );
};

export default Tutorial;
