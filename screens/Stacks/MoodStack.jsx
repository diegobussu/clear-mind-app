// stacks/MoodStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ActivityScreen from "../Activity/ActivityScreen";

const stack = createNativeStackNavigator();

const MoodStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <stack.Screen name="Activity" component={ActivityScreen} />
    </stack.Navigator>
  );
};

export default MoodStack;