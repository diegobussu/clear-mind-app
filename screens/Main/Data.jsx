import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const Data = ({ currentMonth, currentYear }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const [consecutiveEntries, setConsecutiveEntries] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [connectionDays, setConnectionDays] = useState([]);
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
  
        const entriesSnapshot = await getDocs(entriesQuery);
        const entries = entriesSnapshot.docs.map(doc => doc.data());
        
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
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };
  
    if (userId) {
      fetchEntries();
    }
  }, [userId, currentMonth, currentYear, db]);
  

  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-[#EEEDFF]">
      <ScrollView contentContainerStyle={{ paddingVertical: 50, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="rounded-xl p-5 mx-5 bg-primary-white">
          <Text className="font-Qs-Bold text-xl mb-5">Entrée consécutive : {consecutiveEntries}</Text>

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

          <Text className="font-Qs-SemiBold text-[18px] mt-10">Entrées totales : {totalEntries}</Text>
          <Text className="font-Qs-SemiBold text-[18px] mt-3">Plus longue série : {longestStreak}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;

// Function to get all days in a month
function getDaysInMonth(year, month) {
  const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(moment(`${year}-${month}-${i}`, "YYYY-MM-DD").format('DD'));
  }
  return days;
}
