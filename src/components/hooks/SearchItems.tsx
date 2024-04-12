import {useState} from 'react';
import {connectToDatabase} from '../../data/database/FoodDB';
import FoodModel from '../../model/FoodModel';
import {
  getAllFoodItems,
} from '../../data/database/FoodItemData';

const useSearchItems = () => {
  const [searchResult, setSearchResult] = useState<FoodModel[]>([]);

  const searchHandler = async (searchQuery: string) => {
    const db = await connectToDatabase();
    const allItems = await getAllFoodItems(db);
    setSearchResult(allItems.filter(foodItem => foodItem.title.includes(searchQuery)));
  };

  return {searchResult, searchHandler};
};

export default useSearchItems;
