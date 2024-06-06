import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from '../Main/Home';
import moment from 'moment';
import 'moment/locale/fr';

const stack = createNativeStackNavigator();

// Fonction pour mettre une majuscule à la première lettre
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const HomeStack = () => {
  const currentMonthYear = capitalizeFirstLetter(moment().format('MMMM YYYY'));

  return (
    <stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#F9F9FF',
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontSize: 20
        },
      }}
    >
      <stack.Screen name="Home" component={Home} options={{ title: currentMonthYear }} />
    </stack.Navigator>
  );
};

export default HomeStack;