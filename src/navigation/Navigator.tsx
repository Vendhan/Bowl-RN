import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import DetailScreen from '../screens/details/DetailsScreen';
import MainNavigation from './MainNavigation';
import {useThemeContext} from '../components/hooks/ThemeContext';
import FoodItemsContextProvider from '../components/hooks/FoodItemsContext';
import { useTranslation } from 'react-i18next';
import { useLocaleContext } from '../components/hooks/LocaleContext';
import { useEffect } from 'react';
import i18next from 'i18next';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const {isDarkMode, toggleTheme} = useThemeContext();
  const {currentLocale, changeLocale} = useLocaleContext();

  const {t} = useTranslation();

  useEffect(() => {
    currentLocale !== '' ? i18next.changeLanguage(currentLocale) : {};
  }, [currentLocale]);

  return (
    <FoodItemsContextProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainNavigation}
            options={{
              headerShown: false,
              title: t('home')
            }}
          />
          <Stack.Screen name="Details" component={DetailScreen} options={{title: t('details')}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </FoodItemsContextProvider>
  );
};

export default Navigator;
