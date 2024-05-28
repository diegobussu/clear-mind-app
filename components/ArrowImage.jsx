import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArrowImage = ({ source, width = 20, height = 20 }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} className="items-center absolute top-0 left-0 m-2">
      <Image source={source} className="w-5 h-5" />
    </TouchableOpacity>
  );
};

export default ArrowImage;
