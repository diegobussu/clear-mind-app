import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonWhite = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white mt-3 py-2 rounded-full shadow flex items-center justify-center w-48 mx-auto border border-[#B08FFF]"
    >
      <Text className="text-white-purple font-sf-medium text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWhite;
