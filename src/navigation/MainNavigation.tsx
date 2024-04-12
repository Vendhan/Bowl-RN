import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import WishlistScreen from '../screens/wishlist/WishlistScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useThemeContext} from '../components/hooks/ThemeContext';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useLocaleContext} from '../components/hooks/LocaleContext';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  const {isDarkMode, toggleTheme} = useThemeContext();
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {currentLocale, changeLocale} = useLocaleContext();

  const changeLanguage = () => {
    if (currentLocale === 'en') {
      changeLocale('ta');
    } else {
      changeLocale('en');
    }
  };

  return (
    <Tab.Navigator 
    initialRouteName="Home"
    screenOptions={{tabBarStyle: {paddingBottom: 10, paddingTop: 8, height: 64},}}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: () => {
            return (
              <View style={{flexDirection: 'row'}}>
                <Ionicons
                  name={'language'}
                  size={24}
                  color={colors.text}
                  onPress={changeLanguage}
                  style={{marginRight: 20}}
                />
                <Ionicons
                  name={isDarkMode ? 'sunny' : 'moon-outline'}
                  size={24}
                  color={isDarkMode ? 'white' : 'black'}
                  onPress={toggleTheme}
                  style={{marginRight: 20}}
                />
              </View>
            );
          },
          title: 'Bowl',
          tabBarLabel: t('home'),
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <Ionicons name="home" color={color} size={size} />
            ) : (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: t('wishlist'),
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <Ionicons name="heart" color={color} size={size} />
            ) : (
              <Ionicons name="heart-outline" color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
