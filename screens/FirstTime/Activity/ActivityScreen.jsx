// screens/ActivityScreen.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActivityScreen = ({ route }) => {
  const navigation = useNavigation();
  const { moodIndex } = route.params;
  const moods = ["Super", "Bien", "Bof", "Mal", "Terrible"];
  const mood = moods[moodIndex];
  const images = [
    require('../../../assets/img/mood-1.png'),
    require('../../../assets/img/mood-2.png'),
    require('../../../assets/img/mood-3.png'),
    require('../../../assets/img/mood-4.png'),
    require('../../../assets/img/mood-5.png')
  ];
  const selectedImage = images[moodIndex];

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={require('../../../assets/img/left-arrow.png')}
                style={styles.arrow}
                resizeMode="contain"
            />
        </TouchableOpacity>
        <Text style={styles.progressText}>2/4</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
                source={require('../../../assets/img/cross.png')}
                style={styles.cross}
                resizeMode="contain"
            />
        </TouchableOpacity>
        <View style={{marginBottom: 150}} />
      </View>
      <View style={styles.rectangle}>
        <Image source={selectedImage} style={styles.image} resizeMode="contain" />
        <Text style={styles.mainText}>Aujourd'hui, je me sens</Text>
        <Text style={styles.moodText}>{mood}</Text>
      </View>
    </View>
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
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingRight: 30
  },
  rectangle: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 50,
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 10
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
  arrow: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  cross: {
    width: 30,
    height: 30
  },
  progressText: {
    fontFamily: 'SF-Bold',
    fontSize: 20,
    textAlign: 'center',
  }
});

export default ActivityScreen;
