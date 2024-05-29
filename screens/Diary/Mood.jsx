import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign} from '@expo/vector-icons';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, setDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";


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

        await setDoc(doc(db, "diary", userId), {
          userId: userId,
          moodName: moodName,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });

        navigation.navigate('Activity', { moodIndex: selectedIndex });
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
        <View className="flex-row mt-5">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name="arrow-back-circle"
                    size={40} 
                    color={'#6331FF'}
                />
            </TouchableOpacity>
            <Text className="flex-1 font-sf-bold text-xl mt-2 text-center">1/4</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                    name="close-circle"
                    size={40} 
                    color={'#6331FF'}
                />
            </TouchableOpacity>
            <View className="mb-[150px]"/>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="font-sf-bold text-2xl">Bonjour {userName} !</Text>
          <Text className="font-sf-semibold text-xl mt-10 mb-10">Comment vas-tu aujourd’hui ?</Text>
          <View style={styles.dateContainer}>
            <View className="flex-row items-center">
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color='#6331FF'
                />
                <Text className="text-primary-purple ml-2 text-lg font-sf-regular underline">{currentDate}</Text>
                <View style={{marginRight: 40}} />
                <AntDesign
                  name="clockcircleo"
                  size={20}
                  color='#6331FF'
                />
                <Text className="text-primary-purple ml-2 text-lg font-sf-regular underline">{currentTime}</Text>
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
