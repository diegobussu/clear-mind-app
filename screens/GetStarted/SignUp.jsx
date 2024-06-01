import { Ionicons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, setDoc, getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../../firebaseConfig";
import Button from '../../components/Button';
import Logo from '../../assets/img/favicon.png';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const db = getFirestore(app);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async () => {
    if (!isEmailValid(email)) {
      setError("Veuillez entrer une adresse e-mail valide");
      return;
    }
    if (!isPasswordValid(password)) {
      setError("Le mot de passe doit faire au moins 8 caractères et contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        isPremium: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
    
    } catch (error) {

      if (error.code === "auth/email-already-in-use") {
        setError("Cet e-mail est déjà associé à un compte.");
      } else {
        setError("Une erreur s'est produite lors de l'inscription.");
      }
    }
  };

  return (
    <SafeAreaView className="justify-center px-5 mr-10 ml-10 mt-20">
        <View className="items-center">
          <Image source={Logo} className="mb-10" />
        </View>
        <Text className="text-4xl mb-5 font-Qs-Medium text-center">Inscription</Text>
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded font-Qs-Regular"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View className="flex-row items-center border border-gray-300 p-2 mb-2 rounded">
          <TextInput
            className="flex-1 font-Qs-Regular"
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons name={passwordVisible ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center border border-gray-300 p-2 mb-10 rounded">
          <TextInput
            className="flex-1 font-Qs-Regular"
            placeholder="Confirmer le mot de passe"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry={!passwordConfirmVisible}
          />
          <TouchableOpacity onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)}>
            <Ionicons name={passwordConfirmVisible ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}
        <Button text="S'inscrire" onPress={handleSignUp}></Button>
    </SafeAreaView>
  );
};

export default SignUp;
