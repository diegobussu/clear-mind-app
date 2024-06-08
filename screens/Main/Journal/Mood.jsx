import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign} from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, setDoc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import Button from '../../../components/Button';
import moment from 'moment';
import 'moment/locale/fr';

const images = [
  require('../../../assets/img/mood/mood-1.png'),
  require('../../../assets/img/mood/mood-2.png'),
  require('../../../assets/img/mood/mood-3.png'),
  require('../../../assets/img/mood/mood-4.png'),
  require('../../../assets/img/mood/mood-5.png')
];

const texts = [
  "Super",
  "Bien",
  "Bof",
  "Mal",
  "Terrible"
];

const Mood = ({ route }) => {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [username, setUsername] = useState('');
    const selectedDate = route.params && route.params.selectedDate;

    const auth = getAuth(app);
    const db = getFirestore(app);
    const userId = auth.currentUser?.uid;

    const checkJournalEntry = useCallback(async () => {
      if (userId) {

        let currentDate;
        if (selectedDate) {
          // Si selectedDate est défini, utilisez-le
          currentDate = moment(selectedDate, 'DD/MM/YYYY').startOf('day').format('DD-MM-YYYY');
        } else {
          // Sinon, utilisez la date actuelle
          currentDate = moment().startOf('day').format('DD-MM-YYYY');
        }
        
        const currentJournalRef = doc(db, 'users', userId, 'journals', currentDate);
        const currentJournalSnap = await getDoc(currentJournalRef);
        if (currentJournalSnap.exists()) {
          Alert.alert(
            'Journal déjà rempli',
            'Vous avez déjà rempli votre journal pour aujourd\'hui.',
            [
              {
                text: 'Éditer'
              },
              {
                text: 'Annuler',
                onPress: () => {
                  navigation.goBack();
                },
                style: 'cancel'
              }
            ]
          );
        }
      }
    }, [db, navigation, userId]);

    useEffect(() => {
      moment.locale('fr');

      if (selectedDate) {
        // Si selectedDate est défini, utilisez-le pour mettre à jour la date actuelle
        const parsedDate = moment(selectedDate, 'DD/MM/YYYY');
        const formattedDate = parsedDate.format('DD MMMM');
        setCurrentDate(formattedDate);
      } else {
        // Sinon, utilisez la date actuelle
        const currentDate = moment().format('DD MMMM');
        setCurrentDate(currentDate);
      }
    
      // Mise à jour de l'heure actuelle avec Moment.js
      const currentTime = moment().format('HH:mm');
      setCurrentTime(currentTime);

      const fetchUsername = async () => {
        if (userId) {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username);
          }
        }
      };
      fetchUsername();
    }, [selectedDate, userId]);
    
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        checkJournalEntry();
      });
  
      return unsubscribe;
    }, [navigation, checkJournalEntry]);


    const handleStart = async () => {
      if (selectedIndex === null) {
        Alert.alert("Aucune sélection", "Une humeur doit être sélectionnée.");
        return;
      }
    
      try {
        const userId = auth.currentUser?.uid;
        const moodName = texts[selectedIndex];
    
        let currentDate;
        if (selectedDate) {
          // Si selectedDate est défini, utilisez-le
          currentDate = moment(selectedDate, 'DD/MM/YYYY').startOf('day').format('DD-MM-YYYY');
        } else {
          // Sinon, utilisez la date actuelle
          currentDate = moment().startOf('day').format('DD-MM-YYYY');
        }
    
        // Créer une référence à la date actuelle dans la collection "journals" de l'utilisateur
        const currentJournalRef = doc(db, "users", userId, "journals", currentDate);
    
        // Vérifier si un document existe déjà pour la date actuelle
        const currentJournalSnap = await getDoc(currentJournalRef);
        if (currentJournalSnap.exists()) {
          // Un document existe déjà, mettez à jour le mood et la date de mise à jour
          await updateDoc(currentJournalRef, {
            mood: moodName,
            updatedAt: Timestamp.now()
          });
        } else {
          // Aucun document pour la date actuelle, créer un nouveau document
          const journalData = {
            mood: moodName,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
          };
          
          // Créez une nouvelle référence pour le nouveau journal
          await setDoc(currentJournalRef, journalData);
        }
    
        navigation.navigate('Activity', { moodIndex: selectedIndex, journalID: currentDate });
      } catch (error) {
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
          <Text className="font-Qs-SemiBold text-[28px]">Bonjour {username},</Text>
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
      fontFamily: 'Qs-Bold',
      borderWidth: 2,
      borderRadius: 50,
      borderColor: '#000'
    },
    imageText: {
      fontFamily: 'Qs-Regular',
      fontSize: 16
    },
    selectedText: {
      fontFamily: 'Qs-Bold',
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
