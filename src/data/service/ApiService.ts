import FoodModel from '../../model/FoodModel';
import {connectToDatabase} from '../database/FoodDB';
import {
  addOrUpdateFoodItems,
  getAllFoodItems,
  isFoodItemTableEmpty,
} from '../database/FoodItemData';

const BASE_URL =
  'https://firebasestorage.googleapis.com/v0/b/tomatoo-a85d6.appspot.com/o';

const delay = (milliseconds: number) =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

export const fetchFoodsApi = async () => {
  try {
    const db = await connectToDatabase();
    let foodItems: FoodModel[];
    if (await isFoodItemTableEmpty(db)) {
      const response = await fetch(
        `${BASE_URL}/foods.json?alt=media&token=3b99bf63-96a5-440c-b9d2-b5bb8d529acd`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      const foodModels = data.foodItems.map(
        (item: {
          id: number;
          name: string;
          origin: string;
          image_url: string;
          description: string;
          history: string;
          cooking_instructions: string[];
        }) =>
          new FoodModel(
            item.id,
            item.name,
            item.image_url,
            item.origin,
            item.description,
            false,
            item.history,
            item.cooking_instructions,
          ),
      );

      await addOrUpdateFoodItems(db, foodModels);
      foodItems = foodModels;
    } else {
      foodItems = await getAllFoodItems(db);
    }
    return foodItems;
  } catch (error) {
    console.error('Error fetching data from the API:', error);
    return [];
  }
};
