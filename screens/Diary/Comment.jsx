import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
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

      const journalID = route.params.journalID;
      const journalRef = doc(db, 'users', userId, 'journals', journalID);
      await updateDoc(journalRef, {
        note: note,
        updatedAt: Timestamp.now()
      });

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout de la note.');
    }
  };


  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <View className="flex-row">
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                  name="arrow-back-circle"
                  size={40} 
                  color={'#6331FF'}
              />
          </TouchableOpacity>
          <Text className="flex-1 font-sf-bold text-xl mt-2 text-center">4/4</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                  name="close-circle"
                  size={40} 
                  color={'#6331FF'}
              />
          </TouchableOpacity>
      </View>
      <View style={styles.rectangle} className="mt-[100px]">
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
        <Text className="font-sf-regular text-xl mt-3">Aujourd'hui, je me sens</Text>
        <Text className="font-sf-bold text-xl mt-3">{mood}</Text>
      </View>
      <Text className="font-sf-regular text-2xl mt-10">Note</Text>
      <View className="w-[350px] h-[200px] bg-primary-white rounded-[30px] mt-5 mb-10">
        <TextInput
          className="text-lg text-[#828282] top-5 left-5"
          placeholder="Ajouter une note..."
          onChangeText={setNote}
          value={note}
        />
      </View>
      <Button text="Terminer" onPress={continueHandler} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 50,
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 20
  }
});

export default Comment;

