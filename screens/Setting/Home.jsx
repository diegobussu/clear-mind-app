import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Share, Linking, Modal, TextInput, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import moment from 'moment';

const Home = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const auth = getAuth(app);
    const db = getFirestore(app);

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
                setModalVisible(true);
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

    const renderRatingStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Ionicons
                        name={i <= rating ? "star" : "star-outline"}
                        size={30}
                        color="#6331FF"
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };
    
    const handleSubmit = async () => {
      if (rating === 0) {
          Alert.alert("Attention", "Veuillez sélectionner au moins une étoile.");
      } else {
          try {
              const userId = auth.currentUser?.uid;
              const currentDate = moment().startOf('day');
              const currentFormattedDate = currentDate.format('DD-MM-YYYY');
  
              const currentReviewRef = doc(db, "users", userId, "reviews", currentFormattedDate);
  
              const currentReviewSnap = await getDoc(currentReviewRef);
              let reviewData;
  
              if (currentReviewSnap.exists()) {
                  // If the document exists, keep the existing createdAt value and update the rest
                  reviewData = {
                      rating: rating,
                      review: review,
                      createdAt: currentReviewSnap.data().createdAt,
                      updatedAt: Timestamp.now()
                  };
              } else {
                  // If the document does not exist, create new one with both createdAt and updatedAt
                  reviewData = {
                      rating: rating,
                      review: review,
                      createdAt: Timestamp.now(),
                      updatedAt: Timestamp.now()
                  };
              }
              
              await setDoc(currentReviewRef, reviewData);
  
              setModalVisible(false);
              Alert.alert('Merci', 'Votre avis a été enregistré avec succès.');
          } catch (error) {
              console.log(error);
              Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'enregistrement de votre avis.');
          }
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView className="flex-1 justify-center items-center bg-secondary-purple">
                    <View className="flex-row items-center absolute top-20 left-10 mb-5 mt-5">
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                          <Ionicons name="arrow-back-circle" size={40} color={'#FFF'} />
                      </TouchableOpacity>
                    </View>

                    <View className="bg-white rounded-lg p-7 w-11/12">
                        <Text className="font-sf-bold text-center text-[22px] mb-5">Votre Avis Clear Mind</Text>
                        <View className="flex-row justify-center mb-5">
                            {renderRatingStars()}
                        </View>
                        <TextInput
                            className="bg-gray-100 p-3 rounded-lg"
                            placeholder="Écrire un avis"
                            value={review}
                            onChangeText={setReview}
                            multiline
                            numberOfLines={4}
                            style={{ textAlignVertical: 'top', height: 80, width: '100%', marginBottom: 10 }}
                        />
                        <TouchableOpacity onPress={handleSubmit}>
                            <Text className="font-sf-medium text-[20px] mt-3 text-center text-primary-purple">Valider</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
};

export default Home;
