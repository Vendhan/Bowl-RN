import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

enablePromise(true);

export const connectToDatabase = async () => {
  return openDatabase(
    {name: 'food_app.sqlite3', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw Error('Could not connect to the database');
    },
  );
};

export const createTables = async (db: SQLiteDatabase) => {
  const foodItemCreateQuery = `
        CREATE TABLE IF NOT EXISTS FoodItem (
            id INTEGER,
            title TEXT,
            imageURL TEXT,
            description TEXT,
            origin TEXT,
            isWishlisted INTEGER,
            history TEXT,
            cookingInstructions TEXT,
            PRIMARY KEY(id)
        )`;
  try {
    await db.executeSql(foodItemCreateQuery);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to create tables`);
  }
};
