import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

const Ressource = () => {
  const [selected, setSelected] = useState(null);

  const handlePress = (item) => {
    setSelected(item);
  };

  let blockContent1 = '';
  let blockContent2 = '';
  let blockContent3 = '';
  let blockContent4 = '';
  let backgroundColor1 = '';
  let backgroundColor2 = '';
  let backgroundColor3 = '';
  let backgroundColor4 = '';

  if (selected === 'Conseil') {
    blockContent1 = 'Comment Combattre l\'Insomnie';
    blockContent2 = 'Comprendre et Gérer l\'Anxiété';
    blockContent3 = 'Comment Gérer Son Stress au Quotidien';
    blockContent4 = 'L\'Épuisement Professionnel (Burnout)';
    backgroundColor1 = '#4A449E';
    backgroundColor2 = '#A171FF';
    backgroundColor3 = '#894C48';
    backgroundColor4 = '#4D598C';
  }

  return (
    <SafeAreaView className="flex-1 justify-start items-center text-center px-5 bg-secondary-white">
      <View className="flex-row justify-between w-full px-10 mt-10">
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
      {selected === 'Conseil' && (
        <View className="mt-10">
          <View style={{backgroundColor: backgroundColor1}} className="rounded-xl p-5 mx-5 mb-3">
            <Text className="text-center font-Qs-SemiBold text-xl text-white">{blockContent1}</Text>

            <TouchableOpacity>
              <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: backgroundColor2}} className="rounded-xl p-5 mx-5 mb-3">
            <Text className="text-center font-Qs-SemiBold text-xl text-white">{blockContent2}</Text>

            <TouchableOpacity>
              <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: backgroundColor3}} className="rounded-xl p-5 mx-5 mb-3">
            <Text className="text-center font-Qs-SemiBold text-xl text-white">{blockContent3}</Text>

            <TouchableOpacity>
            <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: backgroundColor4}} className="rounded-xl p-5 mx-5 mb-3">
            <Text className="text-center font-Qs-SemiBold text-xl text-white">{blockContent4}</Text>

            <TouchableOpacity>
              <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Ressource;
