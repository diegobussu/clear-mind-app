import React, { useState } from 'react';
import { View, Text, Image, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const Comment = ({ route }) => {
  const navigation = useNavigation();
  const { moodIndex } = route.params;
  const moods = ["Super", "Bien", "Bof", "Mal", "Terrible"];
  const mood = moods[moodIndex];
  const images = [
    require('../../assets/img/mood/mood-1.png'),
    require('../../assets/img/mood/mood-2.png'),
    require('../../assets/img/mood/mood-3.png'),
    require('../../assets/img/mood/mood-4.png'),
    require('../../assets/img/mood/mood-5.png')
  ];
  const selectedImage = images[moodIndex];

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;
  const [note, setNote] = useState('');

  const continueHandler = async () => {
    try {
      if (note.length > 200) {
        Alert.alert('Erreur', 'La note ne doit pas dépasser 200 caractères.');
        return;
      }
  
      const journalID = route.params.journalID;
      const journalRef = doc(db, 'users', userId, 'journals', journalID);
      await updateDoc(journalRef, {
        note: note,
        updatedAt: Timestamp.now()
      });
      
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthenticatedApp' }],
      });

    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout de la note.');
    }
  };


  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-secondary-white">
      <View className="bg-[#EEEDFF] py-5 px-[50px] items-center rounded-[30px]">
        <Image source={selectedImage} className="w-[70px] h-[70px]" resizeMode="contain" />
        <Text className="font-Qs-Medium text-xl mt-3">Aujourd'hui, je me sens</Text>
        <Text className="font-Qs-Bold text-xl mt-3">{mood}</Text>
      </View>
      <Text className="font-Qs-Bold text-2xl mt-5">Note</Text>
      <View className="w-[350px] h-[200px] bg-[#EEEDFF] rounded-[30px] mt-5 mb-10">
        <TextInput
          className="font-Qs-Regular text-lg top-5 left-5 w-screen"
          placeholder="Ajouter une note..."
          onChangeText={setNote}
          placeholderTextColor={"#000"}
          value={note}
        />
      </View>
      <Button text="Terminer" onPress={continueHandler} />
    </SafeAreaView>
  );
};

export default Comment;

