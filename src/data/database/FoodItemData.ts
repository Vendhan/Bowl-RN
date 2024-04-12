import {SQLiteDatabase} from 'react-native-sqlite-storage';
import FoodModel from '../../model/FoodModel';

type Table = 'FoodItem';

export const addOrUpdateFoodItems = async (
  db: SQLiteDatabase,
  foodItems: FoodModel[],
) => {
  db.transaction(tx => {
    foodItems.forEach(item => {
      tx.executeSql(
        `INSERT OR REPLACE INTO FoodItem (id, title, imageUrl, origin, description, isWishlisted, history, cookingInstructions) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.id,
          item.title,
          item.imageUrl,
          item.origin,
          item.description,
          item.isWishlisted,
          item.history,
          JSON.stringify(item.cookingInstructions)
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log('Record inserted/updated successfully');
          } else {
            console.log('Failed to insert/update record');
          }
        },
        error => {
          console.error('Error executing SQL:', error);
        },
      );
    });
  });
};

export const isFoodItemTableEmpty = async (
  db: SQLiteDatabase,
): Promise<boolean> => {
  try {
    const selectQuery = `SELECT COUNT(*) AS count FROM FoodItem`;
    const [result] = await db.executeSql(selectQuery);
    const rowCount = result.rows.item(0).count;
    console.log(`Number of rows in FoodItem table: ${rowCount}`);
    return rowCount === 0;
  } catch (error) {
    console.error('Error checking if FoodItem table is empty:', error);
    return true;
  }
};

export const getAllFoodItems = async (
  db: SQLiteDatabase,
): Promise<FoodModel[]> => {
  try {
    const foodItems: FoodModel[] = [];
    const selectQuery = `SELECT * FROM FoodItem`;
    const [result] = await db.executeSql(selectQuery);
    if (result.rows.length > 0) {
      console.log('Food items retrieved successfully');
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
          cookingInstructions: JSON.parse(row.cookingInstructions)
        };
        foodItems.push(foodItem);
      }
    } else {
      console.log('No Food Items found');
    }
    return foodItems;
  } catch (error) {
    console.error('Error getting Food Items from database:', error);
    throw new Error('Failed to get Food Items from database');
  }
};

export const updateWishlist = async (
  db: SQLiteDatabase,
  foodID: number,
  wishlist: number,
) => {
  const updateQuery = `
    UPDATE FoodItem 
    SET isWishlisted = ? WHERE id = ?
  `;
  const values = [wishlist, foodID];

  try {
    const [result] = await db.executeSql(updateQuery, values);
    if (result.rowsAffected > 0) {
      console.log('Food item added/removed to wishlist successfully');
    } else {
      console.log(
        'No rows affected. Food item may not have been added to wishlist.',
      );
    }
    return result; // Return the result
  } catch (error) {
    console.error('Error adding/removing to wishlist:', error);
    throw new Error('Failed to add wishlist');
  }
};
