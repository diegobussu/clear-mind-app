import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ActivityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { moodIndex } = route.params;
  const moods = ["Super", "Bien", "Bof", "Mal", "Terrible"];
  const mood = moods[moodIndex];
  const images = [
    require('../../assets/img/mood-1.png'),
    require('../../assets/img/mood-2.png'),
    require('../../assets/img/mood-3.png'),
    require('../../assets/img/mood-4.png'),
    require('../../assets/img/mood-5.png')
  ];
  const selectedImage = images[moodIndex];

  const [selectedIcons, setSelectedIcons] = useState(Array(18).fill(false));
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleIcon = (index) => {
    const updatedIcons = [...selectedIcons];
    const selectedCount = updatedIcons.filter(icon => icon).length;

    if (updatedIcons[index]) {
      updatedIcons[index] = false;
    } else {
      if (selectedCount < 3) {
        updatedIcons[index] = true;
      } else {
        Alert.alert("Limite atteinte", "Vous ne pouvez sélectionner que jusqu'à 3 activités.");
        return;
      }
    }

    setSelectedIcons(updatedIcons);
  };

  const continueHandler = () => {
    const selectedCount = selectedIcons.filter(icon => icon).length;
  
    if (selectedCount === 0) {
      Alert.alert("Aucune sélection", "Une activité doit être sélectionnée.");
      return;
    }
  
    if (selectedCount > 3) {
      Alert.alert("Limite atteinte", "Vous ne pouvez sélectionner que jusqu'à 3 activités.");
      return;
    }
  
    navigation.navigate('Emotion');
  };
  

  const icons = [
    { name: 'school-outline' },
    { name: 'briefcase-outline' },
    { name: 'time-outline' },
    { name: 'people-outline' },
    { name: 'home-outline' },
    { name: 'fast-food-outline' },
    { name: 'football-outline' },
    { name: 'bed-outline' },
    { name: 'cart-outline' },
    { name: 'extension-puzzle-outline' },
    { name: 'book-outline' },
    { name: 'musical-notes-outline' },
    { name: 'partly-sunny-outline' },
    { name: 'airplane-outline' },
    { name: 'game-controller-outline' },
    { name: 'heart-circle-outline' },
    { name: 'headset-outline' },
    { name: 'paw-outline' },
  ];

  const iconNames = [
    'École',
    'Travail',
    'Rendez-vous',
    'Amis',
    'Famille',
    'Restaurant',
    'Sport',
    'Sommeil',
    'Shopping',
    'Loisirs',
    'Lecture',
    'Musique',
    'Sorties',
    'Voyage',
    'Jeux vidéos',
    'Bien-être',
    'Détente',
    'Animaux'
  ];

  const renderIconGrid = () => {
    const iconRows = [];
    for (let i = 0; i < 3; i++) {
      const iconsInRow = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        const icon = icons[index];
        const isSelected = selectedIcons[index];
        const iconName = isSelected ? icon.name.replace("-outline", "") : icon.name;

        iconsInRow.push(
          <TouchableOpacity key={index} onPress={() => toggleIcon(index)} style={styles.iconContainer}>
            <Ionicons name={iconName} size={30} color={'#6331FF'} />
            <Text style={styles.iconName}>{iconNames[index]}</Text>
          </TouchableOpacity>
        );

      }
      iconRows.push(
        <View key={i} style={styles.iconRow}>
          {iconsInRow}
        </View>
      );
    }
    return iconRows;
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/left-arrow.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.progressText}>2/4</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/cross.png')}
            style={styles.cross}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={{ marginBottom: 80 }} />
      </View>
      <View style={styles.rectangle}>
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
        <Text style={styles.mainText}>Aujourd'hui, je me sens</Text>
        <Text style={styles.moodText}>{mood}</Text>
      </View>
      <View style={styles.activities}>
        <Text style={styles.changedText}>Quoi de neuf ?</Text>
        <Text style={styles.itemsText}>Plusieurs sélections possibles</Text>
        <View style={styles.iconGrid}>
          {renderIconGrid()}
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <TouchableOpacity
          onPress={() => setCurrentIndex(0)}
          style={[
            styles.point,
            { backgroundColor: currentIndex === 0 ? '#6F26FF' : 'rgba(86, 0, 255, 0.17)' }
          ]}
        />
        <TouchableOpacity
          onPress={() => setCurrentIndex(1)}
          style={[
            styles.point,
            { backgroundColor: currentIndex === 1 ? '#6F26FF' : 'rgba(86, 0, 255, 0.17)' }
          ]}
        />
      </View>
      <View style={styles.bottomContent}>
        <Button text="Continuer" onPress={continueHandler} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  bottomContent: {
    marginBottom: 50
  },
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
    fontSize:    20,
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
    marginTop: 50,
    marginBottom: 30
  },
  itemsText: {
    fontFamily: 'SF-Ultralight',
    fontSize: 18,
    textAlign: 'center'
  },
  arrow: {
    width: 20,
    height: 20,
    marginRight: 'auto'
  },
  cross: {
    width: 30,
    height: 30,
    marginLeft: 'auto'
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
    justifyContent: 'flex-start'
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
  iconName: {
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'SF-Regular',
    fontSize: 14,
    color: '#6331FF'
  },
  pointsContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
});

export default ActivityScreen;

