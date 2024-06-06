import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Button from '../../components/Button';
import { BlurView } from 'expo-blur';
import moment from 'moment';

const Profil = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const userId = auth.currentUser?.uid;
    const [userData, setUserData] = useState(null);

    const [newUsername, setNewUsername] = useState('');
    const [isUsernameModalVisible, setUsernameModalVisible] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                    const data = userDoc.data();

                    // Convert any Timestamp fields to a more renderable format
                    const formattedData = Object.keys(data).reduce((acc, key) => {
                        if (data[key] instanceof Timestamp) {
                            acc[key] = data[key].toDate().toLocaleDateString();
                        } else {
                            acc[key] = data[key];
                        }
                        return acc;
                    }, {});

                    setUserData(formattedData);
                }
            } catch (error) {
                console.error("Données utilisateur introuvable.", error);
            }
        };

        if (userId) {
            getUserData();
        }
    }, [userId]);

    const items = [
        { key: "username", label: "", icon: "person-outline" },
        { key: "email", label: "", icon: "mail-outline" },
        { key: "isPremium", label: "Abonnement premium : ", icon: "star-outline" }
    ];

    const changeUsername = async () => {
        try {
            if (!newUsername) {
                Alert.alert("Veuillez entrer un nouveau pseudo.");
                return;
            }

            // Vérifier si le nouveau pseudo est différent de l'ancien
            if (newUsername === userData.username) {
                Alert.alert("Le nouveau pseudo est identique à l'ancien.");
                return;
            }     

            if (newUsername.length < 3) {
                Alert.alert('Attention', 'Le pseudo ne peut pas être inférieur à 3 caractères.');
                return;
            }
          
            if (newUsername.length > 20) {
                Alert.alert('Attention', 'Le pseudo ne peut pas dépasser 20 caractères.');
                return;
            }
              
            // Vérifier si le nom contient autre chose que des lettres et des chiffres
            const regex = /^[a-zA-Z0-9]*$/;
            if (!regex.test(newUsername)) {
                Alert.alert('Attention', 'Le pseudo ne peut contenir que des lettres et des chiffres.');
                return;
            }

            // Récupérer la date du dernier changement du pseudo de l'utilisateur depuis la base de données
            const userDataSnapshot = await getDoc(doc(db, "users", userId));
            const lastUsernameChangeTimestamp = userDataSnapshot.data().usernameChangedAt.toMillis();

            // Calculer la différence en millisecondes entre maintenant et la dernière fois que le pseudo a été changé
            const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;
            const millisecondsSinceLastChange = Date.now() - lastUsernameChangeTimestamp;

            if (millisecondsSinceLastChange < millisecondsInMonth) {
                Alert.alert("Vous ne pouvez changer votre pseudo qu'une fois par mois.");
                return;
            }

            // Mettre à jour le nom d'utilisateur dans la base de données
            await updateDoc(doc(db, "users", userId), {
                username: newUsername,
                updatedAt: Timestamp.now(),
                usernameChangedAt: Timestamp.now()
            });

            Alert.alert("Votre pseudo a bien été changé.");
            setUsernameModalVisible(false);
            navigation.navigate("Home");
            navigation.navigate("Profil");
        } catch (error) {
            Alert.alert("Erreur lors du changement du pseudo." + error.message);
        }
    };


    return (
        <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
            <View className="bg-primary-white rounded-[30px] items-center px-5 py-5">
                {userData ? (
                    <>
                        {items.map((item, index) => (
                            <View key={index} className="flex-row justify-between items-center mb-10">
                                <View className="flex-row items-center">
                                    <Ionicons name={item.icon} size={30} color={'#6331FF'} />
                                    <Text className="font-Qs-SemiBold text-[20px] p-2">
                                        {item.label} {item.key === 'isPremium' ? (userData[item.key] ? 'Oui' : 'Non') : userData[item.key]}
                                    </Text>
                                </View>
                                {item.key === 'username' && (
                                    <TouchableOpacity onPress={() => setUsernameModalVisible(true)}>
                                        <Ionicons name="refresh-circle" size={30} color={'#6331FF'} />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}
                        {userData.isPremium && (
                            <View className="flex-row justify-between items-center mb-10">
                                <View className="flex-row items-center">
                                    <Ionicons name="calendar-number-outline" size={30} color={'#6331FF'} />
                                    <Text className="font-Qs-SemiBold text-[20px] p-2">
                                        Depuis le : {userData.premiumSince}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View className="flex-row justify-between items-center mb-10">
                            <View className="flex-row items-center">
                                <Ionicons name="calendar-outline" size={30} color={'#6331FF'} />
                                <Text className="font-Qs-SemiBold text-[20px] p-2">
                                    Compte créé le : {userData.createdAt}
                                </Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text>Chargement du profil...</Text>
                )}


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isUsernameModalVisible}
                    onRequestClose={() => setUsernameModalVisible(false)}
                >
                    <BlurView intensity={50} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View className="bg-primary-white border border-primary-purple rounded-[30px] px-10 py-5 w-[90%]">
                        <TextInput
                            placeholder="Nouveau pseudo"
                            placeholderTextColor="#6331FF"
                            value={newUsername}
                            onChangeText={setNewUsername}
                            className="text-primary-purple bg-[#F2EDFF] font-Qs-Regular text-[16px] rounded-[15px] border border-primary-purple p-2 mb-5"
                        />
                        <TouchableOpacity onPress={changeUsername}>
                            <View className="flex-row justify-between items-center mb-5">
                            <Text className="font-Qs-SemiBold text-[20px] p-2">Confirmer</Text>
                            <Ionicons name="checkmark-circle" size={30} color={'#6331FF'}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setUsernameModalVisible(false)}>
                            <View className="flex-row justify-between items-center">
                            <Text className="font-Qs-SemiBold text-[20px] p-2">Annuler</Text>
                            <Ionicons name="close-circle" size={30} color={'#6331FF'}/>
                            </View>
                        </TouchableOpacity>
                        </View>
                    </BlurView>
                </Modal>
            </View>

            <Button text="Modifier le profil"  onPress={() => navigation.navigate("Security")} />
        </SafeAreaView>
    );
};

export default Profil;
