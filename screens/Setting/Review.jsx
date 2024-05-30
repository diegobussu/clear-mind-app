import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from "firebase/auth";
import { Timestamp, doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../firebaseConfig";
import moment from 'moment';

const Review = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const auth = getAuth(app);
  const db = getFirestore(app);


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

            navigation.goBack();
            Alert.alert('Merci', 'Votre avis a été enregistré avec succès.');
        } catch (error) {
            console.log(error);
            Alert.alert('Erreur', 'Une erreur s\'est produite lors de l\'enregistrement de votre avis.');
        }
    }
  };


  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-secondary-purple">
        <View className="flex-row items-center absolute top-20 left-10 mb-5 mt-5">
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-circle" size={40} color={'#FFF'} />
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-lg p-7 w-11/12">
            <Text className="font-sf-bold text-center text-[22px] mb-5">Nous avons besoin de vous !</Text>
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
  );
};

export default Review;
