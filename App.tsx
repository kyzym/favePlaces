import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton';
import { AddPlace } from './screens/AddPlace';
import { AllPlaces } from './screens/AllPlaces';
import { Colors } from './utils/colors';
import { Map } from './screens/Map';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  color={tintColor || '#000'}
                  icon="add"
                  size={28}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: 'Add a new Place' }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: 'Some things on the map' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
