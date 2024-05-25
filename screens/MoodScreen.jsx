// screens/MoodScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

const images = [
  require('../assets/img/mood-1.png'),
  require('../assets/img/mood-2.png'),
  require('../assets/img/mood-3.png'),
  require('../assets/img/mood-4.png'),
  require('../assets/img/mood-5.png')
];

const texts = [
  "Super",
  "Bien",
  "Bof",
  "Mal",
  "Terrible"
];

const MoodScreen = () => {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(date.toLocaleDateString('fr-FR', options));
      setCurrentTime(date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}));
    }, []);
  
    const handleStart = () => {
      if (selectedIndex === null) {
        Alert.alert("Aucune sélection", "Veuillez sélectionner une image avant de continuer.");
        return;
      }
      navigation.navigate('Activity', { moodIndex: selectedIndex });
    };

    const handleImagePress = (index) => {
      setSelectedIndex(index);
    };

    const renderItem = ({ item, index }) => {
      const isSelected = selectedIndex === index;

      return (
        <TouchableOpacity onPress={() => handleImagePress(index)}>
          <View style={styles.imageContainer}>
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
      <View style={styles.container}>
        <View style={styles.topContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../assets/img/left-arrow.png')}
                    style={styles.arrow}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.progressText}>1/4</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../assets/img/cross.png')}
                    style={styles.cross}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={{marginBottom: 150}} />
          </View>
        <View style={styles.middleContent}>
          <Text style={styles.text}>Comment vas-tu aujourd’hui ?</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateTimeContainer}>
                <Image
                source={require('../assets/img/calendar.png')}
                style={styles.icon}
                resizeMode="contain"
                />
                <Text style={styles.dateTimeText}>{currentDate}</Text>
                <View style={{marginRight: 40}} />
                <Image
                source={require('../assets/img/clock.png')}
                style={styles.icon}
                resizeMode="contain"
                />
                <Text style={styles.dateTimeText}>{currentTime}</Text>
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
        <View style={styles.bottomContent}>
          <Button text="Continuer" onPress={handleStart} />
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 30,
      paddingHorizontal: 20,
      backgroundColor: '#F9F9FF'
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        paddingRight: 30
      },
    middleContent: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginTop: 50,
    },
    bottomContent: {
      marginBottom: 50
    },
    imageContainer: {
      alignItems: 'center',
      marginTop: 50
    },
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
    text: {
      fontFamily: 'SF-Semibold',
      fontSize: 22,
      marginBottom: 30,
    },
    dateContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#6331FF'
    },
    dateTimeContainer: {
      flexDirection: 'row',
      alignItems: 'center'
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
    dateTimeText: {
      fontFamily: 'SF-Regular',
      fontSize: 16,
      color: '#6331FF',
      textDecorationLine: 'underline'
    },
    progressText: {
        fontFamily: 'SF-Bold',
        fontSize: 20,
        textAlign: 'center',
      },
  });

export default MoodScreen;
