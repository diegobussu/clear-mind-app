// stacks/SplashStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TutorialScreen from "../FirstTime/Tutorial/TutorialScreen";

const stack = createNativeStackNavigator();

const SplashStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <stack.Screen name="Tutorial" component={TutorialScreen} />
    </stack.Navigator>
  );
};

export default SplashStack;