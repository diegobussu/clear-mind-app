import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Journal from '../Main/Journal';

const stack = createNativeStackNavigator();

const JournalStack = () => {
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
      <stack.Screen name="Journal" component={Journal} options={{ title: 'Journal quoditien'}}/>
    </stack.Navigator>
  );
};

export default JournalStack;