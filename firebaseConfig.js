import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDA_f1wZZqqvhFBM3ss-TNyfmDsqzRy6UI",
    authDomain: "my-digital-project-aa48f.firebaseapp.com",
    projectId: "my-digital-project-aa48f",
    storageBucket: "my-digital-project-aa48f.appspot.com",
    messagingSenderId: "75905649505",
    appId: "1:75905649505:web:c992fe500d177f5d8f9320",
    measurementId: "G-6E9B3YN976"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };