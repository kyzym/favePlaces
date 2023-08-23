import { LatLng } from 'react-native-maps';

export interface Place {
  title: string;
  imageUri: string;
  address: string;
  location: LatLng;
  id: string;
}

export type RootStackParamList = {
  AllPlaces: Place[];
  AddPlace: LatLng;
  Map: LatLng;
  PlaceDetails: { placeId: string };
};

export type PickedLocation = {
  coords: LatLng;
};

export type Location = LatLng & {
  address: string;
};
