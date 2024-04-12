import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FoodModel from '../../model/FoodModel';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ImagesAssets } from '../../../Constants';

interface Props {
  foodItem: FoodModel;
  onPress: (foodItem: FoodModel) => void;
  onFavoriteClick: (foodItem: FoodModel, favorite: Boolean) => void;
}

const FoodListItem: React.FC<Props> = ({foodItem, onPress, onFavoriteClick}) => {
  const {colors} = useTheme();

  const [isWishlisted, setIsWishlisted] = useState(foodItem.isWishlisted);

  const handlePress = () => {
    onPress(foodItem);
  };

  const handleIconPress = () => {
    setIsWishlisted(!isWishlisted);
    onFavoriteClick(foodItem, isWishlisted);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.image_container}>
          <Image source={{uri: foodItem.imageUrl}} style={styles.image} defaultSource={ImagesAssets.placeholderImage}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, {color: colors.text}]}>
            {foodItem.title}
          </Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[styles.description, {color: colors.text}]}>
            {foodItem.description}
          </Text>
          <Text style={styles.origin}>{foodItem.origin}</Text>
        </View>

        <TouchableOpacity onPress={handleIconPress}>
          <Ionicons
            name={isWishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={isWishlisted ? 'red' : colors.text}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image_container: {
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 90,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  origin: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '400',
    color: 'grey',
  },
});

export default FoodListItem;
