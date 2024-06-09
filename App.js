import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext, AuthProvider } from "./Authentification";
import { app } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, getDocs, setDoc, doc, updateDoc, getDoc, Timestamp } from "firebase/firestore";
import * as Font from 'expo-font';
import moment from 'moment';
import Home from './screens/Stacks/Home';
import Data from './screens/Stacks/Data';
import Journal from './screens/Stacks/Journal';
import Ressource from './screens/Stacks/Ressource';
import Setting from './screens/Stacks/Setting';
import Started from './screens/Stacks/Started';
import Authentification from "./screens/Stacks/Authentification";
import LoadingScreen from './screens/LoadingScreen';

async function loadFonts() {
  await Font.loadAsync({
    'Qs-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    'Qs-Light': require('./assets/fonts/Quicksand-Light.ttf'),
    'Qs-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
    'Qs-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
    'Qs-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf')
  });
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

async function addNewEntry() {
  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;
  if (userId) {
    const date = moment(); 
    const formattedDate = date.format('DD-MM-YYYY');
    const entryRef = doc(db, 'users', userId, 'entries', formattedDate);

    const entrySnap = await getDoc(entryRef);
    if (entrySnap.exists()) {
      const currentCount = entrySnap.data().count || 0;
      const newCount = currentCount + 1;

      try {
        await updateDoc(entryRef, {
          count: newCount
        });
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    } else {
      const entryData = {
        count: 1,
        createdAt: Timestamp.now(),
      };
      try {
        await setDoc(entryRef, entryData);
      } catch (error) {
        console.error('Error setting entry:', error);
      }
    }
  }
}




function AuthenticatedApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName; 
          let iconColor;
          if (route.name === 'Started') {
          }
          if (route.name === 'HomeStack') {
            iconName = 'home-outline';
            size = focused ? 30 : 25;
            iconColor = "#6331FF";
          } else if (route.name === 'DataStack') {
            iconName = 'stats-chart-outline';
            size = focused ? 30 : 25;
            iconColor = "#6331FF";
          } else if (route.name === 'JournalStack') {
            iconName = 'book-outline';
            size = 40;
            iconColor = "#6331FF";
          } else if (route.name === 'RessourceStack') {
            iconName = 'document-text-outline';
            size = focused ? 30 : 25;
            iconColor = "#6331FF";
          } else if (route.name === 'SettingStack') {
            iconName = 'settings-outline';
            size = focused ? 30 : 25;
            iconColor = "#6331FF";
          }

          if (focused) {
            iconName = iconName.replace('-outline', '');
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
      <Tab.Screen name="HomeStack" component={Home} />
      <Tab.Screen name="DataStack" component={Data} />
      <Tab.Screen name="JournalStack" component={Journal} />
      <Tab.Screen name="RessourceStack" component={Ressource} />
      <Tab.Screen name="SettingStack" component={Setting} />
    </Tab.Navigator>
  );
}



const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFF",
    height: 100,
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
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error checking journal existence:', error);
          setLoading(false);
        });
    }
  }, [auth, db]);
  
  if (loading) {
    return <LoadingScreen />;
  }

  // Ajoute une nouvelle entrée lorsque l'utilisateur se connecte
  addNewEntry();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      {!hasJournals && <Stack.Screen name="Started" component={Started} />}
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