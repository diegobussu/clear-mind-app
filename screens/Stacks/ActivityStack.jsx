// stacks/ActivityStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Login/LoginScreen";

const stack = createNativeStackNavigator();

const ActivityStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <stack.Screen name="Login" component={LoginScreen} />
    </stack.Navigator>
  );
};

export default ActivityStack;