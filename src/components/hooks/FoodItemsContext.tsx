import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import FoodModel from '../../model/FoodModel';
import {connectToDatabase} from '../../data/database/FoodDB';
import {
  getAllFoodItems,
  updateWishlist,
} from '../../data/database/FoodItemData';
import {fetchFoodsApi} from '../../data/service/ApiService';

interface ContextProps {
  foodItems: FoodModel[];
  isLoading: Boolean;
  error: string;
  wishlistHandler: (foodID: number, wishlist: number) => Promise<void>;
}

const FoodItemsContext = createContext<ContextProps>({
  foodItems: [],
  isLoading: true,
  error: '',
  wishlistHandler: async () => {},
});

export const useFoodItemsContext = () => useContext(FoodItemsContext);

interface Props {
  children: ReactNode;
}

export const FoodItemsContextProvider: React.FC<Props> = ({children}) => {
  const [foodItems, setFoodItems] = useState<FoodModel[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true);
        const result: FoodModel[] = await fetchFoodsApi();
        setFoodItems(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError('Error Occured!');
      }
    };

    fetchFoodItems();
  }, []);

  const wishlistHandler = async (foodID: number, wishlist: number) => {
    const db = await connectToDatabase();
    await updateWishlist(db, foodID, wishlist);
    const foodItems = await getAllFoodItems(db);
    setFoodItems(foodItems);
  };

  const contextValue: ContextProps = {
    foodItems: foodItems,
    isLoading: isLoading,
    error: error,
    wishlistHandler: wishlistHandler,
  };

  return (
    <FoodItemsContext.Provider value={contextValue}>
      {children}
    </FoodItemsContext.Provider>
  );
};

export default FoodItemsContextProvider;
