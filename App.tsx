import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useLayoutEffect, useState } from 'react';
import IconButton from './components/ui/IconButton';
import { AddPlace } from './screens/AddPlace';
import { AllPlaces } from './screens/AllPlaces';
import { Map } from './screens/Map';
import { PlaceDetails } from './screens/PlaceDetails';
import { RootStackParamList } from './types/types';
import { Colors } from './utils/colors';
import { init } from './utils/db';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const [dbInitialized, setDbInitialized] = useState(false);

  useLayoutEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }

    if (!dbInitialized) {
      return null;
    }
  }, [dbInitialized]);
  onLayoutRootView();

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
              title: 'Favorite Places',
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
            options={{ title: 'Add your favorite Place' }}
          />
          <Stack.Screen name="Map" component={Map} options={{ title: 'Map' }} />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{ title: 'Loading Place...' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
