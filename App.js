// App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Font from 'expo-font';
import TutorialStack from './screens/Stacks/TutorialStack';
import SplashStack from './screens/Stacks/SplashStack';
import LoginStack from './screens/Stacks/LoginStack';
import MoodStack from './screens/Stacks/MoodStack';
import ActivityStack from './screens/Stacks/ActivityStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
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
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Chargement des polices ...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Laissez le Stack.Navigator vide pour le moment */}
      </Stack.Navigator>
      <Tab.Navigator>
        <Tab.Screen name="Splash" component={SplashStack} />
        <Tab.Screen name="Tutorial" component={TutorialStack} />
        <Tab.Screen name="Login" component={LoginStack} />
        <Tab.Screen name="Mood" component={MoodStack} />
        <Tab.Screen name="Activity" component={ActivityStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
