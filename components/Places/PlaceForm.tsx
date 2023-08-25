import { useCallback, useState, useEffect } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Location, Place } from '../../types/types';
import { Colors } from '../../utils/colors';
import { Button } from '../ui/Button';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';

type PlaceFormProp = {
  onCreatePlace: (placeData: Place) => void;
};

export const PlaceForm = ({ onCreatePlace }: PlaceFormProp) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState<Location | null>(null);
  const [selectedImage, setSelectedImage] = useState('');

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location: Location) => {
    setPickedLocation(location);
  }, []);


  function savePlaceHandler() {
    if (pickedLocation && selectedImage && enteredTitle) {
      const placeData: Place = {
        title: enteredTitle,
        address: pickedLocation.address,
        imageUri: selectedImage,
        location: {
          latitude: pickedLocation.latitude,
          longitude: pickedLocation.longitude,
        },
        id: new Date().toString() + selectedImage,
      };
      onCreatePlace(placeData);
    } else {
      Alert.alert(
        'Input error',
        'Please fill title, picture and choose a location'
      );
    }
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: { flex: 1, paddingHorizontal: 24, paddingVertical: 18 },
  label: { fontWeight: 'bold', marginBottom: 4, color: Colors.primary500 },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});
