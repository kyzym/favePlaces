import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';

type SelectedLocationType = { latitude: number; longitude: number };

export const Map = () => {
  const [selectedLocation, setSelectedLocation] =
    useState<SelectedLocationType | null>(null);

  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude, longitude });
  }

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
