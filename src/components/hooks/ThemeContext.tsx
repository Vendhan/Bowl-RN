import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface Props {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<Props> = ({children}) => {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const scheme = useColorScheme();

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
    setIsDarkMode(newMode);
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const theme = await AsyncStorage.getItem('theme');
        if (theme !== undefined && theme !== null) {
          setIsDarkMode(theme === 'dark');
        } else {
          setIsDarkMode(scheme === 'dark');
        }
        console.log(`Theme Async Storage : ${theme}, ${isDarkMode}`)
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

