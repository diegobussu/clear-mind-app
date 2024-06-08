import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image, Alert, Vibration} from 'react-native';
import Insomnie from '../../assets/img/ressources/insomnie.png'
import Anxiety from '../../assets/img/ressources/anxiety.png'
import Stress from '../../assets/img/ressources/stress.png'
import BurnOut from '../../assets/img/ressources/burnout.png'
import Screen from '../../assets/img/ressources/screen.png'
import Friends from '../../assets/img/ressources/friends.png'
import Sleep from '../../assets/img/ressources/friends.png'
import { Ionicons } from '@expo/vector-icons';
import { getAuth} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const Ressource = () => {

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  const checkPremiumStatus = async () => {
    try {
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.isPremium == true) {
            } else {
              Alert.alert("Cette fonctionnalité est réservée aux utilisateurs premium.");
            }
        }
    } catch (error) {
        return false;
    }
};

  const [selected, setSelected] = useState('Conseil');

  const handlePress = (item) => {
    setSelected(item);
  };

  let title1 = '';
  let title2 = '';
  let title3 = '';
  let title4 = '';
  let subtitle1 = '';
  let subtitle2 = '';
  let subtitle3 = '';
  let subtitle4 = '';
  let backgroundColor1 = '';
  let backgroundColor2 = '';
  let backgroundColor3 = '';
  let backgroundColor4 = '';

  if (selected === 'Conseil') {
    title1 = 'Comment combattre l\'insomnie';
    title2 = 'Comprendre et gérer l\'anxiété';
    title3 = 'Comment Gérer son stress au quotidien';
    title4 = 'L\'épuisement professionnel (Burnout)';

    subtitle1 = 'Découvrez des méthodes éprouvées pour vaincre l\'insomnie.';
    subtitle2 = 'Découvrez ce qu\'est l\'anxiété et des stratégies pratiques pour la gérer au quotidien.';
    subtitle3 = 'Découvrez ce qu\'est le stress et comment le gérer au quotidien.';
    subtitle4 = 'Identifiez les signes précoces du burnout et découvrez des méthodes pour le prévenir et le traiter.';

    backgroundColor1 = '#4A449E';
    backgroundColor2 = '#2D2D51';
    backgroundColor3 = '#894C48';
    backgroundColor4 = '#4D598C';
  }

  if (selected === 'Quizz') {
    title1 = 'Questionnaire sur le sommeil';
    title2 = 'Questionnaire sur l\'utilisation des écrans';
    title3 = 'Questionnaire sur l\'entourage';

    subtitle1 = 'Ce questionnaire aide à identifier les problèmes de sommeil et propose des solutions pour améliorer la qualité de votre sommeil et votre bien-être général.';
    subtitle2 = 'Ce questionnaire examine le temps passé devant les écrans, que ce soit pour le travail, les jeux vidéo ou les réseaux sociaux. ';
    subtitle3 = 'Évaluez l\'impact de votre entourage sur votre santé mentale avec ce questionnaire. Identifiez les sources de soutien et de stress dans vos relations personnelles, familiale et professionnelles.';
  }

  const [mode, setMode] = useState('Travail'); // Mode initial est "Travail"
  const [timer, setTimer] = useState(25 * 60); // Durée initiale de 25 minutes en secondes
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    let intervalId;

    // Logique pour gérer le changement de mode une fois que le minuteur atteint 00:00
    if (timer === 0) {
      if (mode === 'Travail') {
        // Si le mode actuel est "Travail", passer au mode "Pause" et réinitialiser le minuteur à 5 minutes
        setMode('Pause');
        setTimer(5 * 60);
      } else {
        // Si le mode actuel est "Pause", passer au mode "Travail" et réinitialiser le minuteur à 25 minutes
        setMode('Travail');
        setTimer(25 * 60);
      }
    }

    // Démarrer le minuteur
    if (isRunning) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque le minuteur est arrêté
    return () => clearInterval(intervalId);
  }, [timer, mode, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    if (timer === 0) {
      setTimer(mode === 'Travail' ? 25 * 60 : 5 * 60); // Réinitialiser le minuteur à la durée appropriée
    }
  };
  
  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-secondary-white">
      <View className="flex-row justify-between w-full px-10 mt-5 mb-5">
        {['Conseil', 'Quizz', 'Concentration'].map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`px-4 py-3 rounded-[30px] ${selected === item ? 'bg-primary-purple' : 'bg-second-white-purple'} mx-2`}
            onPress={() => handlePress(item)}
          >
            <Text className={`font-Qs-SemiBold ${selected === item ? 'text-white' : 'text-third-purple'}`}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>



        {selected === 'Conseil' && (
          <View className="mt-3">

            <View style={{backgroundColor: backgroundColor1, overflow: 'hidden'}} className="rounded-xl p-5 mx-5 mb-5">

                <Text className="font-Qs-SemiBold text-xl text-white">{title1}</Text>
                <Text className="font-Qs-Regular text-xl text-white mt-3">{subtitle1}</Text>
                <TouchableOpacity className="mt-5">
                  <Text className="underline font-Qs-Regular text-lg text-white mb-7">Lire</Text>
                </TouchableOpacity>

                <Image source={Insomnie} className="w-[200px] h-[140px] absolute bottom-[-10] right-[0]" />

            </View>

            <View style={{backgroundColor: backgroundColor2}} className="rounded-xl p-5 mx-5 mb-5">

              <Text className="font-Qs-SemiBold text-xl text-white">{title2}</Text>
              <Text className="font-Qs-Regular text-xl text-white mt-3">{subtitle2}</Text>

              <TouchableOpacity className="mt-5">
                <Text className="underline font-Qs-Regular text-lg text-white mb-7">Lire</Text>
              </TouchableOpacity>

              <Image source={Anxiety} className="w-[120px] h-[120px] absolute bottom-[1] right-[1]" />

            </View>

            <View style={{backgroundColor: backgroundColor3, overflow: 'hidden'}} className="rounded-xl p-5 mx-5 mb-5">

              <View className="items-center">
                <View className="flex-row rounded-xl p-2 bg-primary-white w-[50%]">
                  <Ionicons name="diamond-outline" size={30} color="#6331FF"/>
                  <Text className="font-Qs-SemiBold text-center text-xl text-primary-purple ml-3">Premium</Text>
                </View>
              </View>

              <Text className="font-Qs-SemiBold text-xl text-white mt-3">{title3}</Text>
              <Text className="font-Qs-Regular text-xl text-white mt-3">{subtitle3}</Text>

              <TouchableOpacity className="mt-5" onPress={() => checkPremiumStatus()}>
              <Text className="underline font-Qs-Regular text-lg text-white mb-7">Lire</Text>
              </TouchableOpacity>

              <Image source={Stress} className="w-[100px] h-[100px] absolute bottom-[-5] right-[30]" />

            </View>

            <View style={{backgroundColor: backgroundColor4, overflow: 'hidden'}} className="rounded-xl p-5 mx-5 mb-5">

              <View className="items-center">
                <View className="flex-row rounded-xl p-2 bg-primary-white w-[50%]">
                  <Ionicons name="diamond-outline" size={30} color="#6331FF"/>
                  <Text className="font-Qs-SemiBold text-center text-xl text-primary-purple ml-3">Premium</Text>
                </View>
              </View>

              <Text className="font-Qs-SemiBold text-xl text-white mt-3">{title4}</Text>
              <Text className="font-Qs-Regular text-lg text-white mt-3">{subtitle4}</Text>

              <TouchableOpacity className="mt-5" onPress={() => checkPremiumStatus()}>
                <Text className="underline font-Qs-Regular text-lg text-white mb-7">Lire</Text>
              </TouchableOpacity>

              <Image source={BurnOut} className="w-[220px] h-[150px] absolute bottom-[0] right-[-40] z-[-1]" />

            </View>
            
          </View>
        )}


        {selected === 'Quizz' && (
          <View className="mt-3">

          <View style={{ overflow: 'hidden'}} className="rounded-xl p-5 mx-5 mb-5 bg-primary-white">
              <Image source={Sleep} className="w-[350px] h-[150px] rounded-xl absolute top-0 left-0" />

              <Text className="mt-[150px] font-Qs-SemiBold text-center text-xl">{title1}</Text>
              <Text className="font-Qs-Regular text-center text-sm mt-3">{subtitle1}</Text>

              <View className="items-center">
                <TouchableOpacity className="mt-5 p-2 rounded-[30px] bg-second-white-purple w-[40%]">
                  <Text className="font-Qs-SemiBold text-center text-third-purple">Démarrer</Text>
                </TouchableOpacity>
              </View>

          </View>



            <View style={{ overflow: 'hidden'}} className="rounded-xl p-5 mx-5 mb-5 bg-primary-white">

              <Image source={Screen} className="w-[350px] h-[150px] rounded-xl absolute top-0 left-0" />

              <Text className="mt-[150px] font-Qs-SemiBold text-center text-xl">{title2}</Text>
              <Text className="font-Qs-Regular text-center text-sm mt-3">{subtitle2}</Text>

              <View className="items-center">
                <TouchableOpacity className="mt-5 p-2 rounded-[30px] bg-second-white-purple w-[40%]">
                  <Text className="font-Qs-SemiBold text-center text-third-purple">Démarrer</Text>
                </TouchableOpacity>
              </View>

            </View>

            <View style={{ overflow: 'hidden'}} className="rounded-xl p-5 mx-5 mb-5 bg-primary-white">

              <Image source={Friends} className="w-[350px] h-[150px] rounded-xl absolute top-0 left-0" />

              <View className="items-center mt-[150px] mb-3">
                <View className="flex-row rounded-full p-2 bg-second-white-purple w-[50%]">
                  <Ionicons name="diamond-outline" size={30} color="#6331FF"/>
                  <Text className="font-Qs-SemiBold text-center text-xl text-primary-purple ml-3">Premium</Text>
                </View>
              </View>

              <Text className="font-Qs-SemiBold text-center text-xl">{title3}</Text>
              <Text className="font-Qs-Regular text-center text-sm mt-3">{subtitle3}</Text>

              <View className="items-center">
                <TouchableOpacity onPress={() => checkPremiumStatus()} className="mt-5 p-2 rounded-[30px] bg-second-white-purple w-[40%]">
                  <Text className="font-Qs-SemiBold text-center text-third-purple">Démarrer</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        )}





        {selected === 'Concentration' && (
          <View className="mt-3">
            <View style={{ overflow: 'hidden'}} className="rounded-xl p-5 mx-10 mb-5 bg-primary-white">
              <Text className="font-Qs-SemiBold text-center text-[50px]">{Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</Text>
            </View>

            <View className="items-center mb-10">
              <TouchableOpacity onPress={isRunning ? stopTimer : startTimer} className="mt-5 p-2 py-3 px-10 rounded-[30px] bg-primary-purple">
                <Text className="font-Qs-SemiBold text-[20px] text-center text-primary-white">{isRunning ? 'Arrêter' : timer === 0 ? 'Redémarrer' : 'Démarrer'}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ overflow: 'hidden'}} className="rounded-xl p-5 mx-10 mb-5 bg-primary-white">
              <Text className="font-Qs-SemiBold text-center text-xl">Méthode Pomodoro</Text>
              <Text className="font-Qs-Regular text-center text-sm mt-3">
                La méthode Pomodoro vise à améliorer la productivité en alternant périodes de travail intensif et courtes pauses.
              </Text>
            </View>

            <View style={{ overflow: 'hidden'}} className="rounded-xl p-5 mx-10 mb-5 bg-primary-white">
              <Text className="font-Qs-SemiBold text-center text-xl">Perfomances</Text>
              <Text className="font-Qs-Regular text-center text-sm mt-3">
                Travailler en périodes de 25 minutes, suivies de courtes pauses de 5 minutes, pour maximiser la concentration et la productivité.
              </Text>
            </View>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ressource;
