// screens/TutorialScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

const images = [
  require('../assets/img/tuto-1.png'),
  require('../assets/img/tuto-2.png'),
  require('../assets/img/tuto-3.png')
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

const TutoScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation(); // Initialiser useNavigation

  useEffect(() => {
    // Réinitialiser l'index lorsque le composant est monté
    setCurrentIndex(0);
  }, []);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      setCurrentIndex(currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex);
    } else if (direction === 'left') {
      if (currentIndex + 1 < images.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // Naviguer vers TutoScreen lorsque vous atteignez le dernier point
        navigation.navigate('Login');
      }
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false, // Empêcher la résiliation du panResponder
    onPanResponderGrant: (evt, gestureState) => {},
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;
      if (Math.abs(dx) > 50) { // Seuil pour considérer comme un swipe
        if (dx > 0) {
          handleSwipe('right');
        } else {
          handleSwipe('left');
        }
      }
    }
  });

  const handleSkip = () => {
    // Naviguer vers TutoScreen lorsque le bouton "Passer" est pressé
    navigation.navigate('Login');
  };

  const buttonText = currentIndex === images.length - 1 ? "Commencer" : "Continuer";

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F9FF' }} {...panResponder.panHandlers}>
      {/* Conteneur pour les éléments centraux */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {/* Image avec texte en dessous */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={images[currentIndex]}
            style={{ width: 330, height: 280 }}
            resizeMode="contain"
          />
          <Text style={{ marginTop: 30, paddingHorizontal: 10, textAlign: 'center', fontFamily: 'SF-Semibold', fontSize: 30 }}>{texts[currentIndex]}</Text>
          <Text style={{ marginTop: 30, paddingHorizontal: 20, textAlign: 'center', fontFamily: 'SF-Thin', fontSize: 18 }}>{texts1[currentIndex]}</Text>
          
          <View style={{ flexDirection: 'row', marginTop: 50, marginBottom: 50 }}>
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

        {/* Bouton "Continuer" ou "Commencer" */}
        <Button text={buttonText} onPress={() => handleSwipe('left')} />
      </View>

      {/* Bouton "Passer" en haut à droite */}
      <TouchableOpacity style={{ position: 'absolute', top: 70, right: 30 }} onPress={handleSkip}>
        <Text style={{ color: '#6F26FF', fontSize: 16 }}>Passer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TutoScreen;
