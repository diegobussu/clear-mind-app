import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Security from '../Setting/Security';
import Home from '../Setting/Home';
import Review from '../Setting/Review';

import Premium from '../Setting/Premium';
import Profil from '../Setting/Profil';
import Mood from '../Setting/Mood';
import Icons from '../Setting/Icons';
import Success from '../Setting/Success';
import Themes from '../Setting/Themes';

const stack = createNativeStackNavigator();

const SettingStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <stack.Screen name="Home" component={Home} />
      <stack.Screen name="Security" component={Security} />
      <stack.Screen name="Review" component={Review} />
      <stack.Screen name="Premium" component={Premium} />

      <stack.Screen name="Profil" component={Profil} />
      <stack.Screen name="Mood" component={Mood} />
      <stack.Screen name="Success" component={Success} />
      <stack.Screen name="Icons" component={Icons} />
      <stack.Screen name="Themes" component={Themes} />
    </stack.Navigator>
  );
};

export default SettingStack;