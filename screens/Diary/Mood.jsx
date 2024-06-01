import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign} from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, setDoc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Button from '../../components/Button';
import moment from 'moment';

const images = [
  require('../../assets/img/mood/mood-1.png'),
  require('../../assets/img/mood/mood-2.png'),
  require('../../assets/img/mood/mood-3.png'),
  require('../../assets/img/mood/mood-4.png'),
  require('../../assets/img/mood/mood-5.png')
];

const texts = [
  "Super",
  "Bien",
  "Bof",
  "Mal",
  "Terrible"
];

const Mood = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const { userName } = route.params;
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(date.toLocaleDateString('fr-FR', options));
      setCurrentTime(date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}));
    }, []);
  

    const handleStart = async () => {
      if (selectedIndex === null) {
        Alert.alert("Aucune sélection", "Une humeur doit être sélectionnée.");
        return;
      }
    
      try {
        const userId = auth.currentUser?.uid;
        const moodName = texts[selectedIndex];
    
        // Obtenir la date actuelle avec Moment.js
        const currentDate = moment().startOf('day');
        const currentFormattedDate = currentDate.format('DD-MM-YYYY');
    
        // Créer une référence à la date actuelle dans la collection "journals" de l'utilisateur
        const currentJournalRef = doc(db, "users", userId, "journals", currentFormattedDate);
    
        // Vérifier si un document existe déjà pour la date actuelle
        const currentJournalSnap = await getDoc(currentJournalRef);
        if (currentJournalSnap.exists()) {
          // Un document existe déjà, mettez à jour le mood et la date de mise à jour
          await updateDoc(currentJournalRef, {
            moodName: moodName,
            updatedAt: Timestamp.now()
          });
        } else {
          // Aucun document pour la date actuelle, créer un nouveau document
          const journalData = {
            moodName: moodName,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          };
          
          // Créez une nouvelle référence pour le nouveau journal
          await setDoc(currentJournalRef, journalData);
        }
    
        navigation.navigate('Activity', { moodIndex: selectedIndex, journalID: currentFormattedDate });
      } catch (error) {
        console.log(error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout du mood.');
      }
    };
    
    
    
    
    

    const handleImagePress = (index) => {
      setSelectedIndex(index);
    };

    const renderItem = ({ item, index }) => {
      const isSelected = selectedIndex === index;

      return (
        <TouchableOpacity onPress={() => handleImagePress(index)}>
          <View className="items-center mt-10">
            <Image
              source={item}
              style={[styles.image, isSelected && styles.selectedImage]}
              resizeMode="contain"
            />
            <Text style={[styles.imageText, isSelected && styles.selectedText]}>
              {texts[index]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    const ItemSeparator = () => <View style={{ width: 20 }} />;

    return (
      <SafeAreaView className="flex-1 justify-center px-5 bg-secondary-white">
        <View className="flex-1 justify-center items-center mt-[50px]">
          <Text className="font-Qs-SemiBold text-[28px]">Bonjour {userName},</Text>
          <Text className="font-Qs-Medium text-xl mt-10 mb-10">Comment vas-tu aujourd’hui ?</Text>
          <View style={styles.dateContainer}>
            <View className="flex-row items-center">
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color='#6331FF'
                />
                <Text className="text-primary-purple ml-2 text-lg font-Qs-Medium underline">{currentDate}</Text>
                <View style={{marginRight: 40}} />
                <AntDesign
                  name="clockcircleo"
                  size={20}
                  color='#6331FF'
                />
                <Text className="text-primary-purple ml-2 text-lg font-Qs-Medium underline">{currentTime}</Text>
            </View>
          </View>
          <FlatList
            data={images}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
        <Button text="Continuer" onPress={handleStart} />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    image: {
      width: 50,
      height: 50,
      marginBottom: 10
    },
    selectedImage: {
      width: 55,
      height: 55
    },
    imageText: {
      fontFamily: 'SF-Regular',
      fontSize: 16
    },
    selectedText: {
      fontFamily: 'SF-Bold',
    },
    dateContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#6331FF'
    }
  });

export default Mood;
