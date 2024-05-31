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
        { key: "username", label: "", icon: "person-outline" },
        { key: "email", label: "", icon: "mail-outline" },
        { key: "isPremium", label: "Abonnement premium : ", icon: "star-outline" }
    ];

    return (
        <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
            <View className="absolute top-20 left-50 flex-row items-center">
                <TouchableOpacity className="top-0 right-20" onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={40} color={'#6331FF'} />
                </TouchableOpacity>
                <View className="items-center mr-10">
                    <Text className="font-sf-medium text-[25px]">Profil</Text>
                </View>
            </View>

            <View className="bg-primary-white rounded-[30px] items-center px-10 py-5 mb-5">
                {userData ? (
                    <>
                        {items.map((item, index) => (
                            <View key={index} className="flex-row justify-between items-center mb-10">
                                <View className="flex-row items-center">
                                    <Ionicons name={item.icon} size={30} color={'#6331FF'} />
                                    <Text className="font-sf-medium text-[20px] p-2">
                                        {item.label} {item.key === 'isPremium' ? (userData[item.key] ? 'Oui' : 'Non') : userData[item.key]}
                                    </Text>
                                </View>
                            </View>
                        ))}
                        {userData.isPremium && (
                            <View className="flex-row justify-between items-center mb-10">
                                <View className="flex-row items-center">
                                    <Ionicons name="calendar-number-outline" size={30} color={'#6331FF'} />
                                    <Text className="font-sf-medium text-[20px] p-2">
                                        Depuis le : {userData.premiumSince}
                                    </Text>
                                </View>
                            </View>
                        )}
                        <View className="flex-row justify-between items-center mb-10">
                            <View className="flex-row items-center">
                                <Ionicons name="calendar-outline" size={30} color={'#6331FF'} />
                                <Text className="font-sf-medium text-[20px] p-2">
                                    Compte créé le : {userData.createdAt}
                                </Text>
                            </View>
                        </View>
                    </>
                ) : (
                    <Text>Chargement...</Text>
                )}
            </View>

            <Button text="Modifier le profil"  onPress={() => navigation.navigate("Security")} />
        </SafeAreaView>
    );
};

export default Profil;
