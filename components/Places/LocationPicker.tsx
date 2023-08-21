import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../utils/colors';
import { OutlinedButton } from '../ui/OutlinedButton';
import { getLocationPreview } from '../../utils/map';

type LocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

export const LocationPicker = () => {
  const [pickedLocation, setPickedLocation] = useState<LocationType | null>(
    null
  );

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation!.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation!.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this feature.'
      );
      return false;
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

  async function pickOnMapHandler() {}

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
