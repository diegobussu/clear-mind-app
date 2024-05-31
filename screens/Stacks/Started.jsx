import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Username from '../GetStarted/Username';
import Mood from '../Diary/Mood';
import Activity from '../Diary/Activity';
import Emotion from '../Diary/Emotion';
import Comment from '../Diary/Comment';

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
      <Stack.Screen name="Comment" component={Comment} />
    </Stack.Navigator>
  );
};

export default Started;
