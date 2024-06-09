import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Mood from '../Main//Journal/Mood';
import Activity from '../Main//Journal/Activity';
import Emotion from '../Main//Journal/Emotion';
import Comment from '../Main//Journal/Comment';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const stack = createNativeStackNavigator();

const JournalStack = ({selectedDate}) => {
  const navigation = useNavigation();
  return (
    <stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9FF',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Qs-SemiBold'
        },
        headerTitleAlign: 'center',
        headerLeft: () => {
          if (route.name !== 'Mood') {
            return (
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="#6331FF"
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Mood")}
              />
            );
          }
          return null;
        },
      })}
    >
      <stack.Screen name="Mood" component={Mood} options={{ title: '1/4'}}/>
      <stack.Screen name="Activity" component={Activity} options={{ title: '2/4'}}/>
      <stack.Screen name="Emotion" component={Emotion} options={{ title: '3/4'}}/>
      <stack.Screen name="Comment" component={Comment} options={{ title: '4/4'}}/>
    </stack.Navigator>
  );
};

export default JournalStack;