import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const moodImages = [
  require('../../assets/img/mood/mood-1.png'),
  require('../../assets/img/mood/mood-2.png'),
  require('../../assets/img/mood/mood-3.png'),
  require('../../assets/img/mood/mood-4.png'),
  require('../../assets/img/mood/mood-5.png')
];

const Home = () => {
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weekDates, setWeekDates] = useState([]);
  const [userMood, setUserMood] = useState('');
  const [userNote, setUserNote] = useState('');
  const [userEmotions, setUserEmotions] = useState([]);
  const [userActivities, setUserActivities] = useState([]);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchUsername = async () => {
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };
    
    fetchUsername();

    setCurrentDate(moment().format('DD MMMM'));

    const startOfWeek = moment().startOf('isoWeek');
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startOfWeek.clone().add(i, 'days').format('DD'));
    }
    setWeekDates(dates);


    const fetchUserMood = async () => {
      if (userId) {
        const today = moment().format('DD-MM-YYYY');
        const q = query(collection(db, 'users', userId, 'journals'), where('__name__', '==', today));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserMood(doc.data().mood);
        });
      }
    };

    const fetchUserNote = async () => {
      if (userId) {
        const today = moment().format('DD-MM-YYYY');
        const q = query(collection(db, 'users', userId, 'journals'), where('__name__', '==', today));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserNote(doc.data().note);
        });
      }
    };

    const fetchUserEmotionsAndActivities = async () => {
      if (userId) {
        const today = moment().format('DD-MM-YYYY');
        const q = query(collection(db, 'users', userId, 'journals'), where('__name__', '==', today));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserEmotions(doc.data().emotions || []);
          setUserActivities(doc.data().activities || []);
        });
      }
    };

    fetchUserMood();
    fetchUserNote();
    fetchUserEmotionsAndActivities();

  }, [userId]);

  const daysOfWeek = [
    'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'
  ];

  // Déterminer l'indice de l'image en fonction du mood
  let moodIndex;
  switch (userMood) {
    case "Super":
      moodIndex = 0;
      break;
    case "Bien":
      moodIndex = 1;
      break;
    case "Bof":
      moodIndex = 2;
      break;
    case "Mal":
      moodIndex = 3;
      break;
    case "Terrible":
      moodIndex = 4;
      break;
    default:
      moodIndex = -1; // Utiliser une image par défaut ou afficher un message d'erreur
  }

  // Rendu de l'image de mood
  const moodImage = moodIndex !== -1 ? moodImages[moodIndex] : null;

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="absolute top-5 right-10 flex-row items-center">
          <View className="bg-white p-2 rounded-[30px] flex-row items-center">
            <Text className="font-Qs-SemiBold font-bold text-[20px] mr-2">{currentDate}</Text>
            <Ionicons name="calendar-outline" size={30} color={'#6331FF'} />
          </View>
        </View>

        <View className="absolute top-[30px] left-10">
          <Text className="font-Qs-SemiBold font-bold text-[20px]">
            <Text>Bonjour, </Text>
            <Text className="text-primary-purple">{username}</Text>
          </Text>
        </View>

        <View className="flex-row justify-center items-center mt-20">
          {daysOfWeek.map((day, index) => (
            <View key={index} className="flex items-center p-1 mx-2" style={{ backgroundColor: index === moment().isoWeekday() - 1 ? '#855EFF' : '#EEEDFF', borderRadius: 10 }}>
              <Text className="font-Qs-Regular text-[16px]" style={{ color: index === moment().isoWeekday() - 1 ? '#FFFFFF' : '#000000' }}>{day}</Text>
              <Text className="font-Qs-Bold text-[16px] mt-2" style={{ color: index === moment().isoWeekday() - 1 ? '#FFFFFF' : '#000000' }}>{weekDates[index]}</Text>
            </View>
          ))}
        </View>

        <View className="bg-primary-white rounded-[30px] py-5 items-center mt-10 mx-5">
          {moodImage && <Image source={moodImage} className="w-[70px] h-[70px]" />}
          <Text className="text-center font-Qs-Medium text-xl mt-3">Aujourd'hui, je me sens</Text>
          <Text className="text-center font-Qs-Bold text-xl mt-3">{userMood}</Text>

          <View className="flex-row mt-5">
            {userActivities.map((activity, index) => (
              <View key={index} className="bg-primary-purple rounded-full py-2 px-3 m-2">
                <Text className="text-primary-white">{activity}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row">
            {userEmotions.map((emotion, index) => (
              <View key={index} className="bg-primary-purple rounded-full py-2 px-3 m-2">
                <Text className="text-primary-white">{emotion}</Text>
              </View>
            ))}
          </View>

          <Text className="text-center font-Qs-SemiBold text-[18px] mt-3">Note</Text>
          <Text className="text-center font-Qs-SemiBold text-[14px] px-10 mt-3">{userNote}</Text>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
