import {ParamListBase, useNavigation, useTheme} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import FoodListItem from '../home/FoodsListItem';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FoodModel from '../../model/FoodModel';
import {useFoodItemsContext} from '../../components/hooks/FoodItemsContext';
import { ListItemSeparator } from '../../components/ui/ListItemSeperator';

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'Details'
>;

const WishlistScreen = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const {foodItems, isLoading, error, wishlistHandler} = useFoodItemsContext();

  const handleItemPress = (foodItem: FoodModel) => {
    navigation.navigate('Details', {
      foodID: foodItem.id,
    });
  };

  const getWishlist = foodItems.filter(foodItem => foodItem.isWishlisted);

  // Show empty 
  if (getWishlist.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{color: colors.text}}>
          Wishlist your favorite items to see here!
        </Text>
      </View>
    );
  }

  const handleFavoritePress = (foodItem: FoodModel, favorite: Boolean) => {
    wishlistHandler(foodItem.id, 0);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.rootContainer}>
        <FlatList
          data={getWishlist}
          renderItem={({item}) => {
            return (
              <FoodListItem
                foodItem={item}
                onPress={handleItemPress}
                onFavoriteClick={handleFavoritePress}
              />
            );
          }}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginVertical: 8,
  },

  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default WishlistScreen;
