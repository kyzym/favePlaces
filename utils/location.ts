const API_KEY = process.env.EXPO_PUBLIC_API_KEY && process.env.EXPO_PUBLIC_API_KEY 

export const getLocationPreview = (lat: number, long: number) => {
  const locationUri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:D%7C${lat},${long}&key=${API_KEY}`;

  return locationUri;
};

export const getAddress = async (lat: number, long: number) => {
  const addressUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`;

  const response = await fetch(addressUri);

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const data: google.maps.GeocoderResponse = await response.json();

  const address = data.results[0].formatted_address;
  return address;
};
