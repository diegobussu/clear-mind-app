import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Username from '../GetStarted/Username';
import Mood from '../Diary/Mood';
import Activity from '../Diary/Activity';
import Emotion from '../Diary/Emotion';
import Comment from '../Diary/Comment';

const Stack = createNativeStackNavigator();

const Started = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9FF',
          borderBottomWidth: 0,
        },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Qs-SemiBold'
        },
        headerLeft: () => (
          <Ionicons
            name="arrow-back-circle"
            size={30}
            color="#6331FF"
            style={{ marginLeft: 20 }}
            onPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Stack.Screen name="Username" component={Username} options={{ headerShown: false}} />
      <Stack.Screen name="Mood" component={Mood} options={{ title: '1/4'}} />
      <Stack.Screen name="Activity" component={Activity} options={{ title: '2/4'}} />
      <Stack.Screen name="Emotion" component={Emotion} options={{ title: '3/4'}} />
      <Stack.Screen name="Comment" component={Comment} options={{ title: '4/4'}} />
    </Stack.Navigator>
  );
};

export default Started;
