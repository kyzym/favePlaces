import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { LatLng } from 'react-native-maps';
import {
  Location,
  PickedLocation,
  RootStackParamList,
} from '../../types/types';
import { Colors } from '../../utils/colors';
import { getAddress, getLocationPreview } from '../../utils/location';
import { OutlinedButton } from '../ui/OutlinedButton';
import * as Linking from 'expo-linking';


type LocationPickerProps = {
  onPickLocation: (location: Location) => void;
};

export const LocationPicker = ({ onPickLocation }: LocationPickerProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'Map'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Map'>>();

  const [pickedLocation, setPickedLocation] = useState<PickedLocation | null>(
    null
  );

  const isFocused = useIsFocused();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation: LatLng = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      };

      setPickedLocation({ coords: mapPickedLocation });
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const latitude = pickedLocation.coords.latitude;
        const longitude = pickedLocation.coords.longitude;

        const address = await getAddress(latitude, longitude);

        const location: Location = {
          latitude,
          longitude,
          address,
        };

        onPickLocation(location);
      }
    }
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation?.status !== PermissionStatus.GRANTED
    ) {
      const permissionResponse = await requestPermission();

      if (!permissionResponse.granted) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this feature. Please enable it in your device settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
      return false;
    }
    }

   return true;
  }

  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();
  
    if (!hasPermissions) {
      return;
    }

    const pickedLocation = await getCurrentPositionAsync({});

    setPickedLocation(pickedLocation);
  }

  async function pickOnMapHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    const location = await getCurrentPositionAsync({});

    navigation.navigate('Map', {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      canChange: true
    });
  }

  let LocationPreview = <Text>No location yet</Text>;

  if (pickedLocation) {
    LocationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getLocationPreview(
            pickedLocation.coords.latitude,
            pickedLocation.coords.longitude
          ),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.location}>{LocationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: { flexDirection: 'row', gap: 16, marginHorizontal: 16 },
  image: { width: '100%', height: '100%' },
});
