import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../../firebaseConfig";
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import Logo from '../../assets/img/favicon.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
      })
      .catch((error) => {
        setError("Identifiants ou mot de passe incorrects");
      });
  };

  return (
    <SafeAreaView className="justify-center px-5 mr-10 ml-10 mt-20">
      <View className="items-center">
        <Image source={Logo} className="mb-10" />
      </View>
      <Text className="text-4xl mb-5 font-Qs-Medium text-center">Connexion</Text>
      <TextInput
        className="border border-gray-300 p-2 mb-2 rounded font-Qs-Regular"
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
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
      {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}
      <Button text="Connexion" onPress={handleLogin}></Button>
      <Text className="font-Qs-SemiBold text-white-purple text-center mt-10">Vous n'avez pas encore de compte ? Inscrivez-vous !</Text>
      <ButtonWhite text="Inscription" onPress={() => navigation.navigate("SignUp")}></ButtonWhite>
    </SafeAreaView>
  );
};

export default Login;
