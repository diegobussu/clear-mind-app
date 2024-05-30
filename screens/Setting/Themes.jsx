import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Thèmes = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <View className="flex-row items-center mb-5 mt-5">
        <TouchableOpacity className="top-0 right-20" onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-circle"
            size={40}
            color={'#6331FF'}
          />
        </TouchableOpacity>
        <View className="items-center">
          <Text className="font-sf-medium text-[25px]">Thèmes</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Thèmes;
