import { RouteProp, useIsFocused } from '@react-navigation/native';
import { PlacesList } from '../components/Places/PlacesList';
import { Place, RootStackParamList } from '../types/types';
import { useEffect, useState } from 'react';
import { fetchPlaces } from '../utils/db';
import { LoadingOverlay } from '../components/ui/LoadingOverlay';
import { Colors } from '../utils/colors';

type AllPlacesProps = {
  route: RouteProp<RootStackParamList, 'AllPlaces'>;
};

export const AllPlaces = ({ route }: AllPlacesProps) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);

  const [isFetching, setIsFetching] = useState(true)

  const isFocused = useIsFocused();



  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();

      setIsFetching(false)

      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  if (isFetching) {
    return <LoadingOverlay size={70} color={Colors.primary100} />
  }

  return <PlacesList places={loadedPlaces} />;
};
