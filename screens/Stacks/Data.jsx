import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Data from '../Main/Data';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const DataStack = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const nextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9FF',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Qs-SemiBold'
        }
      })}
    >
      <Stack.Screen
        name="Data"
        options={{
          title: `Données (${getMonthName(currentMonth)} ${currentYear})`,
          headerRight: () => (
            <Ionicons
              name="arrow-forward-circle"
              size={30}
              color="#6331FF"
              style={{ marginLeft: 20 }}
              onPress={nextMonth}
            />
          ),
          headerLeft: () => (
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="#6331FF"
              style={{ marginLeft: 20 }}
              onPress={prevMonth}
            />
          )
        }}
      >
        {/* Passer les props currentMonth et currentYear à Data */}
        {props => <Data {...props} currentMonth={currentMonth} currentYear={currentYear} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const getMonthName = (month) => {
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  return months[month - 1];
};

export default DataStack;
