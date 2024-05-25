// App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import TutorialScreen from './screens/TutorialScreen';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MoodScreen from './screens/MoodScreen';
import HomeScreen from './screens/HomeScreen';

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
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Mood"
          component={MoodScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
