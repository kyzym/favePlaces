const API = 'AIzaSyAu_2a7Gkb6yREdqGA2ODA4IxxMGyp9-5o';

export const getLocationPreview = (lat: number, long: number) => {
  const locationUri = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:D%7C${lat},${long}&key=${API}`;

  return locationUri;
};
