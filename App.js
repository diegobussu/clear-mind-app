// App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TutorialStack from './screens/Stacks/TutorialStack';
import SplashStack from './screens/Stacks/SplashStack';
import LoginStack from './screens/Stacks/LoginStack';
import MoodStack from './screens/Stacks/MoodStack';
import ActivityStack from './screens/Stacks/ActivityStack';
import HomeScreen from './screens/HomeScreen';

async function loadFonts() {
  await Font.loadAsync({
    'SF-Black': require('./assets/fonts/SF-Pro-Text-Black.otf'),
    'SF-BlackItalic': require('./assets/fonts/SF-Pro-Text-BlackItalic.otf'),
    'SF-Bold': require('./assets/fonts/SF-Pro-Text-Bold.otf'),
    'SF-BoldItalic': require('./assets/fonts/SF-Pro-Text-BoldItalic.otf'),
    'SF-Heavy': require('./assets/fonts/SF-Pro-Text-Heavy.otf'),
    'SF-HeavyItalic': require('./assets/fonts/SF-Pro-Text-HeavyItalic.otf'),
    'SF-Light': require('./assets/fonts/SF-Pro-Text-Light.otf'),
    'SF-LightItalic': require('./assets/fonts/SF-Pro-Text-LightItalic.otf'),
    'SF-Medium': require('./assets/fonts/SF-Pro-Text-Medium.otf'),
    'SF-MediumItalic': require('./assets/fonts/SF-Pro-Text-MediumItalic.otf'),
    'SF-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf'),
    'SF-RegularItalic': require('./assets/fonts/SF-Pro-Text-RegularItalic.otf'),
    'SF-Semibold': require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SF-SemiboldItalic': require('./assets/fonts/SF-Pro-Text-SemiboldItalic.otf'),
    'SF-Text-Thin': require('./assets/fonts/SF-Pro-Text-Thin.otf'),
    'SF-ThinItalic': require('./assets/fonts/SF-Pro-Text-ThinItalic.otf'),
    'SF-Ultralight': require('./assets/fonts/SF-Pro-Text-Ultralight.otf'),
    'SF-UltralightItalic': require('./assets/fonts/SF-Pro-Text-UltralightItalic.otf'),
  });
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthenticatedApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashStack} />
      <Stack.Screen name="Tutorial" component={TutorialStack} />
      <Stack.Screen name="Login" component={LoginStack} />
      <Stack.Screen name="Mood" component={MoodStack} />
      <Stack.Screen name="Activity" component={ActivityStack} />
      <Stack.Screen name="AuthenticatedApp" component={AuthenticatedApp} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [firstTimeUser, setFirstTimeUser] = useState(null);

  useEffect(() => {
    // Check if it's the first time the user opens the app
    AsyncStorage.getItem('firstTimeUser').then(value => {
      if (value === null) {
        setFirstTimeUser(true);
        AsyncStorage.setItem('firstTimeUser', 'false'); // Set it to false for future openings
      } else {
        setFirstTimeUser(false);
      }
    });

    // Load fonts
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded || firstTimeUser === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {firstTimeUser ? <MainNavigator /> : <AuthenticatedApp />}
    </NavigationContainer>
  );
}