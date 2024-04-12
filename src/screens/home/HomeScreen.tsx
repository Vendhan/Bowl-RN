import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import FoodsList from './FoodsList';
import FoodModel from '../../model/FoodModel';
import FoodItemsContextProvider, {
  useFoodItemsContext,
} from '../../components/hooks/FoodItemsContext';
import {useTheme} from '@react-navigation/native';
import {Snackbar} from 'react-native-paper';
import {useState} from 'react';

const HomeScreen = () => {
  const {colors} = useTheme();

  const {foodItems, isLoading, error, wishlistHandler} = useFoodItemsContext();

  const [visible, setVisible] = useState(false);

  const onToggleSnackBar = () => {
    onDismissSnackBar();
    setVisible(true);
  };

  const onDismissSnackBar = () => setVisible(false);

  const handleFavoritePress = (foodItem: FoodModel, favorite: Boolean) => {
    wishlistHandler(foodItem.id, favorite ? 0 : 1);
    onToggleSnackBar();
  };

  // Show loading
  if (isLoading) {
    return <ActivityIndicator size="large" style={style.container} />;
  }

  // Show error
  if (error) {
    return (
      <View style={style.container}>
        <Text style={{color: colors.text}}>{error}</Text>
      </View>
    );
  }

  // Show empty
  if (foodItems.length === 0) {
    return (
      <View style={style.container}>
        <Text style={{color: colors.text}}>
          All caught up! No foods available
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <FoodsList foodsList={foodItems} onFavoriteClick={handleFavoritePress} />
      <Snackbar
        style={{marginBottom: 8}}
        duration={1000}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        Item updated to wishlist
      </Snackbar>
    </View>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default HomeScreen;

export const HomeScreenProvider = () => {
  return (
    <FoodItemsContextProvider>
      <HomeScreen />
    </FoodItemsContextProvider>
  );
};
