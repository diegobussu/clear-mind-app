import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const Data = ({ currentMonth, currentYear }) => {
  const [totalEntries, setTotalEntries] = useState(0);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchTotalEntries = async () => {
      try {
        const startDate = new Date(currentYear, currentMonth - 1, 1);
        const endDate = new Date(currentYear, currentMonth, 0);

        const entriesQuery = query(
          collection(db, 'users', userId, 'entries'),
          where('createdAt', '>=', startDate),
          where('createdAt', '<=', endDate)
        );

        const entriesSnapshot = await getDocs(entriesQuery);
        let total = 0;

        entriesSnapshot.forEach((doc) => {
          total += doc.data().count;
        });

        setTotalEntries(total);
      } catch (error) {
        console.error("Error fetching entries: ", error);
      }
    };

    if (userId) {
      fetchTotalEntries();
    }
  }, [userId, currentMonth, currentYear, db]);

  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-[#EEEDFF]">
      <ScrollView contentContainerStyle={{ paddingVertical: 50, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="rounded-xl p-5 mx-5 bg-primary-white">
          <Text className="font-Qs-SemiBold text-[18px] mt-10">Entrées totales : {totalEntries}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
