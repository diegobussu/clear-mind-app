import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Username from '../GetStarted/Username';
import Mood from '../GetStarted/Mood';
import Activity from '../GetStarted/Activity';
import Emotion from '../GetStarted/Emotion';

const Stack = createNativeStackNavigator();

const Started = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <Stack.Screen name="Username" component={Username} />
      <Stack.Screen name="Mood" component={Mood} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Emotion" component={Emotion} />
    </Stack.Navigator>
  );
};

export default Started;
