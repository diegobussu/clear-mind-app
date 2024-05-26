// stacks/ActivityStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";

const stack = createNativeStackNavigator();

const ActivityStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <stack.Screen name="Home" component={HomeScreen} />
    </stack.Navigator>
  );
};

export default ActivityStack;