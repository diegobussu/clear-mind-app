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

  const continueHandler = async () => {
    try {
      const userId = auth.currentUser?.uid;
      await updateDoc(doc(db, 'diary', userId), {
        updatedAt: Timestamp.now()
      });
    
      navigation.navigate('Comment');
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout des émotions.');
    }
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
        <Text style={styles.mainText}>Aujourd'hui, je me sens</Text>
        <Text style={styles.moodText}>{mood}</Text>
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
  }
});

export default Comment;

