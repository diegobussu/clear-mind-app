import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Journal from '../Main/Journal';

const stack = createNativeStackNavigator();

const JournalStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Journal" component={Journal} />
    </stack.Navigator>
  );
};

export default JournalStack;