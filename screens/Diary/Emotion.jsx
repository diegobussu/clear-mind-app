import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const Emotion = ({ route }) => {
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
    const selectedCount1 = selectedIcons1.filter(icon => icon).length;
    const selectedCount2 = selectedIcons2.filter(icon => icon).length;
  
    if (selectedCount1 === 0 && selectedCount2 === 0) {
      Alert.alert("Aucune sélection", "Une émotion doit être sélectionnée pour la première liste.");
      return;
    }

    const userId = auth.currentUser?.uid;
    // Tableau pour stocker les noms des icônes sélectionnées
    const emotions = [];

    // Ajouter les noms des icônes sélectionnées pour la première liste
    selectedIcons1.forEach((isSelected, index) => {
      if (isSelected) {
        emotions.push(iconNamesList[0][index]);
      }
    });

    // Ajouter les noms des icônes sélectionnées pour la deuxième liste
    selectedIcons2.forEach((isSelected, index) => {
      if (isSelected) {
        emotions.push(iconNamesList[1][index]);
      }
    });

    const journalID = route.params.journalID;
    const journalRef = doc(db, 'users', userId, 'journals', journalID);
    await updateDoc(journalRef, {
      emotions: emotions,
      updatedAt: Timestamp.now()
    });
  
    navigation.navigate('Comment', { moodIndex, journalID: journalRef.id });
  };
  
  
  
  
  

  const iconsList = [
    [
      require('../../assets/img/emotions/happy.png'),
      require('../../assets/img/emotions/excited.png'),
      require('../../assets/img/emotions/relaxed.png'),
      require('../../assets/img/emotions/satisfied.png'),
      require('../../assets/img/emotions/sleep.png'),
      require('../../assets/img/emotions/angry.png'),
      require('../../assets/img/emotions/stress.png'),
      require('../../assets/img/emotions/anxious.png'),
      require('../../assets/img/emotions/sad.png')
    ],
    [
      require('../../assets/img/emotions/bored.png'),
      require('../../assets/img/emotions/uncertain.png'),
      require('../../assets/img/emotions/desperate.png'),
      require('../../assets/img/emotions/confused.png'),
      require('../../assets/img/emotions/frustrated.png'),
      require('../../assets/img/emotions/depressed.png'),
      require('../../assets/img/emotions/sick.png'),
      require('../../assets/img/emotions/sad1.png'),
      require('../../assets/img/emotions/inspired.png')
    ]
  ];

  const iconNamesList = [
    [
      'Heureux',
      'Excité',
      'Détendu',
      'Satisfait',
      'Fatigué',
      'Enervé',
      'Stressé',
      'Anxieux',
      'Triste'
    ],
    [
      'Ennuyé',
      'Incertain',
      'Désespéré',
      'Confus',
      'Frustré',
      'Déprimé',
      'Malade',
      'Ému',
      'Inspiré',
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
        const iconSource = icon;
        const containerStyle = [styles.iconWrapper, isSelected ? styles.selectedIconWrapper : null];
        const iconStyle = styles.iconImage;
        const textStyle = isSelected ? styles.selectedIconName : styles.iconName;

        iconsInRow.push(
          <TouchableOpacity key={index} onPress={() => toggleIcon(index)} style={styles.iconContainer}>
            <View style={containerStyle}>
              <Image source={iconSource} style={iconStyle} />
            </View>
            <Text style={textStyle}>{currentIconNames[index]}</Text>
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
      <View className="flex-row mt-10">
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                  name="arrow-back-circle"
                  size={40} 
                  color={'#6331FF'}
              />
          </TouchableOpacity>
          <Text className="flex-1 font-sf-bold text-xl mt-2 text-center">3/4</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Username')}>
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
      <View {...panResponder.panHandlers}>
        <Text className="font-sf-medium text-[22px] text-center mb-5 mt-5">Comment te sens-tu ?</Text>
        <Text className="font-sf-ultralight text-primary-grey text-2lg text-center">Plusieurs sélections possibles</Text>
        <View style={styles.iconGrid}>
          {renderIconGrid()}
        </View>
      </View>
      <View className="flex-row mt-3">
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
    width: 20,
    height: 20,
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
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
});

export default Emotion;

