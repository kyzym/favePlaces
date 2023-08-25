import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../utils/colors';
import { OutlinedButton } from '../ui/OutlinedButton';
import { LoadingOverlay } from '../ui/LoadingOverlay';

type ImagePickerProps = {
  onTakeImage: (imageUri: string) => void;
};


export const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState('');
  const [isRequestPermission, setIsRequestPermission] = useState(false)

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();



  async function verifyPermissions() {

    if (cameraPermissionInformation?.status !== PermissionStatus.GRANTED) {
      setIsRequestPermission(true)
      const permissionResponse = await requestPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          'Insufficient Permissions!',
          'You need to grant camera permissions to use this app.'
        );
        return false;
      }
    }
    setIsRequestPermission(false)
    return true;
  }



  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      const imageUri = image.assets[0].uri;

      setPickedImage(imageUri);

      onTakeImage(imageUri);
    }
  }

  let imagePreview = <Text>No image yet</Text>;


  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  if (isRequestPermission) {
    imagePreview = <LoadingOverlay color={Colors.gray700} size={70} />;
  }


  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>

      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  }, buttonText: {
    fontSize: 16,
    color: Colors.primary500
  }
});
