import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PlaceItem } from './PlaceItem';
import { Place } from '../../types/types';
import { Colors } from '../../utils/colors';

type PlacesProps = {
  places: Place[];
};

export const PlacesList = ({ places }: PlacesProps) => {
  function onSelect() {}
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
      renderItem={({ item }) => <PlaceItem place={item} onSelect={onSelect} />}
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
