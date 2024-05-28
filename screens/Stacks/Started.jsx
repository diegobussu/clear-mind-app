import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pseudo from '../GetStarted/Pseudo';
import Mood from '../GetStarted/Mood';
import Activity from '../GetStarted/Activity';
import Emotion from '../GetStarted/Emotion';

const Stack = createNativeStackNavigator();

const Started = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Pseudo" component={Pseudo} />
      <Stack.Screen name="Mood" component={Mood} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Emotion" component={Emotion} />
    </Stack.Navigator>
  );
};

export default Started;
