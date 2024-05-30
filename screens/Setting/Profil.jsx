import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { doc, getFirestore, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import Button from '../../components/Button';

const Profil = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const userId = auth.currentUser?.uid;
    const [userData, setUserData] = useState(null);

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
        { key: "username", label: "Nom :", icon: "person" },
        { key: "email", label: "Email :", icon: "mail" },
        { key: "isPremium", label: "Abonnement premium :", icon: "star" },
        { key: "createdAt", label: "Compte créé le :", icon: "calendar" }
    ];

    const handleSubscriptionChange = async () => {
        if (userData.isPremium) {
            // Handle unsubscription
            Alert.alert(
                "Confirmation",
                "Voulez-vous vraiment vous désabonner ?",
                [
                    {
                        text: "Annuler",
                        style: "cancel"
                    },
                    {
                        text: "Confirmer",
                        onPress: async () => {
                            try {
                                const userDocRef = doc(db, 'users', userId);
                                await updateDoc(userDocRef, {
                                    isPremium: false,
                                    premiumCancel: Timestamp.now(),
                                    updateAt: Timestamp.now()
                                });
                                setUserData(prevState => ({ ...prevState, isPremium: false }));
                                Alert.alert(
                                    "Oh non ! Vous partez déjà..",
                                    "Vous avez été désabonné de Clear Mind Premium."
                                );
                            } catch (error) {
                                console.error("Erreur lors du désabonnement :", error);
                                Alert.alert(
                                    "Erreur",
                                    "Une erreur est survenue lors du désabonnement. Veuillez réessayer."
                                );
                            }
                        }
                    }
                ]
            );
        } else {
            // Handle subscription
            Alert.alert(
                "Confirmation",
                "Voulez-vous vraiment vous abonner ?",
                [
                    {
                        text: "Annuler",
                        style: "cancel"
                    },
                    {
                        text: "Confirmer",
                        onPress: async () => {
                            try {
                                const userDocRef = doc(db, 'users', userId);
                                await updateDoc(userDocRef, {
                                    isPremium: true,
                                    premiumSince: Timestamp.now(),
                                    updateAt: Timestamp.now()
                                });
                                setUserData(prevState => ({ ...prevState, isPremium: true, premiumSince: Timestamp.now().toDate().toLocaleDateString() }));
                                Alert.alert(
                                    "Bienvenue !",
                                    "Vous êtes maintenant abonné à Clear Mind Premium."
                                );
                            } catch (error) {
                                console.error("Erreur lors de l'abonnement :", error);
                                Alert.alert(
                                    "Erreur",
                                    "Une erreur est survenue lors de l'abonnement. Veuillez réessayer."
                                );
                            }
                        }
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
            <View className="flex-row items-center mb-10 mt-5">
                <TouchableOpacity className="top-0 right-20" onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={40} color={'#6331FF'} />
                </TouchableOpacity>
                <View className="items-center mr-10">
                    <Text className="font-sf-medium text-[25px]">Profil</Text>
                </View>
            </View>

            <View className="bg-primary-white rounded-[30px] px-10 py-5 mb-5">
                {userData ? (
                    <>
                        {items.map((item, index) => (
                            <View key={index} className="flex-row justify-between items-center mb-10">
                                <View className="flex-row items-center">
                                    <Ionicons name={item.icon} size={30} color={'#6331FF'} />
                                    <Text className="font-sf-regular text-[20px] p-2 ml-3">
                                        {item.label} {item.key === 'isPremium' ? (userData[item.key] ? 'Oui' : 'Non') : userData[item.key]}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        {userData.isPremium && (
                            <View className="flex-row justify-between items-center mb-10">
                                <View className="flex-row items-center">
                                    <Ionicons name="calendar-number" size={30} color={'#6331FF'} />
                                    <Text className="font-sf-regular text-[20px] p-2 ml-3">
                                        Depuis le : {userData.premiumSince}
                                    </Text>
                                </View>
                            </View>
                        )}
                    </>
                ) : (
                    <Text>Loading...</Text>
                )}
            </View>

            <Button text={userData?.isPremium ? "Se désabonner" : "S'abonner"} onPress={handleSubscriptionChange} />
        </SafeAreaView>
    );
};

export default Profil;
