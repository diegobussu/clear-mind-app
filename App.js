// App.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import TutorialScreen from './screens/TutorialScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'SF-Ultralight': require('./assets/fonts/SF-Pro-Text-Ultralight.otf'),
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
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Tutorial" component={TutorialScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/> 
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



