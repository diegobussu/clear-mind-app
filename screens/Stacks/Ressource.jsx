import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ressource from '../Main/Ressource';

const stack = createNativeStackNavigator();

const RessourceStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Ressource" component={Ressource} />
    </stack.Navigator>
  );
};

export default RessourceStack;