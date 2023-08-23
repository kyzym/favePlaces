import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlaceItem } from './PlaceItem';
import { Place, RootStackParamList } from '../../types/types';
import { Colors } from '../../utils/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type PlacesProps = {
  places: Place[];
};

export const PlacesList = ({ places }: PlacesProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  function selectedPlaceHandler(id: string) {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  }

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - let's do it!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectedPlaceHandler} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: { margin: 18 },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
