import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Security from '../Setting/Security';
import Mood from '../Setting/Mood';
import Rappel from '../Setting/Rappel';
import Home from '../Setting/Home';

const stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Rappel" component={Rappel} />
      <stack.Screen name="Security" component={Security} />
      <stack.Screen name="Mood" component={Mood} />
    </stack.Navigator>
  );
};

export default SettingStack;