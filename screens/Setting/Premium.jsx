import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonWhite from '../../components/ButtonWhite';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc, Timestamp, getDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";


const Premium = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  const subscribe = async () => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      try {
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        
        if (userData && userData.isPremium) {
          // Si l'utilisateur est déjà abonné, affiche une alerte
          Alert.alert('Félicitations', 'Vous êtes déjà abonné à Clear Mind Premium.');
        } else {
          // Sinon, met à jour le document
          Alert.alert('Bienvenue chez Clear Mind Premium !');
          await updateDoc(userDocRef, {
            isPremium: true,
            premiumSince: Timestamp.now(),
            updateAt: Timestamp.now()
          });
          navigation.navigate('Home');
        }
      } catch (error) {
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la mise à jour de l\'abonnement.');
      }
    } else {
      Alert.alert('Erreur', 'Impossible de trouver l\'utilisateur.');
    }
  };
  

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center bg-secondary-white">
      <View className="flex-row items-center mb-20 mt-5">
        <TouchableOpacity className="top-0 right-10" onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle"
            size={40}
            color={'#6331FF'}
          />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="font-sf-medium text-[25px]">Pass Premium</Text>
        </View>
      </View>


      <ScrollView showsVerticalScrollIndicator={false}>
          {["Déblocage des succès", "Déblocage des thèmes", "Accès à la liste des psychologues", "Accès à la totalité de nos cours personnalisés", "Accès aux données complètes de votre profil", "Exporter son journal en format PDF"].map((index) => (
            <View key={index} className="w-[380px] bg-primary-purple h-[80px] rounded-[10px] justify-center items-center py-2 px-3 mb-10">
              <Text className="items-center text-white text-center font-sf-bold text-[20px]">{index}</Text>
            </View>
          ))}

        <Text className="text-center text-[20px] mb-10 mt-10 font-sf-bold text-white-purple">Seulement 3,99 € / mois</Text>

        <ButtonWhite text="S'abonner" onPress={() => subscribe()} />
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default Premium;
