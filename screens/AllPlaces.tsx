import { RouteProp, useIsFocused } from '@react-navigation/native';
import { PlacesList } from '../components/Places/PlacesList';
import { Place, RootStackParamList } from '../types/types';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/db';

type AllPlacesProps = {
  route: RouteProp<RootStackParamList, 'AllPlaces'>;
};

export const AllPlaces = ({ route }: AllPlacesProps) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((currentPlaces) => [
      //   ...currentPlaces,
      //   route.params.place,
      // ]
      // );
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};
