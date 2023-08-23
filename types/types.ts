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
  AddPlace: LatLng;
  Map: LatLng;
};

export type MapProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Map'>;
  route: RouteProp<RootStackParamList, 'Map'>;
};

export type PickedLocation = {
  coords: LatLng;
};
