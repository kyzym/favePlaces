import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Region,
} from 'react-native-maps';
import IconButton from '../components/ui/IconButton';
import { MapProps } from '../types/types';

export const Map = ({ navigation, route }: MapProps) => {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const region: Region = {
    latitude: route.params?.latitude || 37.9,
    longitude: route.params?.longitude || 19.4967166,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude, longitude });
  }

  const savePickerLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked',
        'Please pick location on tha map first'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor = '#000' }) => (
        <IconButton
          color={tintColor}
          size={24}
          onPress={savePickerLocationHandler}
          icon="save"
        />
      ),
    });
  }, [navigation, savePickerLocationHandler]);

  return (
    <MapView style={styles.map} region={region} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({ map: { flex: 1 } });
