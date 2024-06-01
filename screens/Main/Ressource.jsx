import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

const Ressource = () => {
  const [selected, setSelected] = useState(null);

  const handlePress = (item) => {
    setSelected(item);
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-secondary-white">
      <View className="flex-row justify-between w-full px-10 mt-10">
        {['Conseil', 'Quizz', 'Concentration'].map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`px-3 py-2 rounded-[30px] ${selected === item ? 'bg-primary-purple' : 'bg-second-white-purple'} mx-2`}
            onPress={() => handlePress(item)}
          >
            <Text className={`font-Qs-SemiBold ${selected === item ? 'text-white' : 'text-third-purple'}`}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Ressource;
