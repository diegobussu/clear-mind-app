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
      await updateDoc(doc(db, 'users', userId), {
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
        <Text className="text-center font-sf-medium text-2xl mb-10">{text}</Text>
        <TextInput
          placeholder="Prénom"
          placeholderTextColor="#6331FF"
          onChangeText={text => setUserName(text)}
          value={userName}
          className="text-center text-primary-purple bg-[#F2EDFF] p-3 mb-[120px] w-[250px] font-sf-medium text-[16px] rounded-[15px] border border-primary-purple"
        />
        <ButtonWhite text="Continuer" onPress={handleStart} />
      </View>
    </SafeAreaView>
  );
};

export default Username;
