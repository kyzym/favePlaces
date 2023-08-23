import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Region,
} from 'react-native-maps';
import IconButton from '../components/ui/IconButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { RouteProp } from '@react-navigation/native';

type MapProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Map'>;
  route: RouteProp<RootStackParamList, 'Map'>;
};

export const Map = ({ navigation, route }: MapProps) => {
  const initialLocation = route.params && {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
  };

  const [selectedLocation, setSelectedLocation] =
    useState<LatLng>(initialLocation);

  const region: Region = {
    latitude: initialLocation.latitude || 40.442,
    longitude: initialLocation.longitude || 19.496,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    if (initialLocation) {
      return;
    }
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
    if (initialLocation) {
      return;
    }
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
  }, [navigation, savePickerLocationHandler, initialLocation]);

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
