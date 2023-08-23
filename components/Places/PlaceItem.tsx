import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Place } from '../../types/types';
import { Colors } from '../../utils/colors';

type PlaceItemProps = {
  place: Place;
  onSelect: () => void;
};

export const PlaceItem = ({ place, onSelect }: PlaceItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect}>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.primary400,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: { opacity: 0.9 },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
    resizeMode: 'contain',
  },
  info: { flex: 1.5, padding: 12 },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  address: { fontSize: 12, color: Colors.gray700 },
});
