import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Security from '../Setting/Security';
import Home from '../Setting/Home';
import Review from '../Setting/Review';
import Premium from '../Setting/Premium';
import Profil from '../Setting/Profil';
import Mood from '../Setting/Mood';
import Icons from '../Setting/Icons';
import Success from '../Setting/Success';
import Themes from '../Setting/Themes';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9FF',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Qs-SemiBold'
        },
        headerTitleAlign: 'center',
        headerLeft: () => {
          if (route.name !== 'Home') {
            return (
              <Ionicons
                name="arrow-back-circle"
                size={30}
                color="#6331FF"
                style={{ marginLeft: 20 }}
                onPress={() => navigation.navigate("Home")}
              />
            );
          }
          return null;
        },
      })}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: 'Paramètres'}} />
      <Stack.Screen name="Security" component={Security} options={{ title: 'Sécurité'}} />
      <Stack.Screen name="Review" component={Review} options={{ title: 'Votre avis'}} />
      <Stack.Screen name="Premium" component={Premium} options={{ title: 'Abonnement premium'}} />

      <Stack.Screen name="Profil" component={Profil} options={{ title: 'Votre profil'}} />
      <Stack.Screen name="Mood" component={Mood} options={{ title: 'Mood'}} />
      <Stack.Screen name="Success" component={Success} options={{ title: 'Vos succès'}} />
      <Stack.Screen name="Icons" component={Icons} options={{ title: 'Icônes'}} />
      <Stack.Screen name="Themes" component={Themes} options={{ title: 'Thèmes'}} />
    </Stack.Navigator>
  );
};

export default SettingStack;
