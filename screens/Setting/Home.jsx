import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Share, Linking, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { getAuth, signOut} from "firebase/auth";
import { app } from "../../firebaseConfig";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const Home = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const userId = auth.currentUser?.uid;

    const checkPremiumStatus = async () => {
        try {
            const userRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userRef);
    
            if (userDoc.exists()) {
                const userData = userDoc.data();
                return userData.isPremium === true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
    };

    const handlePress = async (item) => {
        const isPremium = await checkPremiumStatus();
        switch (item) {
            case "Profil":
                navigation.navigate('Profil');
                break;
            case "Sécurité":
                navigation.navigate('Security');
                break;
            case "Succès":
                if (isPremium) {
                    navigation.navigate('Success');
                } else {
                    Alert.alert("Cette fonctionnalité est réservée aux utilisateurs premium.");
                }
                break;
            case "Icônes":
                case "Succès":
                    if (isPremium) {
                        navigation.navigate('Icons');
                    } else {
                        Alert.alert("Cette fonctionnalité est réservée aux utilisateurs premium.");
                    }
                break;
            case "Thèmes":
                if (isPremium) {
                    navigation.navigate('Themes');
                } else {
                    Alert.alert("Cette fonctionnalité est réservée aux utilisateurs premium.");
                }
                break;
            case "Avis":
                navigation.navigate('Review');
                break;
            case "Partager":
                Share.share({
                    message: 'Partagez Clear Mind avec vos amis !'
                });
                break;
            case "Nous contacter":
                Linking.openURL('https://clear-mind.fr/pages/contact');
                break;
            case "Aide":
                Linking.openURL('https://clear-mind.fr/pages/help');
                break;
            case "Se déconnecter":
                Alert.alert(
                    "Confirmation",
                    "Êtes-vous sûr de vouloir vous déconnecter ?",
                    [
                        {
                            text: "Annuler",
                            style: "cancel"
                        },
                        {
                            text: "Déconnexion",
                            onPress: () => {
                                signOut(auth)
                                    .then(() => {
                                        console.log("Déconnexion réussie");
                                    })
                                    .catch((error) => {
                                        console.error("Erreur lors de la déconnexion.");
                                    });
                            }
                        }
                    ]
                );
                break;
            case "Instagram":
                Linking.openURL('https://www.instagram.com/clear.mindfr/');
                break;
            case "TikTok":
                Linking.openURL('https://www.tiktok.com/@clear.mind.fr?_t=8mUD5i9GZU1&_r=1');
                break;
            default:
                break;
        }
    };

  

    return (
        <SafeAreaView className="flex-1 justify-center items-center text-center px-5 bg-secondary-white">
            <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
                    <View className="bg-[#E2D2FF] rounded-lg p-7 mb-10 w-[300px]">
                        <View className="flex-row justify-center items-center mb-4">
                            <Text className="font-Qs-SemiBold text-[18px] text-primary-purple mr-5">Pass Premium</Text>
                            <Ionicons name="diamond-outline" size={30} color="#6331FF" />
                        </View>
                        <Text className="font-Qs-Regular text-[14px] text-center text-primary-purple">Accéder à toutes les fonctionnalités</Text>
                    </View>
                </TouchableOpacity>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Thèmes", "Succès", "Icônes"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                {item === "Succès" || item === "Thèmes" || item === "Icônes" ? (
                                    <Ionicons name="diamond-outline" size={30} color={'#6331FF'} />
                                ) : null}
                                <Text className="font-Qs-SemiBold text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>



                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Profil", "Sécurité", "Avis"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                <Text className="font-Qs-SemiBold text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Partager", "Nous contacter", "Aide"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                <Text className="font-Qs-SemiBold text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row justify-center space-x-3 mb-10">
                    <Ionicons name="logo-instagram" size={30} color={'#6331FF'} onPress={() => handlePress("Instagram")}/>
                    <Ionicons name="logo-tiktok" size={30} color={'#6331FF'} onPress={() => handlePress("TikTok")}/>
                </View>

                <Button text="Se déconnecter" onPress={() => handlePress("Se déconnecter")} />

                <Text className="font-Qs-Regular text-primary-grey mt-10 text-center text-[14px]">Copyright © 2024 Clear Mind app inc.</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
