import React, { useState, useEffect } from 'react';
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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des données utilisateur :", error);
        }
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubscriptionChange = async () => {
    if (!userData) return;
    
    if (userData.isPremium) {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment vous désabonner ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: async () => {
                        try {
                            const userDocRef = doc(db, 'users', userId);
                            await updateDoc(userDocRef, {
                                isPremium: false,
                                premiumCancel: Timestamp.now(),
                                updateAt: Timestamp.now()
                            });
                            setUserData(prevState => ({ ...prevState, isPremium: false }));
                            Alert.alert(
                                "Oh non ! Vous partez déjà..",
                                "Vous avez été désabonné de Clear Mind Premium."
                            );
                        } catch (error) {
                            console.error("Erreur lors du désabonnement :", error);
                            Alert.alert(
                                "Erreur",
                                "Une erreur est survenue lors du désabonnement. Veuillez réessayer."
                            );
                        }
                    }
                }
            ]
        );
    } else {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment vous abonner ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Confirmer",
                    onPress: async () => {
                        try {
                            const userDocRef = doc(db, 'users', userId);
                            await updateDoc(userDocRef, {
                                isPremium: true,
                                premiumSince: Timestamp.now(),
                                updateAt: Timestamp.now()
                            });
                            setUserData(prevState => ({ ...prevState, isPremium: true, premiumSince: Timestamp.now().toDate().toLocaleDateString() }));
                            Alert.alert(
                                "Bienvenue !",
                                "Vous êtes maintenant abonné à Clear Mind Premium."
                            );
                        } catch (error) {
                            console.error("Erreur lors de l'abonnement :", error);
                            Alert.alert(
                                "Erreur",
                                "Une erreur est survenue lors de l'abonnement. Veuillez réessayer."
                            );
                        }
                    }
                }
            ]
        );
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

        <ButtonWhite text={userData?.isPremium ? "Se désabonner" : "S'abonner"} onPress={handleSubscriptionChange} />
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default Premium;
