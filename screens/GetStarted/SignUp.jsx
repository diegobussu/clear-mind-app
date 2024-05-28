import { Ionicons } from "@expo/vector-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { app } from "../../firebaseConfig";
import Button from '../../components/Button';
import Logo from '../../assets/img/favicon.png';
import ArrowImage from '../../components/ArrowImage';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const auth = getAuth(app);

  const handleSignUp = () => {
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.navigate("AuthenticatedApp");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <SafeAreaView className="justify-center px-5 mr-10 ml-10 mt-20">
        <ArrowImage source={require('../../assets/img/left-arrow.png')} />
        <View className="items-center">
          <Image source={Logo} className="mb-10" />
        </View>
        <Text className="text-4xl mb-5 font-sf-medium text-center">Inscription</Text>
        <TextInput
          className="border border-gray-300 p-2 mb-2 rounded"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <View className="flex-row items-center border border-gray-300 p-2 mb-2 rounded">
          <TextInput
            className="flex-1"
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
            className="flex-1"
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
