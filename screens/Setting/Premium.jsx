import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ButtonWhite from '../../components/ButtonWhite';

const Premium = () => {
  const navigation = useNavigation();

  const subscribe = () => {
    Alert.alert('Bienvenue chez Clear Mind Premium !');
    navigation.navigate('Home');
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
