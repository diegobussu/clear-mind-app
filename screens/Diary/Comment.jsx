import React from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, PanResponder } from 'react-native';
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

  const continueHandler = async () => {

    const journalID = route.params.journalID;
    const journalRef = doc(db, 'users', userId, 'journals', journalID);
    await updateDoc(journalRef, {
      emotions: emotions,
      updatedAt: Timestamp.now()
    });
  };


  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <View className="flex-row mt-5">
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
      <View style={styles.rectangle} className="mt-5">
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
        <Text className="font-sf-regular text-xl mt-3">Aujourd'hui, je me sens</Text>
        <Text className="font-sf-bold text-xl mt-3">{mood}</Text>
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

