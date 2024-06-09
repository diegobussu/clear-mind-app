import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, Image } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

import mood1 from '../../assets/img/mood/mood-1.png';
import mood2 from '../../assets/img/mood/mood-2.png';
import mood3 from '../../assets/img/mood/mood-3.png';
import mood4 from '../../assets/img/mood/mood-4.png';
import mood5 from '../../assets/img/mood/mood-5.png';

import emotion1 from '../../assets/img/emotions/happy.png';
import emotion2 from '../../assets/img/emotions/excited.png';
import emotion3 from '../../assets/img/emotions/relaxed.png';
import emotion4 from '../../assets/img/emotions/satisfied.png';
import emotion5 from '../../assets/img/emotions/sleep.png';
import emotion6 from '../../assets/img/emotions/angry.png';
import emotion7 from '../../assets/img/emotions/stress.png';
import emotion8 from '../../assets/img/emotions/anxious.png';
import emotion9 from '../../assets/img/emotions/sad.png';
import emotion10 from '../../assets/img/emotions/bored.png';
import emotion11 from '../../assets/img/emotions/uncertain.png';
import emotion12 from '../../assets/img/emotions/desperate.png';
import emotion13 from '../../assets/img/emotions/confused.png';
import emotion14 from '../../assets/img/emotions/frustrated.png';
import emotion15 from '../../assets/img/emotions/depressed.png';
import emotion16 from '../../assets/img/emotions/sick.png';
import emotion17 from '../../assets/img/emotions/sad1.png';
import emotion18 from '../../assets/img/emotions/inspired.png';

const emotionIconsMap = {
  'Heureux': emotion1,
  'Excité': emotion2,
  'Détendu': emotion3,
  'Satisfait': emotion4,
  'Fatigué': emotion5,
  'Énervé': emotion6,
  'Stressé': emotion7,
  'Anxieux': emotion8,
  'Triste': emotion9,
  'Ennuyé': emotion10,
  'Incertain': emotion11,
  'Désespéré': emotion12,
  'Confus': emotion13,
  'Frustré': emotion14,
  'Déprimé': emotion15,
  'Malade': emotion16,
  'Ému': emotion17,
  'Inspiré': emotion18
};

const images = [mood1, mood2, mood3, mood4, mood5];

const iconsMap = {
  'École': 'school-outline',
  'Travail': 'briefcase-outline',
  'Rendez-vous': 'time-outline',
  'Amis': 'people-outline',
  'Famille': 'home-outline',
  'Restaurant': 'fast-food-outline',
  'Sport': 'football-outline',
  'Sommeil': 'bed-outline',
  'Shopping': 'cart-outline',
  'Loisirs': 'extension-puzzle-outline',
  'Lecture': 'book-outline',
  'Musique': 'musical-notes-outline',
  'Sorties': 'partly-sunny-outline',
  'Voyage': 'airplane-outline',
  'Jeux vidéo': 'game-controller-outline',
  'Bien-être': 'heart-circle-outline',
  'Détente': 'headset-outline',
  'Animaux': 'paw-outline'
};

