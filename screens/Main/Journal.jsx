import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const Journal = () => {

  return (
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
        <View className="items-center">
          <Text className="font-Qs-Bold text-[25px]">Journal</Text>
        </View>
    </SafeAreaView>
  );
};

export default Journal;
