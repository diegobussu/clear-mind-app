import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Data from '../Main/Data';

const stack = createNativeStackNavigator();

const DataStack = () => {
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
        }
      })}
    >
      <stack.Screen name="Data" component={Data} options={{ title: 'Données'}}/>
    </stack.Navigator>
  );
};

export default DataStack;