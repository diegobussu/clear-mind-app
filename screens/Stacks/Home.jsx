import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../Main/Home';

const stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Home" component={Home} />
    </stack.Navigator>
  );
};

export default HomeStack;