const Data = ({ currentMonth, currentYear }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [consecutiveEntries, setConsecutiveEntries] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [connectionDays, setConnectionDays] = useState([]);
  const [moodCount, setMoodCount] = useState({});
  const [activityCount, setActivityCount] = useState({});
  const [emotionCount, setEmotionCount] = useState({});
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const startDate = new Date(currentYear, currentMonth - 1, 1);
        const endDate = new Date(currentYear, currentMonth, 0);
  
        const entriesQuery = query(
          collection(db, 'users', userId, 'entries'),
          where('createdAt', '>=', startDate),
          where('createdAt', '<=', endDate)
        );
  
        const moodQuery = query(
          collection(db, 'users', userId, 'journals'),
          where('createdAt', '>=', startDate),
          where('createdAt', '<=', endDate)
        );
  
        const [entriesSnapshot, moodSnapshot] = await Promise.all([getDocs(entriesQuery), getDocs(moodQuery)]);
        const entries = entriesSnapshot.docs.map(doc => doc.data());
        const journals = moodSnapshot.docs.map(doc => doc.data());
  
        entries.sort((a, b) => a.createdAt - b.createdAt);
  
        let total = 0;
        let consecutiveCount = 0;
        let currentStreak = 0;
        let longestStreak = 0;
        let previousDate;
        let connectionDaysArray = []; 
  
        entries.forEach((entry) => {
          const currentDate = entry.createdAt.toDate();
          const diffInTime = Math.abs(currentDate - previousDate);
          const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
  
          if (!previousDate || diffInDays === 1) {
            consecutiveCount++;
            connectionDaysArray.push(currentDate);
          } else {
            currentStreak = consecutiveCount > currentStreak ? consecutiveCount : currentStreak;
            consecutiveCount = 1;
            connectionDaysArray = [currentDate];
          }
  
          total += entry.count;
          previousDate = currentDate;
        });
  
        currentStreak = consecutiveCount > currentStreak ? consecutiveCount : currentStreak;
        longestStreak = currentStreak > longestStreak ? currentStreak : longestStreak;
  
        setTotalEntries(total);
        setConsecutiveEntries(currentStreak);
        setLongestStreak(longestStreak);
        setConnectionDays(connectionDaysArray);
        setMoodCount(getMoodCount(journals.map(doc => doc.mood)));
        setActivityCount(getActivityCount(journals.map(doc => doc.activities).flat()));
        setEmotionCount(getEmotionCount(journals.map(doc => doc.emotions).flat()));
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };
  
    if (userId) {
      fetchEntries();
    }
  }, [userId, currentMonth, currentYear, db]);
  
  
  function getDaysInMonth(year, month) {
    const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(moment(`${year}-${month}-${i}`, "YYYY-MM-DD").format('DD'));
    }
    return days;
  }

  function getMoodCount(moods) {
    return moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
  }

  function getEmotionCount(emotions) {
    return emotions.reduce((acc, emotion) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});
  }

  function getActivityCount(activities) {
    return activities.reduce((acc, activity) => {
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {});
  }

  function getMoodImageIndex(mood) {
    switch(mood) {
      case "Super":
        return 0;
      case "Bien":
        return 1;
      case "Bof":
        return 2;
      case "Mal":
        return 3;
      case "Terrible":
        return 4;
      default:
        return 0;
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-[#EEEDFF]">
      <ScrollView contentContainerStyle={{ paddingVertical: 50, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="rounded-xl p-5 mx-5 bg-primary-white">
          <Text className="font-Qs-Bold text-xl text-center mb-5">Entrée consécutive : {consecutiveEntries}</Text>

          <ScrollView contentContainerStyle={{ paddingVertical: 10 }} horizontal={true}>
            <View style={{ flexDirection: 'row' }}>
              {getDaysInMonth(currentYear, currentMonth).map((day, index) => {
                const isLoggedDay = connectionDays.find(d => moment(d).format('DD') === day);
                return (
                  <View key={index} style={{ alignItems: 'center', marginRight: 20 }}>
                    {isLoggedDay ? (
                      <Ionicons name="checkmark-circle" size={30} color="#6331FF" style={{ marginBottom: 5 }} />
                    ) : (
                      <Ionicons name="close-circle-outline" size={30} color="#6331FF" style={{ marginBottom: 5 }} />
                    )}
                    <Text style={{ fontFamily: 'font-Qs-Regular' }}>{moment(`${currentYear}-${currentMonth}-${day}`, "YYYY-MM-DD").format('ddd DD')}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <Text className="font-Qs-SemiBold text-center text-[18px] mt-10">Entrées totales : {totalEntries}</Text>
          <Text className="font-Qs-SemiBold text-center text-[18px] mt-3">Plus longue série : {longestStreak}</Text>
        </View>

        <View className="rounded-xl p-5 mx-5 bg-primary-white mt-5">
          <Text className="font-Qs-Bold text-center text-xl mb-5">Compteur d'humeurs</Text>
          <Text className="font-Qs-Regular text-center text-lg mb-5">Vos humeurs les plus fréquentes</Text>
          {Object.keys(moodCount).map((mood, index) => (
            <View key={index} className="flex-row justify-center items-center">
              <Image source={images[getMoodImageIndex(mood)]} className="w-[50px] h-[50px] mr-2" />
              <Text className="font-Qs-Bold text-[18px] mb-2 mt-3">{mood} : {moodCount[mood]}</Text>
            </View>
          ))}
        </View>

        <View className="rounded-xl p-5 mx-5 bg-primary-white mt-5">
          <Text className="font-Qs-Bold text-center text-xl mb-5">Compteur d'activités</Text>
          <Text className="font-Qs-Regular text-center text-lg mb-5">Vos activités les plus fréquentes</Text>
          {Object.keys(activityCount).map((activity, index) => (
            <View key={index} className="flex-row justify-center items-center">
              <Ionicons name={iconsMap[activity]} size={30} color="#6331FF" style={{ marginRight: 10 }} />
              <Text className="font-Qs-Bold text-[18px] mb-2 mt-3">{activity} : {activityCount[activity]}</Text>
            </View>
          ))}
        </View>

        <View className="rounded-xl p-5 mx-5 bg-primary-white mt-5">
          <Text className="font-Qs-Bold text-center text-xl mb-5">Compteur d'émotions</Text>
          <Text className="font-Qs-Regular text-center text-lg mb-5">Vos émotions les plus fréquentes</Text>
          {Object.keys(emotionCount).map((emotion, index) => (
            <View key={index} className="flex-row justify-center items-center">
              <Image source={emotionIconsMap[emotion]} className="w-[30px] h-[30px] mr-2" />
              <Text className="font-Qs-Bold text-[18px] mb-2 mt-3">{emotion} : {emotionCount[emotion]}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
