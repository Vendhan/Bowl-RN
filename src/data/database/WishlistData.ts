import {SQLiteDatabase} from 'react-native-sqlite-storage';
import FoodModel from '../../model/FoodModel';
type Table = 'FoodItem';

export const addToWishlist = async (db: SQLiteDatabase, foodID: number) => {
  const insertQuery = `
      INSERT INTO FoodWishlist (id)
      VALUES (?)
    `;
  const values = [foodID];
  try {
    const [result] = await db.executeSql(insertQuery, values);
    if (result.rowsAffected > 0) {
      console.log('Food item added to wishlist successfully');
    } else {
      console.log(
        'No rows affected. Food item may not have been added to wishlist.',
      );
    }
    return result; // Return the result
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw new Error('Failed to add wishlist');
  }
};

export const removeFromWishlist = async (
  db: SQLiteDatabase,
  foodID: number,
) => {
  const deleteQuery = `
      DELETE FROM FoodWishlist
      WHERE id = ?
    `;
  const values = [foodID];
  try {
    const [result] = await db.executeSql(deleteQuery, values);
    if (result.rowsAffected > 0) {
      console.log('Food item removed from wishlist successfully');
    } else {
      console.log(
        'No rows affected. Food item may not have been removed from wishlist.',
      );
    }
    return result;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw new Error('Failed to remove product');
  }
};

export const getAllWishListItems = async (
  db: SQLiteDatabase,
): Promise<FoodModel[]> => {
  try {
    const wishlist: FoodModel[] = [];
    const fetchQuery = `
        SELECT FoodItem.* 
        FROM FoodItem 
        INNER JOIN FoodWishlist ON FoodItem.id = FoodWishlist.id
      `;
    const [result] = await db.executeSql(fetchQuery);
    if (result.rows.length > 0) {
      console.log('Wishlist items retrieved successfully');
      for (let index = 0; index < result.rows.length; index++) {
        const row = result.rows.item(index);
        const foodItem: FoodModel = {
          id: row.id,
          title: row.title,
          imageUrl: row.imageURL,
          origin: row.origin,
          description: row.description,
          isWishlisted: row.isWishlisted,
          history: row.history,
          cookingInstructions: row.cookingInstructions
        };
        wishlist.push(foodItem);
      }
    } else {
      console.log('No wishlist items found');
    }
    return wishlist;
  } catch (error) {
    console.error('Error getting wishlist from database:', error);
    throw new Error('Failed to get wishlist from database');
  }
};

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DELETE FROM ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};
