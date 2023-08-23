import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { OutlinedButton } from '../components/ui/OutlinedButton';
import { Colors } from '../utils/colors';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { Place, RootStackParamList } from '../types/types';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../utils/db';

type PlaceDetailsProps = {
  route: RouteProp<RootStackParamList, 'PlaceDetails'>;
  navigation: NavigationProp<RootStackParamList, 'PlaceDetails'>;
};

export const PlaceDetails = ({ route, navigation }: PlaceDetailsProps) => {
  const [fetchedPlace, setFetchedPlace] = useState<Place>();

  async function showOnMapHandler() {
    if (fetchedPlace) {
      navigation.navigate('Map', {
        latitude: fetchedPlace.location.latitude,
        longitude: fetchedPlace.location.longitude,
      });
    }
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    <View style={styles.fallback}>
      <Text>Loading place data...</Text>
    </View>;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace?.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    resizeMode: 'center',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
