import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, Modal, SafeAreaView, Alert } from "react-native";
import { BlurView } from 'expo-blur';
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
  const [email, setNewEmail] = useState('');
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
      })
      .catch((error) => {
        setError("Identifiants ou mot de passe incorrects.");
      });
  };

  const handleChangeEmail = async () => {
    try {
      if (!email) {
        Alert.alert("Veuillez entrer votre votre e-mail.");
        return;
      }

      if (!isEmailValid(email)) {
        Alert.alert("Veuillez entrer une adresse mail valide.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      Alert.alert("Un lien de réinitialisation de mot de passe a été envoyé sur votre email.");
      setEmailModalVisible(false);
    } catch (error) {
      Alert.alert("Erreur lors du changement d'email.");
    }
  };
  
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatNewEmail = (text) => {
    const formattedText = text.charAt(0).toLowerCase() + text.slice(1);
    setNewEmail(formattedText);
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
      <Text onPress={() => setEmailModalVisible(true)} className="font-Qs-SemiBold text-white-purple text-center">Mot de passe oublié ?</Text>
      {error ? <Text className="text-red-500 text-center mb-3">{error}</Text> : null}
      <Button text="Connexion" onPress={handleLogin}></Button>
      <Text className="font-Qs-SemiBold text-white-purple text-center mt-10">Vous n'avez pas encore de compte ? Inscrivez-vous !</Text>
      <ButtonWhite text="Inscription" onPress={() => navigation.navigate("SignUp")}></ButtonWhite>




      <Modal
        animationType="slide"
        transparent={true}
        visible={isEmailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <BlurView intensity={50} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="bg-primary-white border border-primary-purple rounded-[30px] px-10 py-5 w-[90%]">
            <TextInput
              placeholder="Saisir votre email"
              placeholderTextColor="#6331FF"
              value={email}
              onChangeText={formatNewEmail}
              className="text-primary-purple bg-[#F2EDFF] font-Qs-Regular text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
            />
            <TouchableOpacity onPress={handleChangeEmail}>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="font-Qs-SemiBold text-[20px] p-2">Confirmer</Text>
                <Ionicons name="checkmark-circle" size={30} color={'#6331FF'}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEmailModalVisible(false)}>
              <View className="flex-row justify-between items-center">
                <Text className="font-Qs-SemiBold text-[20px] p-2">Annuler</Text>
                <Ionicons name="close-circle" size={30} color={'#6331FF'}/>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

    </SafeAreaView>
  );
};

export default Login;
