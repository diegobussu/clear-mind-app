import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    const { firstName } = route.params;

    useEffect(() => {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setCurrentDate(date.toLocaleDateString('fr-FR', options));
      setCurrentTime(date.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'}));
    }, []);
  
    const handleStart = () => {
      if (selectedIndex === null) {
        Alert.alert("Aucune sélection", "Une humeur doit être sélectionnée.");
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
      <SafeAreaView style={styles.container}>
        <View style={styles.topContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../../assets/img/left-arrow.png')}
                    style={styles.arrow}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.progressText}>1/4</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../../assets/img/cross.png')}
                    style={styles.cross}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <View style={{marginBottom: 150}} />
        </View>
        <View style={styles.middleContent}>
          <Text style={styles.greetingText}>Bonjour {firstName} !</Text>
          <Text style={styles.text}>Comment vas-tu aujourd’hui ?</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateTimeContainer}>
                <Image
                source={require('../../assets/img/calendar.png')}
                style={styles.icon}
                resizeMode="contain"
                />
                <Text style={styles.dateTimeText}>{currentDate}</Text>
                <View style={{marginRight: 40}} />
                <Image
                source={require('../../assets/img/clock.png')}
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
        <Button text="Continuer" onPress={handleStart} />
      </SafeAreaView>
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
      marginTop: 20
    },
    middleContent: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
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
    greetingText: {
      fontFamily: 'SF-Bold',
      fontSize: 26,
      marginBottom: 20,
    },
    text: {
      fontFamily: 'SF-Semibold',
      fontSize: 22,
      marginTop: 30,
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
    icon: {
      width: 20,
      height: 20,
      marginRight: 10
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
      flex: 1
    },
  });

export default Mood;
