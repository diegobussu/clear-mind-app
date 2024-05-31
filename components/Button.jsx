import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-primary-purple mt-8 py-2 rounded-full shadow flex items-center justify-center w-48 mx-auto"
    >
      <Text className="text-white font-sf-bold text-lg">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
