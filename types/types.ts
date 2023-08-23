import { LatLng } from 'react-native-maps';

export interface Place {
  title: string;
  imageUri: string;
  address: string;
  location: object;
  id: string;
}

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: LatLng;
  Map: LatLng;
};

export type PickedLocation = {
  coords: LatLng;
};

export type Location = LatLng & {
  address: string;
};
