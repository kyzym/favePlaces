import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PlaceForm } from '../components/Places/PlaceForm';
import { Place, RootStackParamList } from '../types/types';
import { insertPlace } from '../utils/db';

type AddPlaceProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AddPlace'>;
};

export const AddPlace = ({ navigation }: AddPlaceProp) => {
  async function createPlaceHandler(place: Place) {
    await insertPlace(place);

    navigation.navigate('AllPlaces', []);
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};
