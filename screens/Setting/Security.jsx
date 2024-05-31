import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";

const Security = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  const handlePress = async (item) => {
    switch (item) {
        case "Changer votre nom":
          Alert.alert("Un lien a été envoyé sur votre email.");
          break;
        case "Modifier votre email":
          Alert.alert("Un lien a été envoyé sur votre email.");
          break;
        case "Modifier votre mot de passe":
          Alert.alert("Un lien a été envoyé sur votre email.");
          break;
        case "Supprimer votre compte":
          Alert.alert("Un lien a été envoyé sur votre email.");
          break;
        default:
          break;
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <View className="flex-row items-center mb-10 mt-5">
        <TouchableOpacity className="top-0 right-20" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={40} color={'#6331FF'} />
        </TouchableOpacity>
        <View className="items-center mr-10">
            <Text className="font-sf-medium text-[25px]">Sécurité</Text>
        </View>
      </View>


      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="bg-primary-white rounded-[30px] px-10 py-5 mb-5">
          {["Changer votre nom", "Modifier votre email", "Modifier votre mot de passe", "Supprimer votre compte"].map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                  <View key={index} className="flex-row justify-between items-center mb-10">
                      <Text className="font-sf-regular text-[20px] p-2">{item}</Text>
                      <Ionicons name="chevron-forward" size={30} color={'#6331FF'}/>
                  </View>
              </TouchableOpacity>
          ))}
        </View>


        <TouchableOpacity
          onPress={() => Linking.openURL('https://clear-mind.fr/pages/contact')}
          className="bg-primary-purple mt-8 py-3 rounded-full shadow flex items-center justify-center w-[250px] mx-auto"
        >
          <Text className="text-white font-sf-regular text-lg">Signaler un problème ?</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
};

export default Security;
