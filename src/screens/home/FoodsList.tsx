import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FoodListItem from './FoodsListItem';
import FoodModel from '../../model/FoodModel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation, useTheme} from '@react-navigation/native';
import {ListItemSeparator} from '../../components/ui/ListItemSeperator';
import SearchBar from './SearchBar';
import useSearchItems from '../../components/hooks/SearchItems';

interface Props {
  foodsList: FoodModel[];
  onFavoriteClick: (foodItem: FoodModel, favorite: Boolean) => void;
}

type DetailsScreenNavigationProp = NativeStackNavigationProp<
  ParamListBase,
  'Details'
>;

const FoodsList: React.FC<Props> = ({foodsList, onFavoriteClick}) => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const {colors} = useTheme();

  const handleItemPress = (foodItem: FoodModel) => {
    navigation.navigate('Details', {
      foodID: foodItem.id,
    });
  };

  const [searchQuery, setSearchQuery] = useState('');

  const {searchResult, searchHandler} = useSearchItems();

  useEffect(() => {
    searchHandler(searchQuery);
  }, [searchQuery]);

  const handleSearchClick = useCallback((searchQuery: string) => {
    console.log(`SearchQuery ${searchQuery}`);
    setSearchQuery(searchQuery);
    //searchHandler(searchQuery);
  },[]);

  return (
    <View style={styles.rootContainer}>
      <SearchBar onClickSearch={handleSearchClick} />
      {searchQuery !== '' && searchResult.length === 0 ? (
        <View style={styles.container}>
          <Text style={{color: colors.text}}>Sorry! No food available.</Text>
        </View>
      ) : (
        <FlatList
          data={(searchResult.length === 0) ? foodsList : foodsList.filter(food => searchResult.some(food2 => food.id === food2.id))}/* searchResult.length === 0 ? foodsList : searchResult */
          renderItem={({item}) => {
            return (
              <FoodListItem
                foodItem={item}
                onPress={handleItemPress}
                onFavoriteClick={onFavoriteClick}
              />
            );
          }}
          keyExtractor={item =>
            `${item.id.toString()}${item.isWishlisted.toString()}`
          }
          ItemSeparatorComponent={ListItemSeparator}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 8,
    paddingBottom: 78,
  },
  container: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodsList;
