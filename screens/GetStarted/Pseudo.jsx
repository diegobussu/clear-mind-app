import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonWhite from '../../components/ButtonWhite';

const images = [
  require('../../assets/img/login-1.png')
];

const text = "Pour commencer comment devons nous t’appeler ?";

const Pseudo = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
  }, []);

  const handleStart = () => {
    // Vérifier si le prénom est vide ou dépasse 50 caractères
    if (firstName.trim() === '') {
      Alert.alert('Attention', 'Le pseudo ne peut pas être vide.');
      return;
    }

    if (firstName.length < 3) {
      Alert.alert('Attention', 'Le pseudo ne peut pas être inférieur à 3 caractères.');
      return;
    }

    if (firstName.length > 50) {
      Alert.alert('Attention', 'Le pseudo ne peut pas dépasser 50 caractères.');
      return;
    }
    
    // Vérifier si le pseudo contient autre chose que des lettres et des chiffres
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(firstName)) {
      Alert.alert('Attention', 'Le pseudo ne peut contenir que des lettres et des chiffres.');
      return;
    }

    // Naviguer vers MoodScreen lorsque le bouton "Continuer" est pressé
    navigation.navigate('Mood', { firstName: firstName });
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center px-5 bg-secondary-white">
      <View className="items-center justify-center mb-[110px]">
        <Image
          source={images[0]}
          className="w-[330px] h-[280px] mb-5"
          resizeMode="contain"
        />
        <Text className="text-center font-sf-semibold text-2xl mb-10">{text}</Text>
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          placeholderTextColor="#C6A9FF"
          onChangeText={text => setFirstName(text)}
          value={firstName}
          className="mb-[120px]"
        />
        <ButtonWhite text="Continuer" onPress={handleStart} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#F2EDFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 250,
    fontFamily: 'SF-Regular',
    fontSize: 16,
    backgroundColor: '#F9F9FF',
    color: '#000'
  }
});

export default Pseudo;
