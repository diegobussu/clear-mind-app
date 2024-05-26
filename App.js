// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
import TutorialScreen from './screens/FirstTime/TutorialScreen';
import SplashScreen from './screens/FirstTime/SplashScreen';
import LoginScreen from './screens/FirstTime/LoginScreen';
import MoodScreen from './screens/FirstTime/MoodScreen';
import ActivityScreen from './screens/FirstTime/ActivityScreen';
import EmotionScreen from './screens/FirstTime/EmotionScreen';
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName; 
          let iconColor;

          if (route.name === 'HomeScreen') {
            iconName = 'home';
            size = focused ? 30 : 25;
          } else if (route.name === 'StatisticsScreen') {
            iconName = 'stats-chart-outline';
            size = focused ? 30 : 25;
          } else if (route.name === 'AddCircleScreen') {
            iconName = 'add-circle';
            size = 60;
            focused = true; // Always keep AddCircleScreen focused
          } else if (route.name === 'NoteScreen') {
            iconName = 'document-text-outline';
            size = focused ? 30 : 25;
          } else if (route.name === 'SettingsScreen') {
            iconName = 'settings-outline';
            size = focused ? 30 : 25;
          }

          // Determine the icon color based on its state (active/inactive)
          if (focused) {
            iconColor = "#6331FF"; // Active
          } else {
            iconColor = "#828282"; // Inactive
          }

          const iconStyle = route.name === 'AddCircleScreen' ? styles.addCircleIcon : styles.defaultIcon;

          return (
            <View style={iconStyle}>
              <Ionicons name={iconName} size={size} color={iconColor} />
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabBar
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="StatisticsScreen" component={HomeScreen} />
      <Tab.Screen name="AddCircleScreen" component={HomeScreen} />
      <Tab.Screen name="NoteScreen" component={HomeScreen} />
      <Tab.Screen name="SettingsScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF",
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIcon: {
    position: 'absolute',
    bottom: 10,
  },
  addCircleIcon: {
    position: 'absolute',
    bottom: 10,
    shadowColor: '#5522AF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
});

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Mood" component={MoodScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Emotion" component={EmotionScreen} />
      <Stack.Screen name="AuthenticatedApp" component={AuthenticatedApp} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Load fonts
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}