import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, Modal, TouchableOpacity, Alert, TextInput } from 'react-native';
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
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
  const [currentDate, setCurrentDate] = useState(moment().format('DD MMMM'));
  const [weekDates, setWeekDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));
  const [userMood, setUserMood] = useState('');
  const [userNote, setUserNote] = useState('');
  const [userEmotions, setUserEmotions] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [positiveAffirmations, setPositiveAffirmations] = useState([]);
  const [showAcceptButton, setShowAcceptButton] = useState(true);
  
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

    const startOfWeek = moment().startOf('isoWeek');
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startOfWeek.clone().add(i, 'days').format('DD'));
    }
    setWeekDates(dates);

    const fetchDataForSelectedDate = async (date) => {
      const formattedDate = date.format('DD-MM-YYYY');
      const moodDoc = await getDoc(doc(db, 'users', userId, 'journals', formattedDate));
      if (moodDoc.exists()) {
        setUserMood(moodDoc.data().mood);
        setUserNote(moodDoc.data().note);
        setUserEmotions(moodDoc.data().emotions || []);
        setUserActivities(moodDoc.data().activities || []);
      } else {
        setUserMood('');
        setUserNote('');
        setUserEmotions([]);
        setUserActivities([]);
      }

      const challengeDoc = await getDoc(doc(db, 'users', userId, 'challenges', formattedDate));
      if (challengeDoc.exists()) {
        const { word_1, word_2, word_3 } = challengeDoc.data();
        setPositiveAffirmations([word_1, word_2, word_3]);
        setShowAcceptButton(false);
      } else {
        setPositiveAffirmations([]);
        setShowAcceptButton(true);
      }
    };

    fetchDataForSelectedDate(selectedDate);

  }, [userId, selectedDate]);

  const daysOfWeek = [
    'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'
  ];

  const handleDayPress = (index) => {
    const selectedDay = moment().startOf('isoWeek').add(index, 'days');
    const today = moment().startOf('day');
    if (selectedDay.isAfter(today)) {
      Alert.alert("Ce jour n'est pas encore arrivé");
    } else {
      setSelectedDate(selectedDay);
    }
  };

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
      moodIndex = -1;
  }

  const moodImage = moodIndex !== -1 ? moodImages[moodIndex] : null;

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleAccept = async () => {
    if (input1 && input2 && input3) {
      if (input1.length <= 20 && input2.length <= 20 && input3.length <= 20) {

        try {
          const userId = auth.currentUser?.uid;
      
          const currentDate = moment().startOf('day');
          const currentFormattedDate = currentDate.format('DD-MM-YYYY');
      
          const currentChallengeRef = doc(db, "users", userId, "challenges", currentFormattedDate);
      
          const currentChallengeSnap = await getDoc(currentChallengeRef);
          if (currentChallengeSnap.exists()) {
            await updateDoc(currentChallengeRef, {
              word_1: input1,
              word_2: input2,
              word_3: input3,
              updatedAt: Timestamp.now()
            });
          } else {
            const challengeData = {
              word_1: input1,
              word_2: input2,
              word_3: input3,
              createdAt: Timestamp.now(),
              updatedAt: Timestamp.now()
            };
            
            await setDoc(currentChallengeRef, challengeData);
          }

          setModalVisible(false);
          Alert.alert("Challenge confirmé.");
        } catch (error) {
          Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'ajout du challenge.');
        }

      } else {
        Alert.alert("Veuillez entrer des valeurs valides (moins de 20 caractères) pour tous les champs.");
      }
    } else {
      Alert.alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="absolute top-5 right-10 flex-row items-center">
          <View className="bg-white p-2 rounded-[30px] flex-row items-center">
            <Text className="font-Qs-SemiBold font-bold text-[20px] mr-2">{selectedDate.format('DD MMMM')}</Text>
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
            <TouchableOpacity key={index} onPress={() => handleDayPress(index)}>
              <View className="flex items-center p-1 mx-2" style={{ backgroundColor: index === selectedDate.isoWeekday() - 1 ? '#855EFF' : '#EEEDFF', borderRadius: 10 }}>
                <Text className="font-Qs-Regular text-[16px]" style={{ color: index === selectedDate.isoWeekday() - 1 ? '#FFFFFF' : '#000000' }}>{day}</Text>
                <Text className="font-Qs-Bold text-[16px] mt-2" style={{ color: index === selectedDate.isoWeekday() - 1 ? '#FFFFFF' : '#000000' }}>{weekDates[index]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="bg-primary-white rounded-[30px] py-5 items-center mt-10 mx-5">
          {moodImage && <Image source={moodImage} className="w-[70px] h-[70px]" />}
          <Text className="text-center font-Qs-Medium text-xl mt-3">Aujourd'hui, je me sens</Text>
          <Text className="text-center font-Qs-Bold text-xl mt-3">{userMood || 'Aucune information'}</Text>

          <View className="flex-row mt-5">
            {userActivities.map((activity, index) => (
              <View key={index} className="bg-primary-purple rounded-full py-2 px-3 m-2">
                <Text className="text-primary-white font-Qs-Bold">{activity}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row">
            {userEmotions.map((emotion, index) => (
              <View key={index} className="bg-primary-purple rounded-full py-2 px-3 m-2">
                <Text className="text-primary-white font-Qs-Bold">{emotion}</Text>
              </View>
            ))}
          </View>

          <Text className="text-center font-Qs-SemiBold text-[18px] mt-3">Note</Text>
          <Text className="text-center font-Qs-SemiBold text-[14px] px-10 mt-3">{userNote || 'Aucune information'}</Text>
        </View>

        <View className="bg-primary-white rounded-[30px] py-5 items-center mt-10 mx-5">
          <Text className="text-center font-Qs-Bold text-xl mt-3">Citation du jour</Text>
          <Text className="text-center font-Qs-Medium px-5 text-xl mt-3">“Le bien-être est le carburant d’une vie épanouie.”</Text>
          <Text className="text-center text[#828282] font-Qs-Regular px-5 text-lg mt-3">- Yann Feliz -</Text>
        </View>

        <View className="bg-third-purple rounded-[30px] py-5 items-center mt-10 mx-5">
          <Text className="text-center text-primary-white font-Qs-Bold text-xl mt-3">Challenge du jour</Text>
          <Text className="text-center text-primary-white font-Qs-Medium text-lg mt-3">Écrivez et répétez trois affirmations positives pour vous-même.</Text>

          <View className="flex-row mt-5">
            {positiveAffirmations.map((affirmation, index) => (
              <View key={index} className="bg-primary-purple rounded-full py-2 px-3 m-2">
                <Text className="text-primary-white font-Qs-Bold">{affirmation}</Text>
              </View>
            ))}
          </View>

          {showAcceptButton && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text className="text-center text-primary-white underline font-Qs-Bold px-5 text-lg mt-3">Acceptez</Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <BlurView intensity={50} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View className="bg-primary-white border border-primary-purple rounded-[30px] px-10 py-5 w-[90%]">
              <Text className="text-center font-Qs-Bold text-xl mb-3">Challenge du jour</Text>
              <TextInput
                placeholder="Affirmation positive n°1"
                placeholderTextColor="#6331FF"
                value={input1}
                onChangeText={(text) => setInput1(text)}
                className="text-primary-purple bg-[#F2EDFF] font-Qs-Regular text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
              />
              <TextInput
                placeholder="Affirmation positive n°2"
                placeholderTextColor="#6331FF"
                value={input2}
                onChangeText={(text) => setInput2(text)}
                className="text-primary-purple bg-[#F2EDFF] font-Qs-Regular text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
              />
              <TextInput
                placeholder="Affirmation positive n°3"
                placeholderTextColor="#6331FF"
                value={input3}
                onChangeText={(text) => setInput3(text)}
                className="text-primary-purple bg-[#F2EDFF] font-Qs-Regular text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
              />
              <TouchableOpacity onPress={handleAccept}>
                <View className="flex-row justify-between items-center mb-5">
                  <Text className="font-Qs-SemiBold text-[20px] p-2">Confirmer</Text>
                  <Ionicons name="checkmark-circle" size={30} color={'#6331FF'}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View className="flex-row justify-between items-center">
                  <Text className="font-Qs-SemiBold text-[20px] p-2">Annuler</Text>
                  <Ionicons name="close-circle" size={30} color={'#6331FF'}/>
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
