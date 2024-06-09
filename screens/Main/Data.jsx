import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, Timestamp, collection, query, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import moment from 'moment';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
  dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
  today: "Aujourd'hui"
};

LocaleConfig.defaultLocale = 'fr';

const Data = () => {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;
  const [userEntries, setUserEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);
  const [consecutiveEntries, setConsecutiveEntries] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const fetchUserEntries = async () => {
      try {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const entriesCollectionRef = collection(userDocRef, 'entries');
          const entriesQuery = query(entriesCollectionRef);
          const entriesSnapshot = await getDocs(entriesQuery);
          const entriesData = entriesSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setUserEntries(entriesData);
        } else {
          await setDoc(userDocRef, {});
          setUserEntries([]);
        }
      } catch (error) {
        console.error("Error fetching user entries:", error);
      }
    };

    fetchUserEntries();
  }, [userId]);

  useEffect(() => {
    const total = userEntries.reduce((acc, entry) => acc + entry.count, 0);
    setTotalEntries(total);

    let longestStreakCount = 0;
    let currentStreakCount = 0;
    let prevDate = null;

    const formattedDates = userEntries.map(entry => moment.utc(entry.date).utcOffset('+0200').format('YYYY-MM-DD'));
    const markedDatesObj = formattedDates.reduce((acc, date) => {
      acc[date] = { selected: true, selectedColor: '#6331FF' };
      return acc;
    }, {});
    setMarkedDates(markedDatesObj);

    userEntries.sort((a, b) => moment(a.date).diff(moment(b.date)));

    for (const entry of userEntries) {
      const entryDate = moment(entry.date);
      if (!prevDate || entryDate.diff(prevDate, 'days') === 1) {
        currentStreakCount += entry.count;
      } else if (entryDate.diff(prevDate, 'days') > 1) {
        currentStreakCount = entry.count;
      }
      longestStreakCount = Math.max(longestStreakCount, currentStreakCount);
      prevDate = entryDate;
    }

    setConsecutiveEntries(currentStreakCount);
    setLongestStreak(longestStreakCount);
  }, [userEntries]);

  const incrementEntryCount = async () => {
    const today = moment().utcOffset('+0200').startOf('day');
    const todayEntry = userEntries.find(entry => moment(entry.date).startOf('day').isSame(today, 'day'));

    if (todayEntry) {
      const entryRef = doc(db, 'users', userId, 'entries', todayEntry.id);
      await updateDoc(entryRef, { count: todayEntry.count + 1 });
      setUserEntries(prevEntries =>
        prevEntries.map(entry =>
          entry.id === todayEntry.id ? { ...entry, count: todayEntry.count + 1 } : entry
        )
      );
    } else {
      const newEntryRef = await addDoc(collection(db, 'users', userId, 'entries'), {
        date: Timestamp.fromDate(today.toDate()),
        count: 1
      });
      setUserEntries(prevEntries => [...prevEntries, { id: newEntryRef.id, date: today.toDate(), count: 1 }]);
    }
  };

  useEffect(() => {
    incrementEntryCount();
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-[#EEEDFF]">
      <ScrollView contentContainerStyle={{ paddingVertical: 50, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="rounded-xl p-5 mx-5 bg-primary-white">
          <Text className="font-Qs-Bold text-xl mb-5">Entrée consécutive : {consecutiveEntries}</Text>

          <Calendar
            locale="fr"
            theme={{
              arrowColor: '#6331FF'
            }}
            firstDay={1}
            style={{ backgroundColor: '#FFF', width: 300 }}
            markedDates={markedDates}
          />

          <Text className="font-Qs-SemiBold text-[18px] mt-10">Entrées totales : {totalEntries}</Text>
          <Text className="font-Qs-SemiBold text-[18px] mt-3">Plus longue série : {longestStreak}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Data;
