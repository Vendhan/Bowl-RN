import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import FoodModel from '../../model/FoodModel';
import {useTheme} from '@react-navigation/native';
import OutlinedButton from '../../components/ui/OutlinedButton';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import { useFoodItemsContext } from '../../components/hooks/FoodItemsContext';
import { useTranslation } from 'react-i18next';
import ParagraphWithHeader from '../../components/ui/ParagraphWithHeader';
import CookingInstructionsList from './CookingInstructionList';
import ImageSliderWithDots from './ImageSliderWithDots';

const DetailScreen = ({route}: any) => {
  const {colors} = useTheme();
  const {foodItems, isLoading, error, wishlistHandler} = useFoodItemsContext();
  const foodItem: FoodModel = foodItems.filter(food => route.params.foodID == food.id)[0];

  const handleFavoritePress = () => {
    wishlistHandler(foodItem.id, foodItem.isWishlisted ? 0 : 1);
  };
  const {t} = useTranslation();

  const showAlert = () => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this item from wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Ok', onPress: handleFavoritePress },
      ],
      { cancelable: false }
    );
  };
  

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            source={{uri: foodItem.imageUrl}}
            style={[styles.image, styles.roundedImage]}
            onError={error => console.log('Error loading image:', error)}
          />
          {/* <ImageSliderWithDots images={[foodItem.imageUrl, foodItem.imageUrl]}/> */}
          <Text style={[styles.title, {color: colors.text}]}>
            {foodItem.title}
          </Text>
          <Text style={[styles.description, {color: colors.text}]}>
            {foodItem.description}
          </Text>
          <Text style={styles.origin}>{foodItem.origin}</Text>
          <CookingInstructionsList cookingInstructions={foodItem.cookingInstructions}/>
          <ParagraphWithHeader headerTitle='History' paragraph={foodItem.history}/>

        </ScrollView>

        <OutlinedButton
          isWishlisted={foodItem.isWishlisted}
          title={foodItem.isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
          onPress={foodItem.isWishlisted ? showAlert : handleFavoritePress}
          iconName="heart"
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flex: 1,
  },
  image: {
    width: '100%',
    height: 350,
  },
  roundedImage: {
    borderRadius: 12,
  },
  title: {
    marginTop: 16,
    fontWeight: '600',
    fontSize: 24,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    textAlign: 'justify'
  },
  origin: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: '400',
    color: 'grey',
  },
});
export default DetailScreen;
