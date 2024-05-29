import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tutorial from '../GetStarted/Tutorial';
import Login from '../GetStarted/Login';
import SignUp from '../GetStarted/SignUp';

const stack = createNativeStackNavigator();

const Authentification = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >

      <stack.Screen name="Tutorial" component={Tutorial} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="SignUp" component={SignUp} />
    </stack.Navigator>
  );
};

export default Authentification;