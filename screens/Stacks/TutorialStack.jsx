// stacks/TutorialStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../FirstTime/Login/LoginScreen";

const stack = createNativeStackNavigator();

const TutorialStack = () => {
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

export default TutorialStack;