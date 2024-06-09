import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView, Image } from 'react-native'; // Import Image from react-native
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

// Importez les images
import mood1 from '../../assets/img/mood/mood-1.png';
import mood2 from '../../assets/img/mood/mood-2.png';
import mood3 from '../../assets/img/mood/mood-3.png';
import mood4 from '../../assets/img/mood/mood-4.png';
import mood5 from '../../assets/img/mood/mood-5.png';

const images = [mood1, mood2, mood3, mood4, mood5];

const Data = ({ currentMonth, currentYear }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [consecutiveEntries, setConsecutiveEntries] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [connectionDays, setConnectionDays] = useState([]);
  const [moodCount, setMoodCount] = useState({});
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
        const moods = moodSnapshot.docs.map(doc => doc.data().mood);
  
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
        setMoodCount(getMoodCount(moods));
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
          <Text className="font-Qs-Bold text-xl text-center  mb-5">Entrée consécutive : {consecutiveEntries}</Text>

          <ScrollView contentContainerStyle={{ paddingVertical: 10}} horizontal={true}>
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
            <View key={index} className="flex-row items-center">
              <Image source={images[getMoodImageIndex(mood)]} className="w-[50px] h-[50px] mr-2" />
              <Text className="font-Qs-Bold text-[18px] mb-2 mt-3">{mood} : {moodCount[mood]}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
