import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useCallback } from 'react';
import { Colors } from '../../utils/colors';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { Button } from '../ui/Button';
import { LatLng } from 'react-native-maps';

export const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState<LatLng | null>(null);
  const [selectedImage, setSelectedImage] = useState('');

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location: LatLng) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(pickedLocation);
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
