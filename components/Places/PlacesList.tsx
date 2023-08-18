import { FlatList } from 'react-native';
import { PlaceItem } from './PlaceItem';
import { Place } from '../../types/types';

type PlacesProps = {
  places: Place[];
};

export const PlacesList = ({ places }: PlacesProps) => {
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};
