// screens/LoginScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonWhite from '../components/ButtonWhite';

const images = [
  require('../assets/img/login-1.png')
];

const text = "Pour commencer comment devons nous t’appeler ?";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
  }, []);

  const handleStart = () => {
    // Vérifier si le prénom est vide ou dépasse 50 caractères
    if (firstName.trim() === '') {
      Alert.alert('Attention', 'Le prénom ne peut pas être vide.');
      return;
    }

    if (firstName.length < 3) {
      Alert.alert('Attention', 'Le prénom ne peut pas être inférieur à 3 caractères.');
      return;
    }

    if (firstName.length > 50) {
      Alert.alert('Attention', 'Le prénom ne peut pas dépasser 50 caractères.');
      return;
    }
    
    // Vérifier si le prénom contient autre chose que des lettres et des chiffres
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(firstName)) {
      Alert.alert('Attention', 'Le prénom ne peut contenir que des lettres et des chiffres.');
      return;
    }

    // Naviguer vers MoodScreen lorsque le bouton "Continuer" est pressé
    navigation.navigate('Mood');
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleContent}>
        <Image
          source={images[0]}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text}>{text}</Text>
        <TextInput
          style={styles.input}
          placeholder="Pseudonyme"
          placeholderTextColor="#C6A9FF"
          onChangeText={text => setFirstName(text)}
          value={firstName}
        />
      </View>
      <View style={styles.bottomContent}>
        <ButtonWhite text="Continuer" onPress={handleStart} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 150,
    paddingHorizontal: 20,
    backgroundColor: '#F9F9FF'
  },
  middleContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomContent: {
    marginBottom: 50
  },
  image: {
    width: 330,
    height: 280,
    marginBottom: 30
  },
  text: {
    textAlign: 'center',
    fontFamily: 'SF-Semibold',
    fontSize: 22
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#F2EDFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 20,
    width: 250,
    fontFamily: 'SF-Regular',
    fontSize: 16,
    backgroundColor: '#F9F9FF',
    color: '#000'
  }
});

export default LoginScreen;
