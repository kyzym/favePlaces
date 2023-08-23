import * as SQLite from 'expo-sqlite';
import { Place } from '../types/types';

const database = SQLite.openDatabase('places.db');

export const init = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
       id INTEGER PRIMARY KEY NOT NULL,
       title TEXT NOT NULL,
       imageUri TEXT NOT NULL,
       address TEXT NOT NULL,
       lat REAL NOT NULL,
       lng REAL NOT NULL
      )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const insertPlace = (place: Place) => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.latitude,
          place.location.longitude,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchPlaces = () => {
  const promise = new Promise<Place[]>((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          const fetchedArr = result.rows._array;
          const places = fetchedArr.map(
            (place): Place => ({
              address: place.address,
              id: place.id,
              imageUri: place.imageUri,
              location: { latitude: place.lat, longitude: place.lng },
              title: place.title,
            })
          );

          resolve(places);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
  return promise;
};

export const fetchPlaceDetails = (id: string): Promise<Place> => {
  return new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places WHERE id = ?',
        [id],
        (_, result) => {
          const dbPlace = result.rows._array[0];

          const place: Place = {
            address: dbPlace.address,
            id: dbPlace.id,
            imageUri: dbPlace.imageUri,
            location: { latitude: dbPlace.lat, longitude: dbPlace.lng },
            title: dbPlace.title,
          };

          resolve(place);
        },
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};
