// components/ButtonWhite.jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonWhite = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#FFF',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        borderWidth: 0.5,
        borderColor: '#B08FFF'
      }}
    >
      <Text style={{ color: '#B08FFF', fontSize: 18 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonWhite;
