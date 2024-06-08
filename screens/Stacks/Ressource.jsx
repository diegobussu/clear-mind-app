import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';
import Ressource from '../Main/Ressource';

const stack = createNativeStackNavigator();

const RessourceStack = () => {
  return (
    <stack.Navigator
      screenOptions={() => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9FF',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20
        },
      })}
    >
      <stack.Screen name="Ressource" component={Ressource} options={{ title: 'Ressources'}}/>
    </stack.Navigator>
  );
};

export default RessourceStack;