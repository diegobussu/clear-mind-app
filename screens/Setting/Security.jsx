import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Linking, Alert, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { getAuth, updateEmail, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { app } from "../../firebaseConfig";

const Security = () => {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailModalVisible, setEmailModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleChangeEmail = async () => {
    try {
      if (!newEmail) {
        Alert.alert("Veuillez entrer un nouvel e-mail.");
        return;
      }

      if (!isEmailValid(newEmail)) {
        Alert.alert("Veuillez entrer une adresse e-mail valide");
        return;
      }

      if (newEmail === auth.currentUser.email) {
        Alert.alert("Le nouvel e-mail doit être différent de l'e-mail actuel.");
        return;
      }
      await updateEmail(auth.currentUser, newEmail);
      Alert.alert("Un lien a été envoyé sur votre nouvel email.");
      setEmailModalVisible(false);
    } catch (error) {
      Alert.alert("Erreur lors du changement d'email.");
    }
  };

  const handleChangePassword = async () => {
    try {      
      await sendPasswordResetEmail(auth, auth.currentUser.email);
      Alert.alert("Un lien de réinitialisation de mot de passe a été envoyé sur votre email.");
    } catch (error) {
      Alert.alert("Erreur lors de la réinitialisation du mot de passe.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!password) {
        Alert.alert("Veuillez entrer votre mot de passe.");
        return;
      }

      const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteUser(auth.currentUser);
      Alert.alert("Votre compte a été supprimé.");
    } catch (error) {
      Alert.alert("Erreur lors de la suppression du compte.", error);
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
    <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
      <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
        <View className="bg-primary-white rounded-[30px] px-10 py-5 mb-5 mt-20">
          <TouchableOpacity onPress={() => setEmailModalVisible(true)}>
            <View className="flex-row justify-between items-center mb-10">
              <Text className="font-sf-regular text-[20px] p-2">Modifier votre email</Text>
              <Ionicons name="chevron-forward" size={30} color={'#6331FF'}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleChangePassword}>
            <View className="flex-row justify-between items-center mb-10">
              <Text className="font-sf-regular text-[20px] p-2">Modifier votre mot de passe</Text>
              <Ionicons name="chevron-forward" size={30} color={'#6331FF'}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
            <View className="flex-row justify-between items-center mb-10">
              <Text className="font-sf-regular text-[20px] p-2">Supprimer votre compte</Text>
              <Ionicons name="chevron-forward" size={30} color={'#6331FF'}/>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL('https://clear-mind.fr/pages/contact')}
          className="bg-primary-purple mt-8 py-3 rounded-full shadow flex items-center justify-center w-[250px] mx-auto"
        >
          <Text className="text-white font-sf-regular text-lg">Signaler un problème ?</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEmailModalVisible}
        onRequestClose={() => setEmailModalVisible(false)}
      >
        <BlurView intensity={50} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="bg-primary-white border border-primary-purple rounded-[30px] px-10 py-5 w-[90%]">
            <TextInput
              placeholder="Nouvel Email"
              placeholderTextColor="#6331FF"
              value={newEmail}
              onChangeText={formatNewEmail}
              className="text-primary-purple bg-[#F2EDFF] font-sf-medium text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
            />
            <TouchableOpacity onPress={handleChangeEmail}>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="font-sf-medium text-[20px] p-2">Confirmer</Text>
                <Ionicons name="checkmark-circle" size={30} color={'#6331FF'}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEmailModalVisible(false)}>
              <View className="flex-row justify-between items-center">
                <Text className="font-sf-medium text-[20px] p-2">Annuler</Text>
                <Ionicons name="close-circle" size={30} color={'#6331FF'}/>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <BlurView intensity={50} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="bg-primary-white border border-primary-purple rounded-[30px] px-10 py-5 w-[90%]">
            <TextInput
              placeholder="Mot de passe actuel"
              placeholderTextColor="#6331FF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              className="text-primary-purple bg-[#F2EDFF] font-sf-medium text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
            />
            <TouchableOpacity onPress={handleDeleteAccount}>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="font-sf-medium text-[20px] p-2">Confirmer</Text>
                <Ionicons name="checkmark-circle" size={30} color={'#6331FF'}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setDeleteModalVisible(false)}>
              <View className="flex-row justify-between items-center">
                <Text className="font-sf-medium text-[20px] p-2">Annuler</Text>
                <Ionicons name="close-circle" size={30} color={'#6331FF'}/>
              </View>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

export default Security;

