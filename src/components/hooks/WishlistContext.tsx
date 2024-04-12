import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {connectToDatabase} from '../../data/database/FoodDB';
import FoodModel from '../../model/FoodModel';
import {
  getAllFoodItems,
  updateWishlist,
} from '../../data/database/FoodItemData';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<FoodModel[]>([]);
  const isfocused = useIsFocused();

  useEffect(() => {
    async function fetchWishlist() {
      const db = await connectToDatabase();
      const allItems = await getAllFoodItems(db);
      setWishlist(allItems.filter(foodItem => foodItem.isWishlisted));
    }
    fetchWishlist();
  }, [isfocused]);

  const favouritesHandler = async (foodID: number, wishlist: number) => {
    const db = await connectToDatabase();
    await updateWishlist(db, foodID, wishlist);
    const updatedWishlist = await getAllFoodItems(db);
    setWishlist(updatedWishlist.filter(foodItem => foodItem.isWishlisted));
  };

  return {wishlist, favouritesHandler};
};

export default useWishlist;
