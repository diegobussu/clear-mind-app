import React, { useState } from 'react';
import { View, SafeAreaView, Text, Image, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import ButtonWhite from '../../components/ButtonWhite';

const images = [
  require('../../assets/img/login-1.png')
];

const text = "Pour commencer comment devons nous t’appeler ?";

const Username = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  const handleStart = async () => {
    if (userName.trim() === '') {
      Alert.alert('Attention', 'Le nom ne peut pas être vide.');
      return;
    }

    if (userName.length < 3) {
      Alert.alert('Attention', 'Le nom ne peut pas être inférieur à 3 caractères.');
      return;
    }

    if (userName.length > 20) {
      Alert.alert('Attention', 'Le nom ne peut pas dépasser 20 caractères.');
      return;
    }
    
    // Vérifier si le nom contient autre chose que des lettres et des chiffres
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(userName)) {
      Alert.alert('Attention', 'Le nom ne peut contenir que des lettres et des chiffres.');
      return;
    }


    try {
      // Mettre à jour le document de l'utilisateur avec le nom d'utilisateur
      await updateDoc(doc(db, 'user', userId), {
        username: userName
      });
  
      // Naviguer vers la prochaine étape avec le nom d'utilisateur
      navigation.navigate('Mood', { userName: userName });
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout du nom.');
    }
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
          placeholder="Nom"
          placeholderTextColor="#C6A9FF"
          onChangeText={text => setUserName(text)}
          value={userName}
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

export default Username;
