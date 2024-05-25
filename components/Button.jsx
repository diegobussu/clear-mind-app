// components/Button.jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#6331FF',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4
      }}
    >
      <Text style={{ color: '#FFF', fontSize: 18 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
