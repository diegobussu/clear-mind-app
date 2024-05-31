import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Data from '../Main/Data';

const stack = createNativeStackNavigator();

const DataStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Data" component={Data} />
    </stack.Navigator>
  );
};

export default DataStack;