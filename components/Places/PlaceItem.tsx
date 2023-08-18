import { Image, Text, View } from 'react-native';
import { Place } from '../../types/types';

type PlaceItemProps = {
  place: Place;
};

export const PlaceItem = ({ place }: PlaceItemProps) => {
  return (
    <View>
      <Image source={{ uri: place.imageUri }} />
      <Text>{place.title}</Text>
      <Text>{place.address}</Text>
    </View>
  );
};
