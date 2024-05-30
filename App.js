import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext, AuthProvider } from "./Authentification";
import * as Font from 'expo-font';
import Home from './screens/Home';
import Setting from './screens/Stacks/Setting';
import Data from './screens/Data';
import Ressource from './screens/Ressource';
import Journal from './screens/Journal';
import Started from './screens/Stacks/Started';
import Authentification from "./screens/Stacks/Authentification";
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

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
  const [hasJournals, setHasJournalsWithEmotions] = useState(false);

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const journalCollectionRef = collection(db, 'users', userId, 'journals');
      const journalQuery = query(journalCollectionRef);
      getDocs(journalQuery)
        .then((snapshot) => {
          let found = false;
          snapshot.forEach((doc) => {
            if (doc.data().hasOwnProperty('note')) {
              found = true;
            }
          });
          setHasJournalsWithEmotions(found);
        })
        .catch((error) => {
          console.error('Error checking journal existence:', error);
        });
    }
  }, [auth, db]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName; 
          let iconColor;

          if (route.name === 'Home') {
            iconName = 'home-outline';
            size = focused ? 30 : 25;
          } else if (route.name === 'Data') {
            iconName = 'stats-chart-outline';
            size = focused ? 30 : 25;
          } else if (route.name === 'Journal') {
            iconName = 'add-circle';
            size = 60;
            focused = true; // Always keep AddCircleScreen focused
          } else if (route.name === 'Ressource') {
            iconName = 'document-text-outline';
            size = focused ? 30 : 25;
          } else if (route.name === 'Setting') {
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
      {!hasJournals && <Tab.Screen name="Started" component={Started} options={{ tabBarStyle: { display: 'none' } }} />}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Data" component={Data} options={{ tabBarStyle: { display: 'none' } }} />
      <Tab.Screen name="Journal" component={Journal} />
      <Tab.Screen name="Ressource" component={Ressource} options={{ tabBarStyle: { display: 'none' } }} />
      <Tab.Screen name="Setting" component={Setting} options={{ tabBarStyle: { display: 'none' } }} />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF",
    height: 110,
    justifyContent: 'center',
    alignItems: 'center'
  },
  defaultIcon: {
    position: 'absolute',
    bottom: 10
  },
  addCircleIcon: {
    position: 'absolute',
    bottom: 10
  },
});

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="AuthenticatedApp" component={AuthenticatedApp} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer>
          {({ isAuthenticated }) =>
            isAuthenticated ? <MainNavigator /> : <Authentification />
          }
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider>
  );
}