import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";


const Activity = ({ route }) => {
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

  const [selectedIcons1, setSelectedIcons1] = useState(Array(9).fill(false));
  const [selectedIcons2, setSelectedIcons2] = useState(Array(9).fill(false));
  const [totalSelectedCount, setTotalSelectedCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iconListIndex, setIconListIndex] = useState(0);

  const toggleIcon = (index) => {
    const currentIcons = iconListIndex === 0 ? selectedIcons1 : selectedIcons2;
    const updatedIcons = [...currentIcons];
    const isSelected = updatedIcons[index];
    const selectedCount = totalSelectedCount + (isSelected ? -1 : 1);
  
    if (selectedCount > 3) {
      Alert.alert("Limite atteinte", "Vous ne pouvez sélectionner que jusqu'à 3 activités.");
      return;
    }
  
    updatedIcons[index] = !isSelected;
    if (iconListIndex === 0) {
      setSelectedIcons1(updatedIcons);
    } else {
      setSelectedIcons2(updatedIcons);
    }
    setTotalSelectedCount(selectedCount);
  };

  const auth = getAuth(app);
  const db = getFirestore(app);


  
  const continueHandler = async () => {
    const selectedCount = iconListIndex === 0 ? selectedIcons1.filter(icon => icon).length : selectedIcons2.filter(icon => icon).length;
  
    if (selectedCount === 0) {
      Alert.alert("Aucune sélection", "Une activité doit être sélectionnée.");
      return;
    }
  
    try {
      const userId = auth.currentUser?.uid;
      const activities = [];
  
      // Construction du tableau d'activités avec les noms correspondants
      const currentIconNames = iconNamesList[iconListIndex];
      const selectedIcons = iconListIndex === 0 ? selectedIcons1 : selectedIcons2;
      selectedIcons.forEach((isSelected, index) => {
        if (isSelected) {
          activities.push(currentIconNames[index]);
        }
      });
  
      // Mise à jour du document dans la collection 'journals' de l'utilisateur
      const journalID = route.params.journalID; // Récupérez l'identifiant du journal depuis les paramètres de route
      const journalRef = doc(db, 'users', userId, 'journals', journalID); // Référence au document journal de l'utilisateur
      await updateDoc(journalRef, {
        activities: activities,
        updatedAt: Timestamp.now()
      });
  
      navigation.navigate('Emotion', { moodIndex });
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout des activités.');
    }
  };
  
  
  

  const iconsList = [
    [
      { name: 'school-outline' },
      { name: 'briefcase-outline' },
      { name: 'time-outline' },
      { name: 'people-outline' },
      { name: 'home-outline' },
      { name: 'fast-food-outline' },
      { name: 'football-outline' },
      { name: 'bed-outline' },
      { name: 'cart-outline' }
    ],
    [
      { name: 'extension-puzzle-outline' },
      { name: 'book-outline' },
      { name: 'musical-notes-outline' },
      { name: 'partly-sunny-outline' },
      { name: 'airplane-outline' },
      { name: 'game-controller-outline' },
      { name: 'heart-circle-outline' },
      { name: 'headset-outline' },
      { name: 'paw-outline' }
    ]
  ];

  const iconNamesList = [
    [
      'École',
      'Travail',
      'Rendez-vous',
      'Amis',
      'Famille',
      'Restaurant',
      'Sport',
      'Sommeil',
      'Shopping'
    ],
    [
      'Loisirs',
      'Lecture',
      'Musique',
      'Sorties',
      'Voyage',
      'Jeux vidéos',
      'Bien-être',
      'Détente',
      'Animaux'
    ]
  ];

  const renderIconGrid = () => {
    const iconRows = [];
    const currentIcons = iconsList[iconListIndex];
    const currentIconNames = iconNamesList[iconListIndex];
    for (let i = 0; i < 3; i++) {
      const iconsInRow = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const icon = currentIcons[index];
        const isSelected = iconListIndex === 0 ? selectedIcons1[index] : selectedIcons2[index];
        const containerStyle = [styles.iconWrapper, isSelected ? styles.selectedIconWrapper : null];
        const iconSource = icon.name;
        const textStyle = isSelected ? styles.selectedIconName : styles.iconName;

        iconsInRow.push(
          <TouchableOpacity key={index} onPress={() => toggleIcon(index)} style={styles.iconContainer}>
            <View style={containerStyle}>
              <Ionicons name={iconSource} size={30} color={'#6331FF'} />
            </View>
            <Text style={textStyle}>{currentIconNames[index]}</Text>
          </TouchableOpacity>
        )
      }
      iconRows.push(
        <View key={i} style={styles.iconRow}>
          {iconsInRow}
        </View>
      );
    }
    return iconRows;
  };

  const handlePointPress = (index) => {
    setCurrentIndex(index);
    setIconListIndex(index);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderGrant: (evt, gestureState) => {},
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderRelease: (evt, gestureState) => {
      const { dx } = gestureState;
      if (Math.abs(dx) > 10) {
        if (dx > 0) {
          handleSwipeRight();
        } else {
          handleSwipeLeft();
        }
      }
    }
  });

  const handleSwipeRight = () => {
    const newIndex = currentIndex === 0 ? iconsList.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIconListIndex(newIndex);
  };

  const handleSwipeLeft = () => {
    const newIndex = currentIndex === iconsList.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIconListIndex(newIndex);
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
          <Text className="flex-1 font-sf-bold text-xl mt-2 text-center">2/4</Text>
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
        <Text style={styles.mainText}>Aujourd'hui, je me sens</Text>
        <Text style={styles.moodText}>{mood}</Text>
      </View>
      <View style={styles.activities} {...panResponder.panHandlers}>
        <Text style={styles.changedText}>Quoi de neuf ?</Text>
        <Text style={styles.itemsText}>Plusieurs sélections possibles</Text>
        <View style={styles.iconGrid}>
          {renderIconGrid()}
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <TouchableOpacity
          onPress={() => handlePointPress(0)}
          style={[
            styles.point,
            { backgroundColor: currentIndex === 0 ? '#6F26FF' : 'rgba(86, 0, 255, 0.17)' }
          ]}
        />
        <TouchableOpacity
          onPress={() => handlePointPress(1)}
          style={[
            styles.point,
            { backgroundColor: currentIndex === 1 ? '#6F26FF' : 'rgba(86, 0, 255, 0.17)' }
          ]}
        />
      </View>
      <Button text="Continuer" onPress={continueHandler} />
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
  },
  mainText: {
    fontFamily: 'SF-Regular',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  moodText: {
    fontFamily: 'SF-Bold',
    fontSize: 20,
    textAlign: 'center'
  },
  changedText: {
    fontFamily: 'SF-Medium',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 30
  },
  itemsText: {
    fontFamily: 'SF-Ultralight',
    fontSize: 18,
    textAlign: 'center'
  },
  progressText: {
    fontFamily: 'SF-Bold',
    fontSize: 20,
    textAlign: 'center',
    flex: 1
  },
  iconGrid: {
    marginTop: 20,
    width: 300,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  iconContainer: {
    width: 80,
    marginHorizontal: 10,
    alignItems: 'center'
  },
  iconWrapper: {
    borderWidth: 2,
    borderColor: '#6331FF',
    borderRadius: 15,
    padding: 15,
  },
  selectedIconWrapper: {
    borderWidth: 4,
  },
  iconImage: {
    width: 30,
    height: 30
  },
  iconName: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'SF-Regular',
    fontSize: 13,
    color: '#6331FF'
  },
  selectedIconName: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'SF-Bold',
    color: '#6331FF'
  },
  pointsContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
});

export default Activity;

