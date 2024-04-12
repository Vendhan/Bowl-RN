import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface ContextProps {
  currentLocale: string;
  changeLocale: (languageCode: string) => Promise<void>;
}

const LocaleContext = createContext<ContextProps>({
  currentLocale: 'en',
  changeLocale: async () => {},
});

export const useLocaleContext = () => useContext(LocaleContext);

interface Props {
  children: ReactNode;
}

export const LocaleContextProvider: React.FC<Props> = ({children}) => {
  const [currentLocale, setCurrentLocale] = useState('');

  const changeLocale = async (languageCode: string) => {
    await AsyncStorage.setItem('locale', languageCode);
    i18next.changeLanguage(languageCode);
    setCurrentLocale(languageCode);
  };

  useEffect(() => {
    const loadLocale = async () => {
      try {
        const locale = await AsyncStorage.getItem('locale');
        if (locale !== undefined && locale !== null) {
          setCurrentLocale(locale);
        } else {
          setCurrentLocale('en');
        }
        console.log(`Locale Async Storage : ${locale}, ${currentLocale}`);
      } catch (error) {
        console.error('Error loading locale preference:', error);
      }
    };
    loadLocale();
  }, []);

  return (
    <LocaleContext.Provider value={{currentLocale, changeLocale}}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContextProvider;
