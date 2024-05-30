import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Share, Linking, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { getAuth, signOut} from "firebase/auth";
import { app } from "../../firebaseConfig";

const Home = () => {
    const navigation = useNavigation();
    const auth = getAuth(app);

    const handlePress = (item) => {
        switch (item) {
            case "Rappels":
                navigation.navigate('Rappel');
                break;
            case "Sécurité":
                navigation.navigate('Security');
                break;
            case "Succès":
                Alert.alert("Cette fonctionnalité est reservée aux premium.");
                break;
            case "Personnalisation":
                navigation.navigate('Mood');
                break;
            case "Thèmes":
                Alert.alert("Cette fonctionnalité est reservée aux premium.");
                break;
            case "Votre avis":
                navigation.navigate('Review');
                break;
            case "Partager":
                Share.share({
                    message: 'Partagez Clear Mind avec vos amis !'
                });
                break;
            case "Nous contacter":
                Linking.openURL('https://clear-mind.fr/pages/contact.php');
                break;
            case "Aide":
                Linking.openURL('https://clear-mind.fr/pages/help.php');
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
            <View className="flex-row items-center mb-5 mt-5">
                <TouchableOpacity className="top-0 right-20" onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={40} color={'#6331FF'} />
                </TouchableOpacity>
                <View className="items-center">
                    <Text className="font-sf-medium text-[25px]">Paramètres</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 5 }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
                    <View className="bg-[#E2D2FF] rounded-lg p-7 mb-10 w-[300px]">
                        <View className="flex-row justify-center items-center mb-4">
                            <Text className="font-sf-medium text-[18px] text-primary-purple mr-5">Pass Premium</Text>
                            <Ionicons name="diamond-outline" size={30} color="#6331FF" />
                        </View>
                        <Text className="font-sf-regular text-[14px] text-center text-primary-purple">Accéder à toutes les fonctionnalités</Text>
                    </View>
                </TouchableOpacity>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Rappels", "Succès", "Thèmes"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                <Text className="font-sf-regular text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Personnalisation", "Sécurité", "Votre avis"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                <Text className="font-sf-regular text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Partager", "Nous contacter", "Aide"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                <Text className="font-sf-regular text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="flex-row justify-center space-x-3">
                    <Ionicons name="logo-instagram" size={30} color={'#6331FF'} onPress={() => handlePress("Instagram")}/>
                    <Ionicons name="logo-tiktok" size={30} color={'#6331FF'} onPress={() => handlePress("TikTok")}/>
                </View>

                <Button text="Se déconnecter" onPress={() => handlePress("Se déconnecter")} />

                <Text className="font-sf-ultralightitalic text-primary-grey mt-10 text-center text-[14px]">Copyright © 2024 Clear Mind app inc.</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
