// // const API_KEY = process.env.EXPO_PUBLIC_API_KEY && process.env.EXPO_PUBLIC_API_KEY
const apiKey = "AIzaSyAu_2a7Gkb6yREdqGA2ODA4IxxMGyp9-5o"
// const apiKey = "AIzaSyDX24NKqgSA-1oaRubcab9DL9gRqQ1Lvc0"


export const getLocationPreview = (lat: number, long: number) => {
  const locationUri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:D%7C${lat},${long}&key=${apiKey}`;

  return locationUri;
};

export const getAddress = async (lat: number, long: number) => {
  const addressUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${apiKey}`;
  console.log(addressUri);
  const response = await fetch(addressUri);
   console.log(response)
  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const data: google.maps.GeocoderResponse = await response.json();

  if (data.results && data.results[0]) {
  const address = data.results[0].formatted_address;
  return address;
} else {
  throw new Error('No results found');
}
};
