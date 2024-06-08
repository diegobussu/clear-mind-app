import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const Ressource = () => {
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
    backgroundColor2 = '#A171FF';
    backgroundColor3 = '#894C48';
    backgroundColor4 = '#4D598C';
  }

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
          <View className="mt-10">
            <View style={{backgroundColor: backgroundColor1}} className="rounded-xl p-5 mx-5 mb-3">
              <Text className="font-Qs-SemiBold text-xl text-white">{title1}</Text>

              <Text className="font-Qs-Regular text-xl text-white">{subtitle1}</Text>

              <TouchableOpacity>
                <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
              </TouchableOpacity>

            </View>
            <View style={{backgroundColor: backgroundColor2}} className="rounded-xl p-5 mx-5 mb-3">
              <Text className="font-Qs-SemiBold text-xl text-white">{title2}</Text>

              <Text className="font-Qs-Regular text-xl text-white">{subtitle2}</Text>

              <TouchableOpacity>
                <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
              </TouchableOpacity>

            </View>
            <View style={{backgroundColor: backgroundColor3}} className="rounded-xl p-5 mx-5 mb-3">
              <Text className="font-Qs-SemiBold text-xl text-white">{title3}</Text>

              <Text className="font-Qs-Regular text-xl text-white">{subtitle3}</Text>

              <TouchableOpacity>
              <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
              </TouchableOpacity>

            </View>
            <View style={{backgroundColor: backgroundColor4}} className="rounded-xl p-5 mx-5 mb-3">
              <Text className="font-Qs-SemiBold text-xl text-white">{title4}</Text>

              <Text className="font-Qs-Regular text-lg text-white">{subtitle4}</Text>

              <TouchableOpacity>
                <Text className="underline font-Qs-Regular text-lg text-white">Lire</Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Ressource;
