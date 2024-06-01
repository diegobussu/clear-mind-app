import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const Home = () => {
  const [username, setUsername] = useState('');
  const [currentDate, setCurrentDate] = useState('');
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
  }, [userId]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <View className="absolute top-20 right-10 flex-row items-center">
        <View className="bg-white p-2 rounded-[30px] flex-row items-center">
          <Text className="font-Qs-SemiBold font-bold text-[20px] mr-2">{currentDate}</Text>
          <Ionicons name="calendar-outline" size={30} color={'#6331FF'} />
        </View>
      </View>
      <View className="absolute top-[90px] left-10">
        <Text className="font-Qs-SemiBold font-bold text-[20px]">
          <Text>Bonjour, </Text>
          <Text className="text-primary-purple">{username}</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
