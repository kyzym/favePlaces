import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  AddPlace: { selectedLocation: LatLng };
  Map: MapParams;
};

export type MapProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Map'>;
  route: RouteProp<RootStackParamList, 'Map'>;
};

type MapParams = {
  selectedLocation?: LatLng;
};

export type PickedLocation = {
  coords: LatLng;
};
