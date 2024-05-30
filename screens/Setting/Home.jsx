import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Share, Linking, Modal, TextInput, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();

    const handlePress = (item) => {
        switch (item) {
            case "Rappels":
                navigation.navigate('Rappel');
                break;
            case "Sécurité":
                navigation.navigate('Security');
                break;
            case "Langues":
                navigation.navigate('Home');
                break;
            case "Modifier les humeurs":
                navigation.navigate('Mood');
                break;
            case "Succès":
                navigation.navigate('Home');
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
                Linking.openURL('https://clear-mind.fr/pages/contact.php');
                break;
            case "Aide":
                Linking.openURL('https://clear-mind.fr/pages/help.php');
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View className="bg-[#E2D2FF] rounded-lg p-7 mb-10 w-[300px]">
                        <View className="flex-row justify-center items-center mb-4">
                            <Text className="font-sf-medium text-[18px] text-primary-purple mr-5">Pass Premium</Text>
                            <Ionicons name="diamond-outline" size={30} color="#6331FF" />
                        </View>
                        <Text className="font-sf-regular text-[12px] text-center text-primary-purple">Accéder à toutes les fonctionnalités</Text>
                    </View>
                </TouchableOpacity>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Rappels", "Sécurité", "Langues"].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handlePress(item)}>
                            <View key={index} className="flex-row justify-between items-center mb-4">
                                <Text className="font-sf-regular text-[18px]">{item}</Text>
                                <Ionicons name="chevron-forward" size={30} color={'#6331FF'} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <View className="bg-primary-white rounded-lg p-7 mb-10">
                    {["Modifier les humeurs", "Succès", "Avis"].map((item, index) => (
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

                <Text className="font-sf-ultralightitalic text-primary-grey text-center text-[14px]">Copyright © 2024 Clear Mind app inc.</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
