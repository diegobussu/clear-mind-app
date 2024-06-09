import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../Main/Home';
import JournalStack from '../Stacks/Journal';

const stack = createNativeStackNavigator();

const HomeStack = () => {

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="JournalStack" component={JournalStack} />
    </stack.Navigator>
  );
};

export default HomeStack;