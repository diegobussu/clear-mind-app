// stacks/LoginStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MoodScreen from "../FirstTime/Mood/MoodScreen";

const stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <stack.Screen name="Mood" component={MoodScreen} />
    </stack.Navigator>
  );
};

export default LoginStack;