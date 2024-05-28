// screens/Stacks/Authentification.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from '../GetStarted/Splash';
import Tutorial from '../GetStarted/Tutorial';
import Login from '../GetStarted/Login';
import SignUp from '../GetStarted/SignUp';
import Started from '../GetStarted/Started';
import Mood from '../GetStarted/Mood';
import Activity from '../GetStarted/Activity';
import Emotion from '../GetStarted/Emotion';

const stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Splash" component={Splash} />
      <stack.Screen name="Tutorial" component={Tutorial} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="SignUp" component={SignUp} />
      <stack.Screen name="Started" component={Started} />
      <stack.Screen name="Mood" component={Mood} />
      <stack.Screen name="Activity" component={Activity} />
      <stack.Screen name="Emotion" component={Emotion} />
    </stack.Navigator>
  );
};

export default AuthStack;