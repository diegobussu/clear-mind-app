import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, PanResponder } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const continueHandler = () => {
    const selectedCount = iconListIndex === 0 ? selectedIcons1.filter(icon => icon).length : selectedIcons2.filter(icon => icon).length;

    if (selectedCount === 0) {
      Alert.alert("Aucune sélection", "Une activité doit être sélectionnée.");
      return;
    }

    navigation.navigate('Emotion');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/left-arrow.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.progressText}>3/4</Text>
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
      <View style={styles.activities} {...panResponder.panHandlers}>
        <Text style={styles.changedText}>Comment te sens-tu ?</Text>
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
    fontFamily: 'SF-Bold',
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
    height: 30,
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
    marginTop: 20
  },
  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5
  }
});

export default Emotion;

